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
    <main className="flex h-screen relative">
      <div className="h-screen bg-white z-10 sm:sticky sm:top-0 sm:h-full sm:z-20 sm:block absolute sm:left-0">
        <Sidebar {...currentUser} />
      </div>
      <section className="flex flex-col sm:ml-0 ml-20  flex-1 h-screen overflow-hidden">
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="flex-1 overflow-y-auto p-4 sm:pl-4">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
