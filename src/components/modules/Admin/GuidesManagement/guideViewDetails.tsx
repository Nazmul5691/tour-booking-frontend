

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
import { IGuide } from "@/types/guide.interface";
// Assuming you have IUser defined in a types file
import { IUser } from "@/types/user.interface";
import { Mail, Phone, User } from "lucide-react";

interface IGuideViewDialogProps {
    open: boolean;
    onClose: () => void;
    user: IGuide | null;
}

const GuideViewDetailDialog = ({ open, onClose, user }: IGuideViewDialogProps) => {
    if (!user) return null;

    const guide = user;
    
    // Extract the populated user object safely with type assertion
    const associatedUser = (typeof guide.user === 'object' && guide.user !== null 
        ? guide.user 
        : {}) as Partial<IUser>; 

    // Access user properties using the safely extracted object
    const userName = associatedUser.name || "N/A";
    const userEmail = associatedUser.email || "N/A";
    const userPhone = associatedUser.phone || "Not provided";
    const userAddress = associatedUser.address || "Not provided";
    const userJoinedDate = associatedUser.createdAt || "";


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                    <DialogTitle className="text-lg sm:text-xl">Guide Profile</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg mb-4 sm:mb-6">
                        <Avatar className="h-20 sm:h-24 w-20 sm:w-24 border-4 border-white shadow-lg shrink-0">
                            <AvatarImage src={associatedUser.picture || ""} alt={userName} />
                            <AvatarFallback className="text-xl sm:text-2xl">{getInitials(userName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left w-full">
                            {/* FIX: Use User Name */}
                            <h2 className="text-2xl sm:text-3xl font-bold mb-1 wrap-break-word">{userName}</h2> 
                            {/* FIX: Use User Email */}
                            <p className="text-sm sm:text-base text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap break-all">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span className="break-all">{userEmail}</span>
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {/* Correct: Use Guide Status */}
                                <Badge variant={guide.status === "APPROVED" ? "default" : "destructive"} className="text-xs sm:text-sm">
                                    {guide.status || "PENDING"} 
                                </Badge>
                                {/* Show User Role */}
                                <Badge variant="secondary" className="text-xs sm:text-sm">
                                    <User className="h-3 w-3 mr-1" />
                                    {associatedUser.role || "USER"} 
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {/* Guide Information Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <User className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 shrink-0" />
                                <h3 className="font-semibold text-base sm:text-lg">Guide Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-muted/50 p-3 sm:p-4 rounded-lg">
                                <InfoRow label="Experience" value={`${guide.experienceYears || 0} years`} />
                                <InfoRow label="Per Tour Charge" value={`$${guide.perTourCharge || 0}`} />
                                <InfoRow label="Average Rating" value={`${guide.averageRating || 0} (${guide.totalReviews} reviews)`} />
                                <InfoRow label="Wallet Balance" value={`$${guide.walletBalance || 0}`} />
                                <InfoRow label="Languages" value={guide.languages.join(", ") || "None"} />
                                <div className="md:col-span-2">
                                    <InfoRow label="Bio" value={guide.bio || "No bio provided."} />
                                </div>
                            </div>
                        </div>

                        <Separator />
                        
                        {/* Contact Information Section - FIX: Use associatedUser properties */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 shrink-0" />
                                <h3 className="font-semibold text-base sm:text-lg">Contact Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-muted/50 p-3 sm:p-4 rounded-lg">
                                <InfoRow label="Email" value={userEmail} />
                                <InfoRow label="Contact Number" value={userPhone} />
                                <div className="md:col-span-2">
                                    <InfoRow label="Address" value={userAddress} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Account Information Section - FIX: Use associatedUser.createdAt */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <User className="h-4 sm:h-5 w-4 sm:w-5 text-orange-600 shrink-0" />
                                <h3 className="font-semibold text-base sm:text-lg">Account Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-muted/50 p-3 sm:p-4 rounded-lg">
                                <InfoRow label="Joined On" value={formatDateTime(userJoinedDate)} />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default GuideViewDetailDialog;