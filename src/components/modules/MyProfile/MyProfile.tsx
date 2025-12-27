/* eslint-disable @typescript-eslint/no-explicit-any */




"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { updateUser } from "@/services/auth/auth.service";
import { IUser } from "@/types/user.interface";
import { getInitials } from "@/lib/formatters";

interface MyProfileProps {
  userInfo: IUser;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => setPreviewImage(reader.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const wrappedUpdateUser = async (formData: FormData) => {
  //   formData.append("id", userInfo._id as string);

  //   // Reset messages
  //   setError(null);
  //   setSuccess(null);

  //   startTransition(async () => {
  //     try {
  //       const result = await updateUser(null, formData);

  //       if (result?.success) {
  //         setSuccess("✅ Profile updated successfully!");
  //         setPreviewImage(null);
  //         router.refresh();
  //       } else {
  //         setError("Something went wrong during the update process.");
  //       }
  //     } catch (err: any) {
  //       // Extract error message
  //       const errorMessage = err.message || "Something went wrong. Please try again.";

  //       // Map backend errors to user-friendly messages
  //       if (errorMessage.includes("phone number is already taken")) {
  //         setError("⚠️ This phone number is already registered. Please use a different phone number.");
  //       } else if (errorMessage.includes("Phone number must be valid for Bangladesh")) {
  //         setError("📱 Please enter a valid Bangladesh phone number (Format: 01XXXXXXXXX or +8801XXXXXXXXX)");
  //       } else if (errorMessage.includes("Name too short")) {
  //         setError("✏️ Name must be at least 2 characters long.");
  //       } else if (errorMessage.includes("Name too long")) {
  //         setError("✏️ Name cannot exceed 50 characters.");
  //       } else if (errorMessage.includes("Address cannot exceed")) {
  //         setError("📍 Address cannot exceed 200 characters.");
  //       } else if (errorMessage.includes("not authorized")) {
  //         setError("🔒 You don't have permission to perform this action.");
  //       } else if (errorMessage.includes("User not found")) {
  //         setError("❌ User not found.");
  //       } else {
  //         // Show the original error message for unhandled cases
  //         setError(errorMessage);
  //       }
  //     }
  //   });
  // };

  const wrappedUpdateUser = async (formData: FormData) => {
    formData.append("id", userInfo._id as string);

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const result = await updateUser(null, formData);

        if (result?.success) {
          setSuccess("✅ Profile updated successfully!");
          setPreviewImage(null);
          router.refresh();
        } else {
          setError("Something went wrong during the update process.");
        }
      } catch (err: any) {
        const errorMessage = err.message || "Something went wrong. Please try again.";

        // This will now properly match the Zod error message
        if (errorMessage.includes("Phone number must be valid for Bangladesh")) {
          setError("📱 Please enter a valid Bangladesh phone number (Format: 01XXXXXXXXX or +8801XXXXXXXXX)");
        } else if (errorMessage.includes("phone number is already taken")) {
          setError("⚠️ This phone number is already registered. Please use a different phone number.");
        } else if (errorMessage.includes("Name too short")) {
          setError("✏️ Name must be at least 2 characters long.");
        } else if (errorMessage.includes("Name too long")) {
          setError("✏️ Name cannot exceed 50 characters.");
        } else if (errorMessage.includes("Address cannot exceed")) {
          setError("📍 Address cannot exceed 200 characters.");
        } else if (errorMessage.includes("not authorized")) {
          setError("🔒 You don't have permission to perform this action.");
        } else if (errorMessage.includes("User not found")) {
          setError("❌ User not found.");
        } else {
          // Show the original error message
          setError(errorMessage);
        }
      }
    });
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <form action={wrappedUpdateUser}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {previewImage || userInfo.picture ? (
                    <AvatarImage src={previewImage || userInfo.picture} alt={userInfo.name} />
                  ) : (
                    <AvatarFallback className="text-3xl">{getInitials(userInfo.name)}</AvatarFallback>
                  )}
                </Avatar>
                {/* <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label> */}
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{userInfo.name}</p>
                <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {userInfo.role.replace("_", " ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm border border-destructive/20">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm border border-green-500/20">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo.name}
                    required
                    disabled={isPending}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input (Disabled) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={userInfo.phone || ""}
                    disabled={isPending}
                    placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                  />
                  <p className="text-xs text-muted-foreground">Format: 01XXXXXXXXX or +8801XXXXXXXXX</p>
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;