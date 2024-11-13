"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { RouteUrls } from "@/lib/enums";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OtpModal";
import { Loader2, Mail, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormType = "sign-up" | "sign-in";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {type === "sign-up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-gray-500">
            {type === "sign-up"
              ? "Enter your details to get started"
              : "Sign in to access your account"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="John Doe"
                          className="pl-10 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="name@example.com"
                        className="pl-10 h-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {errorMessage && (
              <Alert variant="destructive" className="text-sm">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-10 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {type === "sign-up" ? "Creating account..." : "Signing in..."}
                </>
              ) : type === "sign-up" ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link
                  href={
                    type === "sign-in" ? RouteUrls.SIGN_UP : RouteUrls.SIGN_IN
                  }
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {type === "sign-in" ? "Sign up" : "Sign in"}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>

      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
