// "use client";

// import { Button } from "@/components/ui/button";
// import TourFormDialog from "./TourFormDialog";
// import { useState } from "react";
// import { IDivision } from "@/types/division.interface";
// import { ITourType } from "@/types/tour.interface";

// interface Props {
//     divisions: IDivision[];
//     tourTypes: ITourType[];
// }

// const TourManagementHeader = ({ divisions, tourTypes }: Props) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-xl font-semibold">Tour Management</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Create, update, and manage all tours
//                     </p>
//                 </div>

//                 <Button onClick={() => setOpen(true)}>Create Tour</Button>
//             </div>

//             <TourFormDialog
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 divisions={divisions}
//                 tourTypes={tourTypes}
//             />
//         </>
//     );
// };

// export default TourManagementHeader;




"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IDivision } from "@/types/division.interface";
import { ITourType } from "@/types/tour.interface";
import { TourFormDialog } from "./TourFormDialog";

interface Props {
    divisions: IDivision[];
    tourTypes: ITourType[];
}

const TourManagementHeader = ({ divisions, tourTypes }: Props) => {
    const [open, setOpen] = useState(false);

    // onSuccess callback passed to the dialog
    const handleSuccess = () => {
        console.log("Tour created/updated successfully!");
        // Optionally trigger table refresh if needed
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Tour Management</h1>
                    <p className="text-sm text-muted-foreground">
                        Create, update, and manage all tours
                    </p>
                </div>

                <Button onClick={() => setOpen(true)}>Create Tour</Button>
            </div>

            <TourFormDialog
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={handleSuccess}
                allDivisions={divisions}
                tourTypes={tourTypes}
            />
        </>
    );
};

export default TourManagementHeader;




