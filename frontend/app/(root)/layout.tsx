import { getCurrentUser } from "@/lib/actions/auth.action";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="root-layout">
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default RootLayout;
