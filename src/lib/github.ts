import { Octokit } from "octokit";

let octokit: Octokit | null = null;

function getOctokit(): Octokit {
  if (!octokit) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GITHUB_TOKEN environment variable is required");
    }
    octokit = new Octokit({ auth: token });
  }
  return octokit;
}

/**
 * Create a private GitHub repository.
 */
export async function createRepository(
  name: string,
  isPrivate = true
): Promise<{ owner: string; repo: string; url: string }> {
  const kit = getOctokit();

  const { data } = await kit.rest.repos.createForAuthenticatedUser({
    name,
    private: isPrivate,
    auto_init: true,
    description: `Deployed via oitocloud`,
  });

  return {
    owner: data.owner.login,
    repo: data.name,
    url: data.html_url,
  };
}

/**
 * Push multiple files as a single commit using the Git Data API.
 * This is more efficient than calling createOrUpdateFileContents per file.
 */
export async function pushFiles(
  owner: string,
  repo: string,
  files: { path: string; content: string }[],
  message = "deploy: update via oitocloud"
): Promise<{ commitSha: string }> {
  const kit = getOctokit();

  // 1. Get the latest commit SHA on main
  const { data: refData } = await kit.rest.git.getRef({
    owner,
    repo,
    ref: "heads/main",
  });
  const parentSha = refData.object.sha;

  // 2. Get the tree SHA of the latest commit
  const { data: commitData } = await kit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: parentSha,
  });
  const baseTreeSha = commitData.tree.sha;

  // 3. Create blobs for each file
  const tree = await Promise.all(
    files.map(async (file) => {
      const { data: blob } = await kit.rest.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: "base64",
      });

      return {
        path: file.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blob.sha,
      };
    })
  );

  // 4. Create a new tree
  const { data: newTree } = await kit.rest.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree,
  });

  // 5. Create a new commit
  const { data: newCommit } = await kit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.sha,
    parents: [parentSha],
  });

  // 6. Update the reference to point to the new commit
  await kit.rest.git.updateRef({
    owner,
    repo,
    ref: "heads/main",
    sha: newCommit.sha,
  });

  return { commitSha: newCommit.sha };
}

/**
 * Get repository metadata.
 */
export async function getRepository(
  owner: string,
  repo: string
): Promise<{ fullName: string; defaultBranch: string; url: string }> {
  const kit = getOctokit();

  const { data } = await kit.rest.repos.get({ owner, repo });

  return {
    fullName: data.full_name,
    defaultBranch: data.default_branch,
    url: data.html_url,
  };
}
