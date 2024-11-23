import {
  LayoutDashboard,
  Files,
  Image,
  Clapperboard,
  ChartPie,
  LucideIcon,
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
  { name: "Others", path: "/others", icon: ChartPie },
];

export const placeholderImageUrl = "https://avatar.iran.liara.run/public/47";
