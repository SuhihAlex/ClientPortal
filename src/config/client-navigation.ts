import {
  FileCheck2,
  Files,
  FolderKanban,
  LayoutDashboard,
} from "lucide-react";

export const clientNavigation = [
  {
    label: "Overview",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/portal/projects",
    icon: FolderKanban,
  },
  {
    label: "Files",
    href: "/portal/files",
    icon: Files,
  },
  {
    label: "Reviews",
    href: "/portal/reviews",
    icon: FileCheck2,
  },
];