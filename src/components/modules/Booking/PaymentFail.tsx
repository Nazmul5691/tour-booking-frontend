"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentFail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-red-50 to-rose-100">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {message || "Your payment could not be processed. Please try again."}
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
              <span className="font-semibold text-red-600 capitalize">{status}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => router.push("/my-bookings")}
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
            If you have any questions, please contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}