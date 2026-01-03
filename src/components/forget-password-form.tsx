/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { forgetPassword } from "@/services/auth/auth.service"; 
import InputFieldError from "./shared/InputFieldError";

interface Props {
  redirect?: string;
}

const ForgetPasswordForm = ({ redirect }: Props) => {
  const [email, setEmail] = useState("");
  const [state, formAction, isPending] = useActionState(forgetPassword, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
       
        toast.success(state.message || "A password reset link has been sent to your email.");
        
        setEmail("");
      } else {
        toast.error(state.message);
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