import {
  LayoutDashboard,
  Files,
  Image,
  Clapperboard,
  ChartPie,
  LucideIcon,
  Archive,
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

export const placeholderImageUrl = "https://avatar.iran.liara.run/public/47";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
