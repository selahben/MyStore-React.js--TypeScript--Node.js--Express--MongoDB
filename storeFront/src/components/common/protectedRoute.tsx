import { Navigate } from "react-router-dom";
import { useStoreContext } from "../../context/store.context";
import React, { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { signedIn } = useStoreContext();

  if (!signedIn?.isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
