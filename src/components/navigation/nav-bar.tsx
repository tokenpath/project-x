'use client';

import React, { Suspense } from "react";
import { House, DraftingCompass, Nfc, Loader2 } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./client/signout-button";
import SignInButton from "./client/signin-button";
import SignUpButton from "./client/signup-button";
import "./nav-bar.css";
import { useMe } from "@/hooks/auth/MeHook";

const AuthButtons = () => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <Loader2 className="animate-spin text-hsl(var(--primary))" size={24} />;
  }

  return user?.id ? (
    <SignOutButton />
  ) : (
    <>
      <SignInButton />
      <SignUpButton />
    </>
  );
};

const NavigationBar: React.FC = () => {
  return (
    <nav className="relative overflow-hidden p-4 shadow-md">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-hsl(var(--primary))/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-hsl(var(--primary))/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group relative no-underline">
          <div className="flex items-center space-x-2">
            <span className="group relative text-xl font-bold">
              <span>Profile</span>
              <span className="animate-pulse-slow font-extrabold text-hsl(var(--primary))">
              </span>
              {" "}
              <span className="text-primary">X</span>
              <div className="animate-pulse-slow absolute inset-0 rounded-full bg-hsl(var(--primary))/30 blur-xl group-hover:opacity-100" />
            </span>
          </div>
        </Link>

        <div className="flex flex-1 justify-center space-x-6 md:space-x-4">
          {[
            {
              icon: <House className="mr-1 h-5 w-5" />,
              label: "Home",
              link: "/",
            },
            {
              icon: <DraftingCompass className="mr-1 h-5 w-5" />,
              label: "About Us",
              link: "/team",
            },
            {
              icon: <Nfc className="mr-1 h-5 w-5" />,
              label: "Contact",
              link: "/contact",
            },
          ].map((item, index) => (
            <div key={index} className="group relative flex items-center">
              <div className="absolute inset-0 rounded-full bg-hsl(var(--primary))/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              <Link
                href={item.link}
                className="text-gray relative z-10 flex items-center font-semibold no-underline transition-colors hover:text-hsl(var(--primary))"
              >
                {item.icon}
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Suspense fallback={<Loader2 className="animate-spin text-hsl(var(--primary))" size={24} />}>
            <AuthButtons />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;