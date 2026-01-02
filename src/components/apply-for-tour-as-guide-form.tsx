// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useActionState, useEffect } from "react";
// import { useFormStatus } from "react-dom";
// import { toast } from "sonner";

// // Import types and action

// // Import your UI components
// import { Button } from "./ui/button";
// import { Field, FieldGroup, FieldLabel } from "./ui/field";
// import { Textarea } from "./ui/textarea";
// import { applyForTourAsGuide, ApplyTourResult } from "@/services/user/becomeATourGuide";



// const ApplyForm = ({ tourId }: any) => {
    
//     // 1. Define initial state (must match ApplyTourResult structure)
//     const initialState: ApplyTourResult = { 
//         success: false, 
//         message: undefined 
//     };

//     // 2. Use useActionState with the correct action and strict types
//     const [state, formAction] = useActionState<ApplyTourResult, FormData>(
//         applyForTourAsGuide, 
//         initialState
//     );
    
//     const { pending: isPending } = useFormStatus();

//     // Show toast for server-side messages
//     useEffect(() => {
//         if (state.success === false && state.message) {
//             toast.error(state.message);
//         }
//         if (state.success === true) {
//             toast.success(state.message || "Application submitted successfully!");
//         }
//     }, [state]);

//     return (
//         <form action={formAction}> 
//             <FieldGroup>
//                 {/* HIDDEN FIELD: Sends the tour ID with the form data */}
//                 <input type="hidden" name="tourId" value={tourId} /> 

//                 {/* Message body (Optional) */}
//                 <Field>
//                     <FieldLabel htmlFor="message">Your Message to Admin (Optional)</FieldLabel>
//                     <Textarea
//                         id="message"
//                         name="message"
//                         rows={4}
//                         placeholder="e.g., I have extensive experience in this region..."
//                     />
//                 </Field>
                
//                 <FieldGroup className="mt-6">
//                     <Field>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Submitting..." : "Apply as Guide"}
//                         </Button>
//                     </Field>
//                 </FieldGroup>
//             </FieldGroup>
//         </form>
//     );
// };

// export default ApplyForm;



/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Import types and action
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { applyForTourAsGuide, ApplyTourResult } from "@/services/user/becomeATourGuide";

const SubmitButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Apply as Guide"}
        </Button>
    );
};

const ApplyForm = ({ tourId }: any) => {
    const router = useRouter();
    
    // 1. Define initial state (must match ApplyTourResult structure)
    const initialState: ApplyTourResult = { 
        success: false, 
        message: undefined 
    };

    // 2. Use useActionState with the correct action and strict types
    const [state, formAction] = useActionState<ApplyTourResult, FormData>(
        applyForTourAsGuide, 
        initialState
    );

    // Show toast for server-side messages and redirect on success
    useEffect(() => {
        if (state.success === false && state.message) {
            toast.error(state.message);
        }
        if (state.success === true) {
            toast.success(state.message || "Application submitted successfully!");
            
            // ✅ Redirect to my-applications page after successful submission
            setTimeout(() => {
                router.push("/guide/dashboard/my-applications");
            }, 1500); // 1.5 second delay to show the success toast
        }
    }, [state, router]);

    return (
        <form action={formAction}> 
            <FieldGroup>
                {/* HIDDEN FIELD: Sends the tour ID with the form data */}
                <input type="hidden" name="tourId" value={tourId} /> 

                {/* Message body (Optional) */}
                <Field>
                    <FieldLabel htmlFor="message">Your Message to Admin (Optional)</FieldLabel>
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="e.g., I have extensive experience in this region..."
                    />
                </Field>
                
                <FieldGroup className="mt-6">
                    <Field>
                        <SubmitButton />
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default ApplyForm;