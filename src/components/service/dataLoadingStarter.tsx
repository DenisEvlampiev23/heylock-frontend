"use client";

import { fetchIdentityData, fetchUserAssociatedOrganizations } from "@/lib/database-fetching/userFetcher";
import { useUser } from "@/stores/userStore";
import { useEffect } from "react";

async function loadData() {
    const identityData = await fetchIdentityData();
    useUser.setState({
        uuid: identityData.uuid,
        name: identityData.name,
        email: identityData.email,
        avatarUrl: identityData.avatarUrl,
    });

    const associatedOrganizations = await fetchUserAssociatedOrganizations();
    useUser.setState({
        organizationConnections: associatedOrganizations
    });
}

export default function DataLoadingStarter() {
    useEffect(() => {
        loadData();
    }, []);

    return (<></>);
}