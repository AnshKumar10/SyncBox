import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { CloudIcon, LockIcon, ShareIcon } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const features = [
    {
      title: "Secure Storage",
      description:
        "Enterprise-grade encryption keeps your files safe and secure",
      icon: <LockIcon className="text-3xl text-white" />,
    },
    {
      title: "Easy Sharing",
      description: "Share files and folders with customizable access controls",
      icon: <ShareIcon className="text-3xl text-white" />,
    },
    {
      title: "Anywhere Access",
      description: "Access your files from any device, anytime, anywhere",
      icon: <CloudIcon className="text-3xl text-white" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <section className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="relative w-full">
          <div className="relative h-full flex flex-col items-center justify-center p-12 space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <Image
                    src="/favicon.ico"
                    alt="SyncBox Logo"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                SyncBox
              </h1>
              <p className="text-xl text-white/80">
                Your Digital Workspace, Simplified
              </p>
            </div>
            <div className="grid gap-4 w-full max-w-lg">
              {features.map((card, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-0"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {card.icon}
                      <h3 className="text-lg text-white font-semibold">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-white/70">{card.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full lg:w-1/2 bg-white">
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="lg:hidden text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">SyncBox</h2>
              <p className="text-gray-600">
                Your Digital Workspace, Simplified
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layout;
