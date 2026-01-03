
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
    
    
    const initialState: ApplyTourResult = { 
        success: false, 
        message: undefined 
    };

   
    const [state, formAction] = useActionState<ApplyTourResult, FormData>(
        applyForTourAsGuide, 
        initialState
    );

   
    useEffect(() => {
        if (state.success === false && state.message) {
            toast.error(state.message);
        }
        if (state.success === true) {
            toast.success(state.message || "Application submitted successfully!");
            
           
            setTimeout(() => {
                router.push("/guide/dashboard/my-applications");
            }, 1500); 
        }
    }, [state, router]);

    return (
        <form action={formAction}> 
            <FieldGroup>
              
                <input type="hidden" name="tourId" value={tourId} /> 

               
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