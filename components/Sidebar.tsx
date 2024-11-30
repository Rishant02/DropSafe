"use client";
import { navItems, placeholderImageUrl } from "@/constants";
import { cn } from "@/lib/utils";
import { useUser } from "@/provider/UserContext";
import { IconPhotoShield } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <aside className="sidebar">
      <Link href={"/"}>
        <div className="hidden items-center gap-1 lg:flex">
          <IconPhotoShield size={48} className="text-brand h-auto" stroke={2} />
          <h1 className="h1 text-brand">DropSafe</h1>
        </div>
        <IconPhotoShield
          size={48}
          className="lg:hidden text-brand h-auto"
          stroke={2}
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6 md:gap-4 lg:gap-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link href={path} key={name} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === path && "shad-active"
                )}
              >
                <Icon
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === path && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src={"/files.svg"}
        alt="files-logo"
        width={586}
        height={418}
        className="hidden w-full lg:block"
      />
      <div className="sidebar-user-info">
        <Image
          src={user?.avatar || placeholderImageUrl}
          alt="user-avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{user?.fullName}</p>
          <p className="caption">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
