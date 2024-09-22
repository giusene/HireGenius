import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import Loading from "@/components/Atoms/Loading/Loading";

const LogoutPage = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      router.push("/login");
    };

    handleLogout();
  }, [logout, router]);

  return <Loading />;
};

export default LogoutPage;
