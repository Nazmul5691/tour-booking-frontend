"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Eye, EyeOff, ChevronDown, ShieldCheck, User, MapPin } from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    email: "admin2@gmail.com",
    password: "Mir1234@",
    icon: ShieldCheck,
    color: "text-rose-600",
    bg: "hover:bg-rose-50",
  },
  {
    role: "User",
    email: "user11@gmail.com",
    password: "Mir1234@",
    icon: User,
    color: "text-blue-600",
    bg: "hover:bg-blue-50",
  },
  {
    role: "Guide",
    email: "user1@gmail.com",
    password: "Mir1234@",
    icon: MapPin,
    color: "text-emerald-600",
    bg: "hover:bg-emerald-50",
  },
];

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({ email: "", password: "" });
  const [showDemo, setShowDemo] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDemo(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fillDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setFields({ email: account.email, password: account.password });
    setShowDemo(false);
  };

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={fields.email}
              onChange={handleChange}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field className="relative">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative w-full">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                value={fields.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <div className="flex flex-col gap-2 w-full">
              {/* Login Button */}
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Logging in..." : "Login"}
              </Button>

              {/* Demo Dropdown */}
              <div className="relative w-full" ref={dropdownRef}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDemo((prev) => !prev)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Demo Account</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${showDemo ? "rotate-180" : ""}`}
                  />
                </Button>

                {showDemo && (
                  <div className="absolute left-0 top-full mt-1 z-50 w-full rounded-lg border bg-white shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {DEMO_ACCOUNTS.map((account) => {
                      const Icon = account.icon;
                      return (
                        <button
                          key={account.role}
                          type="button"
                          onClick={() => fillDemo(account)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${account.bg}`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 ${account.color}`} />
                          <div className="flex flex-col items-start">
                            <span className={`font-semibold text-xs ${account.color}`}>
                              {account.role}
                            </span>
                            <span className="text-gray-500 text-xs">{account.email}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;




// "use client";
// import { loginUser } from "@/services/auth/loginUser";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";
// import { Button } from "./ui/button";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";
// import { Eye, EyeOff } from "lucide-react";

// const LoginForm = ({ redirect }: { redirect?: string }) => {
//   const [state, formAction, isPending] = useActionState(loginUser, null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [fields, setFields] = useState({ email: "", password: "" });

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

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
//               value={fields.email}
//               onChange={handleChange}
//             />
//             <InputFieldError field="email" state={state} />
//           </Field>

//           {/* Password */}
//           <Field className="relative">
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <div className="relative w-full">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="pr-10"
//                 value={fields.password}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             <InputFieldError field="password" state={state} />
//           </Field>
//         </div>

//         <FieldGroup className="mt-4">
//           <Field>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Logging in..." : "Login"}
//             </Button>

//             <FieldDescription className="px-6 text-center">
//               Don&apos;t have an account?{" "}
//               <a href="/register" className="text-blue-600 hover:underline">
//                 Sign up
//               </a>
//             </FieldDescription>
//           </Field>
//         </FieldGroup>
//       </FieldGroup>
//     </form>
//   );
// };

// export default LoginForm;



