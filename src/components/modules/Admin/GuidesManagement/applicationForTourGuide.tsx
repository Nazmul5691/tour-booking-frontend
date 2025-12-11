// /* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";

// type Props = {
//     getGuideApplicationForTour: {
//         data: any[];
//         meta?: any;
//     };
// };

// export default function ApplicationForTourGuide({
//     getGuideApplicationForTour,
// }: Props) {
//     const applications = getGuideApplicationForTour?.data || [];

//     if (!applications.length) {
//         return (
//             <div className="rounded-md border p-4 text-center text-muted-foreground">
//                 No guide applications found
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Tour Guide Applications</h2>

//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>User Name</TableHead>
//                             <TableHead>Tour Name</TableHead>
//                             <TableHead>Message</TableHead>
//                             <TableHead>Status</TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {applications.map((application) => (
//                             <TableRow key={application._id}>
//                                 {/* ✅ User Name */}
//                                 <TableCell className="font-medium">
//                                     {application.user?.name || "N/A"}
//                                 </TableCell>

//                                 {/* ✅ Tour Title */}
//                                 <TableCell>
//                                     {application.tour?.title || "N/A"}
//                                 </TableCell>

//                                 {/* ✅ Message */}
//                                 <TableCell className="max-w-sm truncate">
//                                     {application.message}
//                                 </TableCell>

//                                 {/* ✅ Status */}
//                                 <TableCell>
//                                     <Badge
//                                         variant={
//                                             application.status === "APPROVED"
//                                                 ? "default"      // ✅ success-like
//                                                 : application.status === "REJECTED"
//                                                     ? "destructive"  // ✅ red
//                                                     : "secondary"    // ✅ pending
//                                         }
//                                     >
//                                         {application.status}
//                                     </Badge>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     );
// }





// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useTransition } from "react";
// import { updateApplicationStatusAction } from "@/services/admin/guideManagement";

// type Props = {
//     getGuideApplicationForTour: {
//         data: any[];
//         meta?: any;
//     };
// };

// export default function ApplicationForTourGuide({ getGuideApplicationForTour }: Props) {
//     const applications = getGuideApplicationForTour?.data || [];
//     const [isPending, startTransition] = useTransition();

//     if (!applications.length) {
//         return (
//             <div className="rounded-md border p-4 text-center text-muted-foreground">
//                 No guide applications found
//             </div>
//         );
//     }

//     const handleStatusChange = (id: string, status: "APPROVED" | "REJECTED") => {
//         startTransition(() => {
//             updateApplicationStatusAction(id, status);
//         });
//     };

//     return (
//         <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Tour Guide Applications</h2>

//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>User Name</TableHead>
//                             <TableHead>Tour Name</TableHead>
//                             <TableHead>Message</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {applications.map((application) => (
//                             <TableRow key={application._id}>
//                                 {/* User Name */}
//                                 <TableCell className="font-medium">
//                                     {application.user?.name || "N/A"}
//                                 </TableCell>

//                                 {/* Tour Title */}
//                                 <TableCell>
//                                     {application.tour?.title || "N/A"}
//                                 </TableCell>

//                                 {/* Message */}
//                                 <TableCell className="max-w-sm truncate">
//                                     {application.message}
//                                 </TableCell>

//                                 {/* Status */}
//                                 <TableCell>
//                                     <Badge
//                                         variant={
//                                             application.status === "APPROVED"
//                                                 ? "default"
//                                                 : application.status === "REJECTED"
//                                                     ? "destructive"
//                                                     : "secondary"
//                                         }
//                                     >
//                                         {application.status}
//                                     </Badge>
//                                 </TableCell>

//                                 {/* Actions */}
//                                 <TableCell>
//                                     <div className="flex gap-2">
//                                         {/* If status = PENDING → Approve button */}
//                                         {application.status === "PENDING" && (
//                                             <Button
//                                                 size="sm"
//                                                 disabled={isPending}
//                                                 onClick={() =>
//                                                     handleStatusChange(application._id, "APPROVED")
//                                                 }
//                                             >
//                                                 Approve
//                                             </Button>
//                                         )}

//                                         {/* If status = APPROVED → Reject button */}
//                                         {application.status === "APPROVED" && (
//                                             <Button
//                                                 size="sm"
//                                                 variant="destructive"
//                                                 disabled={isPending}
//                                                 onClick={() =>
//                                                     handleStatusChange(application._id, "REJECTED")
//                                                 }
//                                             >
//                                                 Reject
//                                             </Button>
//                                         )}

//                                         {/* If status = REJECTED → No Actions */}
//                                         {application.status === "REJECTED" && (
//                                             <span className="text-muted-foreground text-sm">
//                                                 No actions
//                                             </span>
//                                         )}
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//         </div>
//     );
// }





/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { updateApplicationStatusAction } from "@/services/admin/guideManagement";

type Props = {
    getGuideApplicationForTour: {
        data: any[];
        meta?: any;
    };
};

export default function ApplicationForTourGuide({ getGuideApplicationForTour }: Props) {
    const applications = getGuideApplicationForTour?.data || [];
    const [isPending, startTransition] = useTransition();

    if (!applications.length) {
        return (
            <div className="rounded-md border p-4 text-center text-muted-foreground">
                No guide applications found
            </div>
        );
    }

    const handleStatusChange = (id: string, status: "APPROVED" | "REJECTED") => {
        startTransition(() => {
            // NOTE: You might want to add error handling/toasts here if updateApplicationStatusAction doesn't handle them internally
            updateApplicationStatusAction(id, status);
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tour Guide Applications</h2>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Name</TableHead>
                            <TableHead>Tour Name</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application._id}>
                                {/* User Name */}
                                <TableCell className="font-medium">
                                    {application.user?.name || "N/A"}
                                </TableCell>

                                {/* Tour Title */}
                                <TableCell>
                                    {application.tour?.title || "N/A"}
                                </TableCell>

                                {/* Message */}
                                <TableCell className="max-w-sm truncate">
                                    {application.message}
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <Badge
                                        variant={
                                            application.status === "APPROVED"
                                                ? "default"
                                                : application.status === "REJECTED"
                                                    ? "destructive"
                                                    : "secondary"
                                        }
                                    >
                                        {application.status}
                                    </Badge>
                                </TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <div className="flex gap-2">
                                        {/* If status = PENDING → Show Approve and Reject buttons */}
                                        {application.status === "PENDING" ? (
                                            <>
                                                {/* Approve Button */}
                                                <Button
                                                    size="sm"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        handleStatusChange(application._id, "APPROVED")
                                                    }
                                                >
                                                    Approve
                                                </Button>

                                                {/* Reject Button */}
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        handleStatusChange(application._id, "REJECTED")
                                                    }
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            /* If status is APPROVED or REJECTED → Show No actions */
                                            <span className="text-muted-foreground text-sm">
                                                No actions
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}