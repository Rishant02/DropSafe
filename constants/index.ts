import { ActionType } from "@/types";
import {
  LayoutDashboard,
  Files,
  Image,
  Clapperboard,
  ChartPie,
  LucideIcon,
  Archive,
  Edit,
  Info,
  Share,
  Download,
  Delete,
} from "lucide-react";

type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};
export const navItems: NavItem[] = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Documents", path: "/documents", icon: Files },
  { name: "Images", path: "/images", icon: Image },
  { name: "Media", path: "/media", icon: Clapperboard },
  { name: "Archives", path: "/archives", icon: Archive },
  { name: "Others", path: "/others", icon: ChartPie },
];

export const adminDropdownItems: ActionType[] = [
  { label: "Rename", icon: Edit, value: "rename" },
  { label: "Details", icon: Info, value: "details" },
  { label: "Share", icon: Share, value: "share" },
  { label: "Download", icon: Download, value: "download" },
  { label: "Delete", icon: Delete, value: "delete" },
];

export const dropdownItems: ActionType[] = [
  { label: "Details", icon: Info, value: "details" },
  { label: "Download", icon: Download, value: "download" },
];

export const getDropDownItems = (isAdmin: boolean) =>
  isAdmin ? adminDropdownItems : dropdownItems;

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Date created (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];
export const placeholderImageUrl = "https://avatar.iran.liara.run/public/47";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
