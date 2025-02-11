"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Mail,
  Lock,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { SettingsTypes } from "@/types/settings/settings";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { SettingsHook } from "@/hooks/auth/UpdateHook";
import { ErrorAlert, SuccessAlert } from "@/components/alerts/custom-alerts";

const SettingsPage: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const [emailForm, setEmailForm] = useState<SettingsTypes["EmailFormState"]>({
    oldPassword: "",
    newEmail: "",
  });

  const [passwordForm, setPasswordForm] = useState<
    SettingsTypes["PasswordFormState"]
  >({
    oldPassword: "",
    newPassword: "",
  });

  const mutation = SettingsHook();

  const handleEmailChange = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    mutation.mutate(
      {
        operation: "changeEmail",
        ...emailForm,
      },
      {
        onSuccess: () => {
          setEmailForm({ oldPassword: "", newEmail: "" });
        },
      }
    );
  };

  const handlePasswordChange = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    mutation.mutate(
      {
        operation: "changePassword",
        ...passwordForm,
      },
      {
        onSuccess: () => {
          setPasswordForm({ oldPassword: "", newPassword: "" });
        },
      }
    );
  };

  const handleEmailFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ContentLayout title="Settings">
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-2xl">
          <Card>
            <div className="flex flex-col items-center justify-center p-4">
              {mutation.error && (
                <ErrorAlert
                  description={mutation.error.message}
                  className="w-full max-w-md" 
                />
              )}

              {mutation.data && (
                <SuccessAlert
                  description={mutation.data.message}
                  className="w-full max-w-md mt-3" 
                />
              )}
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-6 w-6" />
                Settings
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="email"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Change Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Change Password
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleEmailChange} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          name="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          value={emailForm.oldPassword}
                          onChange={handleEmailFormChange}
                          required
                          minLength={12}
                          maxLength={100}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-email">New Email Address</Label>
                      <Input
                        id="new-email"
                        name="newEmail"
                        type="email"
                        value={emailForm.newEmail}
                        onChange={handleEmailFormChange}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          Change Email
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="password">
                  <form
                    onSubmit={handlePasswordChange}
                    className="space-y-4 mt-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="old-password">Old Password</Label>
                      <div className="relative">
                        <Input
                          id="old-password"
                          name="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          value={passwordForm.oldPassword}
                          onChange={handlePasswordFormChange}
                          required
                          minLength={12}
                          maxLength={100}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={handlePasswordFormChange}
                          required
                          minLength={12}
                          maxLength={100}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          Change Password
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SettingsPage;
