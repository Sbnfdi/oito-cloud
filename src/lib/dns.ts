import type { DNSInstructions, DNSRecord, AdapterType } from "@/types";

/**
 * Generate white-labeled DNS configuration instructions
 * that mask the underlying hosting provider.
 */
export function generateDNSInstructions(
  domain: string,
  adapter: AdapterType
): DNSInstructions {
  const records: DNSRecord[] = [];
  let provider: string;
  let instructions: string;

  const isSubdomain = domain.split(".").length > 2;
  const host = isSubdomain ? domain.split(".")[0] : "@";

  switch (adapter) {
    case "vercel":
      provider = "oitocloud Edge Network";

      if (isSubdomain) {
        records.push({
          type: "CNAME",
          host,
          value: "cname.vercel-dns.com",
          ttl: 3600,
        });
      } else {
        records.push({
          type: "A",
          host: "@",
          value: "76.76.21.21",
          ttl: 3600,
        });
        // www redirect
        records.push({
          type: "CNAME",
          host: "www",
          value: "cname.vercel-dns.com",
          ttl: 3600,
        });
      }

      instructions = [
        `To connect "${domain}" to your oitocloud project, add the following DNS records at your domain registrar:`,
        "",
        "┌──────────┬──────────┬───────────────────────────┬──────┐",
        "│ Type     │ Host     │ Value                     │ TTL  │",
        "├──────────┼──────────┼───────────────────────────┼──────┤",
        ...records.map(
          (r) =>
            `│ ${r.type.padEnd(8)} │ ${r.host.padEnd(8)} │ ${r.value.padEnd(25)} │ ${String(r.ttl).padEnd(4)} │`
        ),
        "└──────────┴──────────┴───────────────────────────┴──────┘",
        "",
        "After adding these records, DNS propagation typically takes 1-48 hours.",
        "SSL certificates will be provisioned automatically once DNS is verified.",
      ].join("\n");
      break;

    case "vps":
      provider = "oitocloud Dedicated";
      const serverIp = process.env.VPS_SERVER_IP || "YOUR_SERVER_IP";

      records.push({
        type: "A",
        host: isSubdomain ? host : "@",
        value: serverIp,
        ttl: 3600,
      });

      if (!isSubdomain) {
        records.push({
          type: "A",
          host: "www",
          value: serverIp,
          ttl: 3600,
        });
      }

      instructions = [
        `To connect "${domain}" to your oitocloud project, add the following DNS records at your domain registrar:`,
        "",
        "┌──────────┬──────────┬───────────────────────────┬──────┐",
        "│ Type     │ Host     │ Value                     │ TTL  │",
        "├──────────┼──────────┼───────────────────────────┼──────┤",
        ...records.map(
          (r) =>
            `│ ${r.type.padEnd(8)} │ ${r.host.padEnd(8)} │ ${r.value.padEnd(25)} │ ${String(r.ttl).padEnd(4)} │`
        ),
        "└──────────┴──────────┴───────────────────────────┴──────┘",
        "",
        "After adding these records, DNS propagation typically takes 1-48 hours.",
        "Make sure your server firewall allows traffic on ports 80 and 443.",
      ].join("\n");
      break;

    default:
      throw new Error(`Unknown adapter: ${adapter}`);
  }

  return {
    domain,
    records,
    provider,
    instructions,
  };
}
