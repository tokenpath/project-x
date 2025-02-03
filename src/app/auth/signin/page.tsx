'use client';

import { SignInHook } from "@/hooks/auth/SignInHook";
import { SignInData } from "@/lib/zod/auth";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCircle2, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorAlert, InfoAlert, SuccessAlert } from "@/components/alerts/custom-alerts";

const SignInPage = () => {
  const router = useRouter();
  const { mutate, isPending, error } = SignInHook();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000); 
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground">
              Sign In
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your details to access your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {showSuccess && (
            <SuccessAlert
              title="Login Successful!"
              description="You have been logged in successfully. Redirecting..."
              className="mb-6"
              onDismiss={() => setShowSuccess(false)}
            />
          )}

          {error && (
            <ErrorAlert
              title="Login Failed"
              description={error.errors && error.errors.length > 0 ? error.errors : error.message}
              className="mb-6"
            />
          )}

          <InfoAlert
            description="Make sure to use the correct email and password."
            className="mb-6"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="john@example.com"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <a href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
