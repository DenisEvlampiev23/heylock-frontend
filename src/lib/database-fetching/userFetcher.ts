import { createClient } from "../supabase/client";
import { OrganizationConnection, UserIdentity } from "@/types";

export async function fetchIdentityData(): Promise<UserIdentity> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    const id = data.user?.id || null;
    const name = data.user?.user_metadata?.full_name || data.user?.user_metadata?.name || data.user?.user_metadata?.preferred_username || data.user?.user_metadata?.user_name || null;
    const email = data.user?.email || null;
    const avatarUrl = data.user?.user_metadata?.avatar_url || data.user?.user_metadata?.picture || null;

    return {
        uuid: id,
        name: name,
        email: email,
        avatarUrl: avatarUrl
    }
}

export async function fetchUserAssociatedOrganizations(userUuid?: string): Promise<OrganizationConnection[]> {
    const supabase = createClient();

    let operationalUserUuid: string | null = userUuid || null;

    // Try to get user's uuid if not present
    if (operationalUserUuid === null) {
        operationalUserUuid = (await supabase.auth.getUser()).data.user?.id || null;

        if (operationalUserUuid === null) {
            throw new Error("User Uuid is still null after fetching auth data.");
        }
    }

    const { data, error } = await supabase.from('members').select().eq('user_uuid', operationalUserUuid);

    if (error) {
        throw new Error(error.message);
    }

    const organizations: OrganizationConnection[] = [];

    data?.forEach((connection) => {
        const newOrganization: OrganizationConnection = {
            organizationUuid: connection.organization_uuid,
            joinedAt: connection.joined_at,
            role: connection.role,
            connectionUuid: connection.uuid,
        };

        const isOrganizationPresent = organizations.some(organization => organization.organizationUuid === newOrganization.organizationUuid);

        if (isOrganizationPresent === false) {
            organizations.push(newOrganization);
        }
    });

    return organizations;
}