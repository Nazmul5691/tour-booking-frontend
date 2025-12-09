
"use client";

// import { DateCell } from "@/components/shared/cell/DateCell";
// // import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
// import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
// import { Column } from "@/components/shared/ManagementTable";
// import { IUser } from "@/types/user.interface";

// export const userColumns: Column<IUser>[] = [
//   {
//     header: "User",
//     accessor: (user) => (
//       <UserInfoCell
//         name={user.name}
//         email={user.email}
//         photo={user.picture}
//       />
//     ),
//     sortKey: "name",
//   },
//   {
//     header: "Guide Status",
//     accessor: (user) => (
//       <div className="flex flex-col">
//         <span className="text-sm">
//           {user.guideStatus === "APPROVED" ? "Verified Guide" : "Normal User"}
//         </span>
//       </div>
//     ),
//   },
//   {
//     header: "Contact",
//     accessor: (user) => (
//       <div className="flex flex-col">
//         <span className="text-sm">{user.phone}</span>
//       </div>
//     ),
//   },
//   {
//     header: "Address",
//     accessor: (user) => (
//       <span className="text-sm">{user.address || "N/A"}</span>
//     ),
//   },
//   // {
//   //   header: "Status",
//   //   accessor: (user) => <StatusBadgeCell isDeleted={user.isDeleted} />,
//   // },
//   {
//     header: "Joined",
//     accessor: (user) => <DateCell date={user.createdAt} />,
//     sortKey: "createdAt",
//   },
// ];





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