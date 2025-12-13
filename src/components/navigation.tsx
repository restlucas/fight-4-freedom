"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Target,
  Users,
  Trophy,
  Menu,
  LogIn,
  User,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { LoginDialog } from "@/src/components/login-dialog";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/store/useAuth";
import { UserAvatarPopover } from "./user-avatar-popover";
import { useState } from "react";

const navItems = [
  { href: "/", label: "HOME", icon: Target },
  { href: "/jogadores", label: "JOGADORES", icon: Users },
  { href: "/medalhas", label: "MEDALHAS", icon: Trophy },
];

export function Navigation() {
  const pathname = usePathname();

  const { user, isAdmin, initialized, logout } = useAuth();
  const isLoggedIn = !!user;

  const [sheetOpen, setSheetOpen] = useState(false);

  if (!initialized) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Target className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">FIGHT 4 FREEDOM</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-lg font-semibold transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <div className="ml-2 pl-6 border-l border-border/40">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="text-lg">DASHBOARD</span>
                    </Button>
                  </Link>
                )}
                <UserAvatarPopover user={user} />
              </div>
            ) : (
              <LoginDialog>
                <Button variant="default" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  LOGIN
                </Button>
              </LoginDialog>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-12 h-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-base font-semibold transition-colors hover:text-primary rounded-md",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-border/40 flex flex-col flex-1 h-full">
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        className="text-base flex items-center gap-3 px-4 py-3 font-semibold text-muted-foreground hover:text-primary rounded-md"
                        onClick={() => setSheetOpen(false)}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                      </Link>
                    )}

                    <Link
                      href="/perfil"
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-muted-foreground hover:text-primary rounded-md"
                      onClick={() => setSheetOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      {user?.name}
                    </Link>

                    <div className="w-full mt-auto p-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          logout();
                          setSheetOpen(false);
                        }}
                        className="w-full"
                      >
                        Sair
                      </Button>
                    </div>
                  </>
                ) : (
                  <LoginDialog>
                    <Button variant="default" className="w-full gap-2">
                      <LogIn className="h-4 w-4" />
                      LOGIN
                    </Button>
                  </LoginDialog>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
