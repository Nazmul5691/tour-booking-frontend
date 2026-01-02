// "use client"



// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CheckCircle2 } from "lucide-react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const transactionId = searchParams.get("transactionId");
//   const message = searchParams.get("message");
//   const amount = searchParams.get("amount");
//   const status = searchParams.get("status");

//   useEffect(() => {
//     // Auto redirect after 5 seconds
//     const timer = setTimeout(() => {
//       router.push("/my-bookings");
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-100">
//       <Card className="max-w-md w-full">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <CheckCircle2 className="h-16 w-16 text-green-500" />
//           </div>
//           <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <p className="text-center text-muted-foreground">
//             {message || "Your booking has been confirmed successfully."}
//           </p>

//           <div className="bg-muted/50 p-4 rounded-lg space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Transaction ID:</span>
//               <span className="font-mono text-sm">{transactionId}</span>
//             </div>
//             {amount && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Amount:</span>
//                 <span className="font-semibold">৳{Number(amount).toLocaleString()}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Status:</span>
//               <span className="font-semibold text-green-600 capitalize">{status}</span>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Button
//               onClick={() => router.push("/dashboard/my-bookings")}
//               className="w-full"
//             >
//               View My Bookings
//             </Button>
//             <Button
//               onClick={() => router.push("/")}
//               variant="outline"
//               className="w-full"
//             >
//               Back to Home
//             </Button>
//           </div>

//           <p className="text-xs text-center text-muted-foreground">
//             Redirecting to My Bookings in 5 seconds...
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");
  const bookingId = searchParams.get("bookingId"); // ✅ Get booking ID from URL

  useEffect(() => {
    // Auto redirect after 5 seconds to review page
    const timer = setTimeout(() => {
      if (bookingId) {
        router.push(`/dashboard/review/${bookingId}`);
      } else {
        router.push("/dashboard/my-bookings");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-100">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {message || "Your booking has been confirmed successfully."}
          </p>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
            {amount && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">৳{Number(amount).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold text-green-600 capitalize">{status}</span>
            </div>
          </div>

          <div className="space-y-2">
            {bookingId && (
              <Button
                onClick={() => router.push(`/dashboard/review/${bookingId}`)}
                className="w-full"
              >
                Write a Review
              </Button>
            )}
            <Button
              onClick={() => router.push("/dashboard/my-bookings")}
              variant="outline"
              className="w-full"
            >
              View My Bookings
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Redirecting to review page in 5 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}