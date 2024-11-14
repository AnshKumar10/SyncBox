import {
  Download,
  Edit,
  FileText,
  Film,
  Home,
  Image,
  Info,
  MoreHorizontal,
  Share,
  Trash,
} from "lucide-react";

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

export const DROPDOWN_ACTION_MENU_OPTIONS = [
  {
    label: "Rename",
    icon: Edit,
    value: "rename",
  },
  {
    label: "Details",
    icon: Info,
    value: "details",
  },
  {
    label: "Share",
    icon: Share,
    value: "share",
  },
  {
    label: "Download",
    icon: Download,
    value: "download",
  },
  {
    label: "Delete",
    icon: Trash,
    value: "delete",
  },
];
