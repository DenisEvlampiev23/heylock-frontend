"use client";

import { cn } from "@/components/shadcn-hell/lib/utils"
import { Button } from "@/components/shadcn-hell/ui/button"
import { Card, CardContent } from "@/components/shadcn-hell/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/shadcn-hell/ui/field"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "@/components/shadcn-hell/ui/alert-dialog"
import { Input } from "@/components/shadcn-hell/ui/input"
import Image from "next/image"
import LogoBlack from "../../../public/logotypes/logo-128-black.svg";
import LogoWhite from "../../../public/logotypes/logo-128-white.svg";
import GithubWhite from "../../../public/logotypes/github-16-white.svg";
import GoogleColor from "../../../public/logotypes/google-64-color.png";
import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { signInWithEmail, signInWithGitHub, signInWithGoogle } from "@/lib/authentication/authentication";
import { Mail } from "lucide-react";
import { Spinner } from "./ui/spinner";

type AuthenticationFormProps = { type: 'signIn' | 'signUp' } & React.ComponentProps<"div">;

export function AuthenticationForm({ className, ...props }: AuthenticationFormProps) {
  const [isDialogueOpened, setIsDialogueOpened] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [secondsBeforeRetry, setSecondsBeforeRetry] = useState(0);
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (z.email().safeParse(email).success === true) {
      handleSendingMagicLink(email);
    } else {
      toast.error("Please enter a valid email address.", { position: 'top-center' });
    }
  };

  function handleGoogleAuth() {
    signInWithGoogle();
  }
  
  function handleGithubAuth() {
    signInWithGitHub();
  }

  async function handleSendingMagicLink(email: string) {
    setIsSending(true);
    await signInWithEmail(email);
    setIsSending(false);

    setIsDialogueOpened(true);
    setEmailHasBeenSent(true);

    setSecondsBeforeRetry(59);
    const interval = setInterval(() => {
      setSecondsBeforeRetry((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  {
                    props.type
                    ? "Create your account"
                    : "Sign in to your account"
                  }
                </h1>
                <p className="text-muted-foreground text-sm text-balance">
                  {
                    props.type === "signUp"
                    ? "Enter your email below to create your account"
                    : "Enter your email below to sign into your account"
                  }
                  
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="best.email@example.com"
                  required
                />
                <FieldDescription>
                  {
                    props.type === "signUp"
                    ? <>We&apos;ll use this to contact you. We will not share your email with anyone else.</>
                    : <>We&apos;ll send a magic link to your email address.</>
                  }
                  
                </FieldDescription>
              </Field>


              <Field>
                <Button type="submit" disabled={isSending || secondsBeforeRetry > 0}>
                  {
                    isSending && <Spinner />
                  }
                  
                  {
                    emailHasBeenSent
                    ? secondsBeforeRetry > 0 ? `Retry in ${secondsBeforeRetry} seconds` : "Send Again"
                    : props.type === "signUp" ? "Create Account" : "Sign In"
                  }
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                
                <Button variant="outline" type="button" onClick={handleGithubAuth}>
                  <Image src={GithubWhite} alt="Github"/>
                  {
                    props.type === "signUp"
                    ? <span className="sr-only">Sign up with Github</span>
                    : <span className="sr-only">Sign in with Github</span>
                  }
                </Button>

                <Button variant="outline" type="button" onClick={handleGoogleAuth}>
                  <Image src={GoogleColor} alt="Google" className="h-3.5 w-3.5"/>
                  {
                    props.type === "signUp"
                    ? <span className="sr-only">Sign up with Google</span>
                    : <span className="sr-only">Sign in with Google</span>
                  }
                </Button>

              </Field>
              <FieldDescription className="text-center">
                {
                  props.type === "signUp"
                  ? <>Already have an account? <a href="/sign-in">Sign in</a></>
                  : <>Don't have an account? <a href="/sign-up">Sign up</a></>
                }
                
              </FieldDescription>
            </FieldGroup>
          </form>
          
          <div className="bg-white dark:bg-black relative hidden md:flex items-center justify-center">
            <div className="hidden dark:block">
              <Image src={LogoWhite} alt="Heylock logo" className="w-16 -translate-x-1 opacity-5 hover:opacity-100 transition-opacity duration-300 animate-pulse blur-sm absolute"/>
              <Image src={LogoWhite} alt="Heylock logo" className="w-16 -translate-x-1"/>
            </div>
            
            <div className="block dark:hidden">
              <Image src={LogoBlack} alt="Heylock logo" className="w-16 -translate-x-1"/>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>

      <AlertDialog open={isDialogueOpened} onOpenChange={setIsDialogueOpened}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Mail />
            </AlertDialogMedia>
            <AlertDialogTitle>Check Your Inbox</AlertDialogTitle>
            <AlertDialogDescription>
              We've sent you an authentication link
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
