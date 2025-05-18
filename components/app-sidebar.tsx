"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Brain,
  Home,
  Lightbulb,
  Settings,
  Zap,
  LogOut,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores/user-store";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export function AppSidebar() {
  const pathname = usePathname();
  const { level, xp } = useUserStore();
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    router.push("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground glow-effect">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">RecallMaster</span>
        </Link>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* User profile section */}
      <div className="mx-3 mb-1 flex items-center gap-3 rounded-md bg-muted/50 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Level {level}</span>
            <span className="text-xs font-medium text-primary">{xp} XP</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(xp / (level * 100)) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary"
            ></motion.div>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard")}
              className="group transition-all duration-200"
            >
              <Link href="/dashboard">
                <Home className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/decks")}
              className="group transition-all duration-200"
            >
              <Link href="/decks">
                <BookOpen className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Decks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/analytics")}
              className="group transition-all duration-200"
            >
              <Link href="/analytics">
                <BarChart3 className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/ai-generator")}
              className="group transition-all duration-200"
            >
              <Link href="/ai-generator">
                <Brain className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>AI Generator</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/settings")}
              className="group transition-all duration-200"
            >
              <Link href="/settings">
                <Settings className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <ModeToggle />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="premium-button"
          >
            <Link href="/ai-generator">
              <Lightbulb className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Generate Cards
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
