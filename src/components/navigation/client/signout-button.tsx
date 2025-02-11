"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { SignOutHook } from '@/hooks/auth/SignOutHook';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const { mutate: signOut } = SignOutHook();
  const router = useRouter()
  const handleSignOut = () => {
      signOut()
      router.refresh()
  }

  return (
    <Button onClick={()=> handleSignOut()} variant="outline" className="rounded-full font-semibold relative group">
      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      <LogOut className="w-5 h-5 mr-2"/> 
      Log Out
    </Button>
  );
};

export default SignOutButton;