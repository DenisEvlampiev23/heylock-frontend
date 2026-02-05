"use client";

import { useUser } from "@/stores/userStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function OrganizationGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { uuid, organizationConnections } = useUser();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Skip guard for /no-startup page to prevent redirect loop
        const skippedPathnames = ["/no-startup"];

        if (skippedPathnames.includes(pathname)) {
            setIsChecking(false);
            return;
        }

        // Wait for user data to load (uuid will be set after fetch)
        if (uuid === null) {
            return;
        }

        // User loaded but has no organizations
        if (organizationConnections.length === 0) {
            router.replace("/no-startup");
            return;
        }

        setIsChecking(false);
    }, [uuid, organizationConnections, pathname, router]);

    // Show nothing while checking (or add a loading spinner)
    if (isChecking && pathname !== "/no-startup") {
        return null;
    }

    return <>{children}</>;
}
