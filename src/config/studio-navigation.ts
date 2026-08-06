import {
  CreditCard,
  FileCheck2,
  Files,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  UsersRound,
} from "lucide-react";

export const studioNavigation = [
  {
    label: "Dashboard",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Clients",
    href: "/app/clients",
    icon: UsersRound,
  },
  {
    label: "Projects",
    href: "/app/projects",
    icon: FolderKanban,
  },
  {
    label: "Files",
    href: "/app/files",
    icon: Files,
  },
  {
    label: "Approvals",
    href: "/app/approvals",
    icon: FileCheck2,
  },
];

export const studioManagementNavigation = [
  {
    label: "Team",
    href: "/app/team",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
  {
    label: "Billing",
    href: "/app/billing",
    icon: CreditCard,
  },
];