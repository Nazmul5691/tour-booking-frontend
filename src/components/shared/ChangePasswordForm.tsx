/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { changeMyPassword } from "@/services/auth/auth.service";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export const ChangePasswordForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = (field: "old" | "new" | "confirm") => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();
            form.append("oldPassword", formData.oldPassword);
            form.append("newPassword", formData.newPassword);
            form.append("confirmPassword", formData.confirmPassword);

            const result = await changeMyPassword(null, form);

            if (result.success) {
                toast.success(result.message);

                // Clear form only on success
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

                // Redirect after 0.5 second
                setTimeout(() => {
                    router.push(`/dashboard`);
                }, 500);
            } else {
                toast.error(result.errors?.[0]?.message || result.message || "Failed to change password");
            }

        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
            // Removed the setFormData call from here
        }
    };

    const renderPasswordField = (
        id: string,
        label: string,
        fieldName: "oldPassword" | "newPassword" | "confirmPassword",
        showKey: "old" | "new" | "confirm"
    ) => (
        <div className="relative">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={showPassword[showKey] ? "text" : "password"}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
                required
                className="pr-10"
            />
            <div
                onClick={() => togglePassword(showKey)}
                className="absolute inset-y-0 right-2 top-3.5 flex items-center px-1 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
                {showPassword[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 p-4 border rounded-md shadow-sm"
        >
            {renderPasswordField("oldPassword", "Old Password", "oldPassword", "old")}
            {renderPasswordField("newPassword", "New Password", "newPassword", "new")}
            {renderPasswordField("confirmPassword", "Confirm New Password", "confirmPassword", "confirm")}

            <button
                type="submit"
                className="w-full py-2 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                disabled={loading}
            >
                {loading ? "Changing..." : "Change Password"}
            </button>
        </form>
    );
};
