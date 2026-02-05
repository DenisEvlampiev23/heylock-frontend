"use client";

import { Button } from "@/components/shadcn-hell/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/shadcn-hell/ui/empty";
import { Spinner } from "@/components/shadcn-hell/ui/spinner";
import { authenticateWithOTP } from "@/lib/authentication/authentication";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const tokenHash = searchParams.get('token_hash');
    
            if (tokenHash === null) {
                router.replace("/unexpected-error?try-again-url=/sign-up");
            }
    
            if (tokenHash !== null) { // Magic link
                const { success, errorCode } = await authenticateWithOTP(tokenHash);

                if (success === false) {
                    
                    console.log(errorCode);

                    if (errorCode === 'otp_expired') {
                        router.replace("/authentication/otp-expired");
                        return;
                    }

                    router.replace("/unexpected-error?try-again-url=/sign-up");
                    return;
                } 
            } 

            router.push("/dashboard");
        })();
    }, []);

    return ( 
        <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <Empty className="w-96">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Spinner />
                    </EmptyMedia>
                    <EmptyTitle>Authenticating</EmptyTitle>
                    <EmptyDescription>
                        Please wait while we process your request. Do not refresh the page.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link href="/sign-up" className="w-full">
                        <Button className="w-full" variant="outline" size="default">
                            Sign up again
                        </Button>
                    </Link>
                </EmptyContent>
            </Empty>
        </div>
    );
}

export default Page;