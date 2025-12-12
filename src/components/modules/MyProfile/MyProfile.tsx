/* eslint-disable @typescript-eslint/no-explicit-any */





// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Camera, Loader2, Save } from "lucide-react";
// import { updateMyProfile } from "@/services/auth/auth.service";
// import { IUser } from "@/types/user.interface";
// import { getInitials } from "@/lib/formatters";

// interface MyProfileProps {
//   userInfo: IUser;
// }

// const MyProfile = ({ userInfo }: MyProfileProps) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const formData = new FormData(e.currentTarget);

//     startTransition(async () => {
//       const result = await updateMyProfile(formData);

//       if (result.success) {
//         setSuccess(result.message);
//         setPreviewImage(null);
//         router.refresh();
//       } else {
//         setError(result.message);
//       }
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">My Profile</h1>
//         <p className="text-muted-foreground mt-1">Manage your personal information</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Profile Picture */}
//           <Card className="lg:col-span-1">
//             <CardHeader>
//               <CardTitle>Profile Picture</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center space-y-4">
//               <div className="relative">
//                 <Avatar className="h-32 w-32">
//                   {previewImage || userInfo.picture ? (
//                     <AvatarImage src={previewImage || userInfo.picture} alt={userInfo.name} />
//                   ) : (
//                     <AvatarFallback className="text-3xl">{getInitials(userInfo.name)}</AvatarFallback>
//                   )}
//                 </Avatar>
//                 <label
//                   htmlFor="file"
//                   className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
//                 >
//                   <Camera className="h-4 w-4" />
//                   <Input
//                     type="file"
//                     id="file"
//                     name="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                     disabled={isPending}
//                   />
//                 </label>
//               </div>
//               <div className="text-center">
//                 <p className="font-semibold text-lg">{userInfo.name}</p>
//                 <p className="text-sm text-muted-foreground">{userInfo.email}</p>
//                 <p className="text-xs text-muted-foreground mt-1 capitalize">{userInfo.role.replace("_", " ")}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Profile Info */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{error}</div>}
//               {success && <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">{success}</div>}

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input id="name" name="name" defaultValue={userInfo.name} required disabled={isPending} />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" value={userInfo.email} disabled className="bg-muted" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input id="phone" name="phone" defaultValue={userInfo.phone || ""} disabled={isPending} />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Input id="address" name="address" defaultValue={userInfo.address || ""} disabled={isPending} />
//                 </div>

//                 {/* GUIDE-Specific fields */}
//                 {userInfo.role === "GUIDE" && userInfo.guideInfo && (
//                   <>
//                     {/* <div className="space-y-2">
//                       <Label htmlFor="bio">Bio</Label>
//                       <Input id="bio" name="bio" defaultValue={userInfo.guideInfo.bio || ""} disabled={isPending} />
//                     </div> */}
//                     {/* <div className="space-y-2">
//                       <Label htmlFor="location">Location</Label>
//                       <Input id="location" name="location" defaultValue={userInfo.guideInfo.location || ""} disabled={isPending} />
//                     </div> */}
//                     {/* <div className="space-y-2">
//                       <Label htmlFor="languages">Languages (comma separated)</Label>
//                       <Input
//                         id="languages"
//                         name="languages"
//                         defaultValue={userInfo.guideInfo.languages?.join(", ") || ""}
//                         disabled={isPending}
//                       />
//                     </div> */}
//                     {/* <div className="space-y-2">
//                       <Label htmlFor="perTourCharge">Per Tour Charge</Label>
//                       <Input
//                         id="perTourCharge"
//                         name="perTourCharge"
//                         type="number"
//                         defaultValue={userInfo.guideInfo.perTourCharge || ""}
//                         disabled={isPending}
//                       />
//                     </div> */}
//                     <div className="space-y-2">
//                       <Label htmlFor="address">Address</Label>
//                       <Input id="address" name="address" defaultValue={userInfo.address || ""} disabled={isPending} />
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="flex justify-end pt-4">
//                 <Button type="submit" disabled={isPending}>
//                   {isPending ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" /> Save Changes
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyProfile;







// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Camera, Loader2, Save } from "lucide-react";
// import { updateUser } from "@/services/auth/auth.service";
// import { IUser } from "@/types/user.interface";
// import { getInitials } from "@/lib/formatters";

// interface MyProfileProps {
//   userInfo: IUser;
// }

// const MyProfile = ({ userInfo }: MyProfileProps) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const formData = new FormData(e.currentTarget);
//     formData.append("id", userInfo._id as string); // add user id to formData

//     startTransition(async () => {
//       try {
//         const result = await updateUser(formData);

//         // backend returns plain JSON
//         if (result) {
//           setSuccess("Profile updated successfully");
//           setPreviewImage(null);
//           router.refresh();
//         } else {
//           setError("Something went wrong");
//         }
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       }
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">My Profile</h1>
//         <p className="text-muted-foreground mt-1">Manage your personal information</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Profile Picture */}
//           <Card className="lg:col-span-1">
//             <CardHeader>
//               <CardTitle>Profile Picture</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center space-y-4">
//               <div className="relative">
//                 <Avatar className="h-32 w-32">
//                   {previewImage || userInfo.picture ? (
//                     <AvatarImage src={previewImage || userInfo.picture} alt={userInfo.name} />
//                   ) : (
//                     <AvatarFallback className="text-3xl">{getInitials(userInfo.name)}</AvatarFallback>
//                   )}
//                 </Avatar>
//                 <label
//                   htmlFor="file"
//                   className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
//                 >
//                   <Camera className="h-4 w-4" />
//                   <Input
//                     type="file"
//                     id="file"
//                     name="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                     disabled={isPending}
//                   />
//                 </label>
//               </div>
//               <div className="text-center">
//                 <p className="font-semibold text-lg">{userInfo.name}</p>
//                 <p className="text-sm text-muted-foreground">{userInfo.email}</p>
//                 <p className="text-xs text-muted-foreground mt-1 capitalize">{userInfo.role.replace("_", " ")}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Profile Info */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{error}</div>}
//               {success && <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">{success}</div>}

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input id="name" name="name" defaultValue={userInfo.name} required disabled={isPending} />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" value={userInfo.email} disabled className="bg-muted" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input id="phone" name="phone" defaultValue={userInfo.phone || ""} disabled={isPending} />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Input id="address" name="address" defaultValue={userInfo.address || ""} disabled={isPending} />
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <Button type="submit" disabled={isPending}>
//                   {isPending ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" /> Save Changes
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyProfile;




"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Save } from "lucide-react";
// Assuming this path is correct
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // The wrapped server action handles form submission and status updates
  const wrappedUpdateUser = async (formData: FormData) => {
    // Manually append the userId which is needed for the PATCH route URL
    formData.append("id", userInfo._id as string);

    // Reset messages
    setError(null);
    setSuccess(null);

    // Use startTransition to trigger the pending state
    startTransition(async () => {
      try {
        // Call the server action which contains the double-stringification logic
        const result = await updateUser(null, formData);

        if (result && result.success) {
          setSuccess("Profile updated successfully");
          setPreviewImage(null);
          // Refresh the router to re-fetch getUserInfo with the new data
          router.refresh();
        } else {
          // Fallback for non-error responses that still indicate failure
          setError("Something went wrong during the update process.");
        }
      } catch (err: any) {
        // Catch and display error (e.g., phone number taken, Zod validation errors)
        setError(err.message || "Something went wrong. Please check your inputs.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      {/* Use the 'action' attribute to call the wrapped server action */}
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
                <label
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
                </label>
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
              {/* Error and Success Messages */}
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
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
                </div>

                {/* Phone Input */} 
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={userInfo.phone || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
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