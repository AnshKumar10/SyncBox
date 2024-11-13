"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SIDEBAR_TABS } from "@/lib/constants";
import { signOutUser } from "@/lib/actions/user.actions";

interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col justify-between border-r border-gray-200 bg-white transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex flex-col flex-1">
        <div className="flex h-16 items-center justify-between px-4 py-4">
          {!isCollapsed && (
            <>
              <Link href="/" className="flex items-center gap-2">
                <Image src="/favicon.ico" alt="logo" width={40} height={40} />
                <h1 className="text-2xl font-bold tracking-tight">SyncBox</h1>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          <TooltipProvider delayDuration={0}>
            {SIDEBAR_TABS.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-blue-600" : "text-gray-500"
                        )}
                      />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-gray-100"
          />
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-gray-900">
                {fullName}
              </p>
              <p className="truncate text-xs text-gray-500">{email}</p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              onClick={signOutUser}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <LogOut className="h-4 w-4 text-gray-500" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
