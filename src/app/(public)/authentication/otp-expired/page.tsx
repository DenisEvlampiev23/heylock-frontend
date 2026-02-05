import { Button } from "@/components/shadcn-hell/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/shadcn-hell/ui/empty";
import { ClockFading } from "lucide-react";
import Link from "next/link";

function Page() {
    return ( 
        <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <Empty className="w-xl">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ClockFading />
                    </EmptyMedia>
                    <EmptyTitle>Link Expired</EmptyTitle>
                    <EmptyDescription className="w-full">
                        Your one-time password link has expired. Please request a new one by signing up again.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link href="/sign-up" className="w-full">
                        <Button className="w-full" variant="default" size="default">
                            Sign up again
                        </Button>
                    </Link>
                </EmptyContent>
            </Empty>
        </div>
    );
}

export default Page;