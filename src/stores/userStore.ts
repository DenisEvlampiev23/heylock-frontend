import { OrganizationConnection, UserIdentity } from "../types";
import { create } from "zustand";

type UserStore = UserIdentity & {
    organizationConnections: OrganizationConnection[];

    setUuid: (uuid: string | null) => void;
    setName: (name: string | null) => void;
    setEmail: (email: string | null) => void;
    setAvatarUrl: (avatarUrl: string | null) => void;
    setOrganizationConnections: (organizationConnections: OrganizationConnection[]) => void;
};

export const useUser = create<UserStore>((set) => ({
    uuid: null,
    name: null,
    email: null,
    avatarUrl: null,
    organizationConnections: [],

    setUuid: (uuid: string | null) => set({ uuid }),
    setName: (name: string | null) => set({ name }),
    setEmail: (email: string | null) => set({ email }),
    setAvatarUrl: (avatarUrl: string | null) => set({ avatarUrl }),
    setOrganizationConnections: (organizationConnections: OrganizationConnection[]) => set({ organizationConnections })
}));