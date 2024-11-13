"use client";

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { CircleX, Loader2, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendEmailOtp, verifyOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { RouteUrls } from "@/lib/enums";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OtpModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resendOtp, setResendOtp] = useState<boolean>(false);

  const router = useRouter();

  const handleOtpSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const sessionId = await verifyOtp({ accountId, password });
      if (sessionId) router.push(RouteUrls.ROOT);
    } catch {
      setError("Invalid OTP. Please try again.");
      setPassword("");
      setResendOtp(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendEmailOtp({ email });
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold">
              Verify Your Email
            </AlertDialogTitle>
            <CircleX
              onClick={() => setIsOpen(false)}
              className="text-gray-500 cursor-pointer"
              width={20}
              height={20}
            />
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <AlertDialogDescription className="text-sm text-blue-600">
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium">{email}</span>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <div className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={password}
            onChange={setPassword}
            className="gap-2"
            containerClassName="group flex items-center has-[:disabled]:opacity-50"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="w-10 h-12 text-lg" />
            ))}
          </InputOTP>
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <AlertDialogFooter className="flex !flex-col space-y-4">
          <div className="w-full">
            <Button
              className="w-full"
              onClick={handleOtpSubmit}
              disabled={password.length !== 6 || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p>Didn&apos;t receive the code?</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOtp}
              disabled={!resendOtp}
              className="h-auto p-0 text-blue-600 hover:text-blue-500"
            >
              <RefreshCw className="h-4 w-4" />
              Click to resend
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
