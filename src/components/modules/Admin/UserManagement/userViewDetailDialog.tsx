// "use client";
// import InfoRow from "@/components/shared/InoRow";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { formatDateTime, getInitials } from "@/lib/formatters";
// import { IUser } from "@/types/user.interface";
// import {
//   Calendar,
//   Mail,
//   MapPin,
//   Phone,
//   User,
// } from "lucide-react";

// interface IUserViewDialogProps {
//   open: boolean;
//   onClose: () => void;
//   user: IUser | null;
// }

// const UserViewDetailDialog = ({
//   open,
//   onClose,
//   user,
// }: IUserViewDialogProps) => {
//   if (!user) {
//     return null;
//   }

  

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
//         <DialogHeader className="px-6 pt-6 pb-4">
//           <DialogTitle>User Profile</DialogTitle>
//         </DialogHeader>

//         <div className="flex-1 overflow-y-auto px-6 pb-6">
//           {/* Patient Profile Header */}
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
//             <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
//               <AvatarImage
//                 src={user?.picture || ""}
//                 alt={user?.name}
//               />
//               <AvatarFallback className="text-2xl">
//                 {getInitials(user?.name || "")}
//               </AvatarFallback>
//             </Avatar>
//             <div className="flex-1 text-center sm:text-left">
//               <h2 className="text-3xl font-bold mb-1">{user?.name}</h2>
//               <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
//                 <Mail className="h-4 w-4" />
//                 {user?.email}
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//                 <Badge
//                   variant={user?.isDeleted ? "destructive" : "default"}
//                   className="text-sm"
//                 >
//                   {user?.isDeleted ? "Inactive" : "Active"}
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           {/* Information Grid */}
//           <div className="space-y-6">
//             {/* Contact Information */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <Phone className="h-5 w-5 text-purple-600" />
//                 <h3 className="font-semibold text-lg">Contact Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
//                 <div className="flex items-start gap-3">
//                   <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
//                   <InfoRow
//                     label="Contact Number"
//                     value={user?.phone || "Not provided"}
//                   />
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
//                   <InfoRow
//                     label="Email"
//                     value={user?.email || "Not provided"}
//                   />
//                 </div>
//                 <div className="flex items-start gap-3 md:col-span-2">
//                   <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
//                   <InfoRow
//                     label="Address"
//                     value={user?.address || "Not provided"}
//                   />
//                 </div>
//               </div>
//             </div>

            

          

//             <Separator />

//             {/* Personal Information */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <User className="h-5 w-5 text-orange-600" />
//                 <h3 className="font-semibold text-lg">Account Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
//                 <div className="flex items-start gap-3">
//                   <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
//                   <InfoRow
//                     label="Joined On"
//                     value={formatDateTime(user?.createdAt || "")}
//                   />
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
//                   <InfoRow
//                     label="Last Updated"
//                     value={formatDateTime(user?.updatedAt || "")}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserViewDetailDialog;







"use client";
import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IUser } from "@/types/user.interface";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

interface IUserViewDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

const UserViewDetailDialog = ({
  open,
  onClose,
  user,
}: IUserViewDialogProps) => {
  if (!user) {
    return null;
  }

  

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl">User Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Patient Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-4 sm:mb-6">
            <Avatar className="h-20 sm:h-24 w-20 sm:w-24 border-4 border-white shadow-lg shrink-0">
              <AvatarImage
                src={user?.picture || ""}
                alt={user?.name}
              />
              <AvatarFallback className="text-xl sm:text-2xl">
                {getInitials(user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left w-full">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 wrap-break-word">{user?.name}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap break-all">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">{user?.email}</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={user?.isDeleted ? "destructive" : "default"}
                  className="text-xs sm:text-sm"
                >
                  {user?.isDeleted ? "Inactive" : "Active"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 shrink-0" />
                <h3 className="font-semibold text-base sm:text-lg">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-muted/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Contact Number"
                    value={user?.phone || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Email"
                    value={user?.email || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-2 sm:gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Address"
                    value={user?.address || "Not provided"}
                  />
                </div>
              </div>
            </div>

            

          

            <Separator />

            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <User className="h-4 sm:h-5 w-4 sm:w-5 text-orange-600 shrink-0" />
                <h3 className="font-semibold text-base sm:text-lg">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-muted/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Joined On"
                    value={formatDateTime(user?.createdAt || "")}
                  />
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Last Updated"
                    value={formatDateTime(user?.updatedAt || "")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailDialog;