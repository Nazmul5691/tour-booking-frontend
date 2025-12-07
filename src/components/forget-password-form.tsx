/* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import { loginUser } from "@/services/auth/loginUser";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";
// import { Button } from "./ui/button";
// import { Field, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";

// const ForgetPasswordForm  = ({ redirect }: { redirect?: string }) => {
//   const [state, formAction, isPending] = useActionState(loginUser, null);

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <form action={formAction}>
//       {redirect && <input type="hidden" name="redirect" value={redirect} />}
//       <FieldGroup>
//         <div className="grid grid-cols-1 gap-4">
//           {/* Email */}
//           <Field>
//             <FieldLabel htmlFor="email">Email</FieldLabel>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="m@example.com"
//             />
//             <InputFieldError field="email" state={state} />
//           </Field>

//         </div>
//         <FieldGroup className="mt-4">
//           <Field>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Sending..." : "Send Reset Link to your Email"}
//             </Button>

//           </Field>
//         </FieldGroup>
//       </FieldGroup>
//     </form>
//   );
// };

// export default ForgetPasswordForm;



// src/components/ForgetPasswordForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
// Assuming these imports are available in your project structure
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { forgetPassword } from "@/services/auth/auth.service"; // This points to your Server Action
import InputFieldError from "./shared/InputFieldError";

interface Props {
  redirect?: string;
}

const ForgetPasswordForm = ({ redirect }: Props) => {
  const [email, setEmail] = useState("");
  // The Server Action is bound here
  const [state, formAction, isPending] = useActionState(forgetPassword, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
        // --- ✅ SUCCESS HANDLER ---
        // 1. Display Success Toast
        toast.success(state.message || "A password reset link has been sent to your email.");
        // 2. Clear the email input after successful submission
        setEmail("");
      } else {
        // --- ❌ ERROR HANDLER ---
        toast.error(state.message);
        // Retain the email in the input field after an error
        if (state.formData?.email) setEmail(state.formData.email);
      }
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={handleChange}
          />
          {/* InputFieldError will display validation errors from the server action */}
          <InputFieldError field="email" state={state} />
        </Field>

        <FieldGroup className="mt-4">
          <Button type="submit" disabled={isPending || email.length === 0}>
            {isPending ? "Sending..." : "Send Reset Link to your Email"}
          </Button>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ForgetPasswordForm;