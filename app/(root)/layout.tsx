import React from "react";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { RouteUrls } from "@/lib/enums";
import { Toaster } from "@/components/ui/toaster";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect(RouteUrls.SIGN_IN);

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};
export default Layout;
