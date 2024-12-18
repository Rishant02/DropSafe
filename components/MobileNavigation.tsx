"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconPhotoShield } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { navItems, placeholderImageUrl } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.action";
import { useUser } from "@/provider/UserContext";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <header className="mobile-header">
      <div className="items-center gap-1 flex">
        <IconPhotoShield size={32} className="text-brand h-auto" stroke={2} />
        <h1 className="h3 text-brand">DropSafe</h1>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu aria-label="Toggle Menu" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={user?.avatar || placeholderImageUrl}
                alt="user-avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{user?.fullName}</p>
                <p className="caption">{user?.email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ name, path, icon: Icon }) => (
                <Link href={path} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
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
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-center gap-5 pb-5">
            <FileUploader />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <LogOut strokeWidth={3} width={24} height={24} />
              <p>Sign out</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
