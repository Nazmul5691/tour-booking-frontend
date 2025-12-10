"use client";


import ManagementTable from "@/components/shared/ManagementTable";
import { IGuide } from "@/types/guide.interface";
import { useState } from "react";
import { GuideColumns } from "./guideColumns";
import GuideViewDetailDialog from "./guideViewDetails";

interface GuideTableProps {
    user: IGuide[];
}

const GuideTable = ({ user }: GuideTableProps) => {
    const [viewingUser, setViewingUser] = useState<IGuide | null>(null);
   

    // const handleRefresh = () => {
    //     startTransition(() => {
    //         router.refresh();
    //     });
    // };

    

    return (
        <>
            <ManagementTable
                data={user}
                columns={GuideColumns}
                onView={(user) => setViewingUser(user)}
                // onEdit={(user) => setEditingUser(user)}
                getRowKey={(user) => user._id!}
                emptyMessage="No guides found"
            />

            {/* Edit Guide Form Dialog */}
            {/* <GuideFormDialog
                open={!!editingUser}
                onClose={() => setEditingUser(null)}
                user={editingUser || undefined}
                onSuccess={handleRefresh}
            /> */}

            {/* View Guide Detail Dialog */}
            <GuideViewDetailDialog
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser}
            />
        </>
    );
};

export default GuideTable;
