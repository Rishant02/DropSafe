"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader, X } from "lucide-react";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

interface OTPModalProps {
  email: string;
  user: User;
  setUser: (user: User | null) => void;
}

const OTPModal = ({ email, user, setUser }: OTPModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sessionId = await verifySecret(user.accountId, password);
      if (sessionId) router.push("/");
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        className: "error-toast",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOTP = async () => {
    await sendEmailOTP(email);
    toast({
      title: "OTP Resent",
      description: "We have resent the OTP to your email",
    });
    setPassword("");
  };
  const handleClose = () => {
    setIsOpen(false);
    setPassword("");
    setUser(null);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
            <X
              onClick={() => setIsOpen(false)}
              className="otp-close-button"
              width={20}
              height={20}
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We have sent a code to
            <span className="pl-1 text-brand">{email}</span>. It will expire in
            15 minutes
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              disabled={isLoading}
              type="button"
            >
              Submit
              {isLoading && (
                <Loader className="animate-spin ml-2" width={24} height={24} />
              )}
            </AlertDialogAction>
            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn't get the code?
              <Button
                type="button"
                variant={"link"}
                className="pl-1 text-brand"
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
