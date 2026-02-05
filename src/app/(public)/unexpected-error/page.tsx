"use client";

import { Button } from "@/components/shadcn-hell/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/shadcn-hell/ui/empty";
import { Bug, ClockFading } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Page() {
    const params = useSearchParams();
    const tryAgainUrl = params.get('try-again-url');

    return ( 
        <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <Empty className="w-xl">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Bug />
                    </EmptyMedia>
                    <EmptyTitle>Unexpected Error</EmptyTitle>
                    <EmptyDescription className="w-full">
                        An unexpected error occurred. Please try again.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link href={tryAgainUrl ?? "/dashboard"} className="w-full">
                        <Button className="w-full" variant="default" size="default">
                            Try again
                        </Button>
                    </Link>
                </EmptyContent>
            </Empty>
        </div>
    );
}

export default Page;