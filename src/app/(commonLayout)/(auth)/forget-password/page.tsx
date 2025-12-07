import ForgetPasswordForm from "@/components/forget-password-form";

const ForgetPasswordPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">
            Enter your to set a new password for your account
          </p>
        </div>
        <ForgetPasswordForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
