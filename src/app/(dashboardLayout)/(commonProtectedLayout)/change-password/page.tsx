import { ChangePasswordForm } from "@/components/shared/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-10 rounded-2xl bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <div className="w-full">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
