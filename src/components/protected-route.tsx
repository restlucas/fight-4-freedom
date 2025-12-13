"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/src/store/useAuth";
import { LoginDialog } from "./login-dialog";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: ("ADMIN" | "USER")[];
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      setOpenLogin(true);
      setChecking(false);
      router.replace("/");
    } else if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!roles.includes(user.role)) {
        router.replace("/");
      } else {
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, [user, requiredRole, router]);

  if (checking) return null;

  if (!user) {
    return <LoginDialog>{openLogin && <div />}</LoginDialog>;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
