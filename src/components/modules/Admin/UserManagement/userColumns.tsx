
"use client";


import { Column } from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user.interface";
import { DateCell } from "@/components/shared/cell/DateCell";
import StatusCell from "@/components/shared/cell/StatusCell";

export const userColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => user.name,
  },
  {
    header: "Email",
    accessor: (user) => user.email,
  },
  {
    header: "Guide Status",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">
          {user.guideStatus === "APPROVED" ? "Verified Guide" : "Normal User"}
        </span>
      </div>
    ),
  },
  // {
  //   header: "Status",
  //   accessor: (user) => {
  //     const router = useRouter();
  //     const [, startTransition] = useTransition();
  //     const [loading, setLoading] = useState(false);

  //     const handleToggleStatus = async () => {
  //       try {
  //         setLoading(true);
  //         const newStatus =
  //           user.isActive === IsActive.ACTIVE
  //             ? IsActive.BLOCKED
  //             : IsActive.ACTIVE;

  //         const result = await updateUserStatus(user._id!, newStatus);

  //         if (result.success) {
  //           toast.success("User status updated");
  //           startTransition(() => router.refresh());
  //         } else {
  //           toast.error(result.message || "Failed to update status");
  //         }
  //       } catch (error: any) {
  //         toast.error(error.message || "Error updating status");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (user.role === "SUPER_ADMIN") {
  //       return <Badge variant="destructive">SUPER ADMIN</Badge>;
  //     }

  //     return (
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <Button
  //             size="sm"
  //             variant={
  //               user.isActive === IsActive.ACTIVE ? "default" : "destructive"
  //             }
  //             onClick={handleToggleStatus}
  //             disabled={loading}
  //           >
  //             {loading
  //               ? "Updating..."
  //               : user.isActive === IsActive.ACTIVE
  //                 ? "ACTIVE"
  //                 : "BLOCKED"}
  //           </Button>
  //         </TooltipTrigger>
  //         <TooltipContent>
  //           <span>Click to toggle status</span>
  //         </TooltipContent>
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    header: "Status",
    accessor: (user) => <StatusCell user={user} />,
  },
  {
    header: "Joined",
    accessor: (user) => <DateCell date={user.createdAt} />,
    sortKey: "createdAt",
  },
];