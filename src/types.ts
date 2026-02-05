export interface UserIdentity {
    uuid: string | null;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
}

export interface OrganizationConnection {
    organizationUuid: string,
    joinedAt: number,
    role: string
    connectionUuid: string,
}