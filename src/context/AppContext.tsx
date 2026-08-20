"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Project } from "@/types";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  user: User | null;
  projects: Project[];
  activeProjectId: string | null;
  sidebarOpen: boolean;
  deployModalOpen: boolean;
}

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
  setActiveProjectId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setDeployModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const MOCK_USER: User = {
  id: "usr_001",
  name: "Abdullah",
  email: "abdullah@oitocloud.com",
  avatar: "",
};

const MOCK_PROJECTS: Project[] = [
  {
    id: "prj_001",
    name: "Marketing Site",
    slug: "marketing-site",
    githubRepo: "oitocloud/marketing-site",
    status: "live",
    liveUrl: "https://marketing.oitocloud.app",
    adapter: "vercel",
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-08-19T14:30:00Z",
  },
  {
    id: "prj_002",
    name: "E-Commerce API",
    slug: "ecommerce-api",
    githubRepo: "oitocloud/ecommerce-api",
    status: "building",
    liveUrl: "https://api.shop.oitocloud.app",
    adapter: "vps",
    createdAt: "2026-08-10T08:00:00Z",
    updatedAt: "2026-08-20T09:00:00Z",
  },
  {
    id: "prj_003",
    name: "Dashboard v2",
    slug: "dashboard-v2",
    githubRepo: "oitocloud/dashboard-v2",
    status: "failed",
    liveUrl: null,
    adapter: "vercel",
    createdAt: "2026-08-18T16:00:00Z",
    updatedAt: "2026-08-20T07:45:00Z",
  },
  {
    id: "prj_004",
    name: "Blog Platform",
    slug: "blog-platform",
    githubRepo: "oitocloud/blog-platform",
    status: "live",
    liveUrl: "https://blog.oitocloud.app",
    adapter: "vercel",
    createdAt: "2026-08-01T12:00:00Z",
    updatedAt: "2026-08-17T11:20:00Z",
  },
  {
    id: "prj_005",
    name: "Analytics Engine",
    slug: "analytics-engine",
    githubRepo: "oitocloud/analytics-engine",
    status: "idle",
    liveUrl: null,
    adapter: "vps",
    createdAt: "2026-08-20T08:00:00Z",
    updatedAt: "2026-08-20T08:00:00Z",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        activeProjectId,
        sidebarOpen,
        deployModalOpen,
        setUser,
        setProjects,
        setActiveProjectId,
        setSidebarOpen,
        setDeployModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
