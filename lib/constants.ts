import { FileText, Film, Home, Image, MoreHorizontal } from "lucide-react";

export const SIDEBAR_TABS = [
  {
    name: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    name: "Documents",
    icon: FileText,
    url: "/documents",
  },
  {
    name: "Images",
    icon: Image,
    url: "/images",
  },
  {
    name: "Media",
    icon: Film,
    url: "/media",
  },
  {
    name: "Others",
    icon: MoreHorizontal,
    url: "/others",
  },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
