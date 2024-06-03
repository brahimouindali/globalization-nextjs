import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession,
  VerificationToken,
} from "next-auth/adapters";

export function AuthRestAdapter(): Adapter {
  const userBaseUrl = "http://localhost:3000/api/users";
  const accountBaseUrl = "http://localhost:3000/api/accounts";

  return {
    createUser: async (user: Omit<AdapterUser, "id">) => {
      const res = await fetch(`${userBaseUrl}`, {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!res.ok) return null;

      const json = await res.json();

      return json;
    },
    getUserByEmail: async (email: string) => {
      const res = await fetch(`${userBaseUrl}?email=${email}`);

      if (!res.ok) return null;

      return await res.json();
    },
    getUserByAccount: async ({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) => {
      const res = await fetch(
        `${accountBaseUrl}/${provider}/${providerAccountId}`
      );

      if (!res.ok) return null;
      return await res.json();
    },
    getUser: async (id: string) => {
      const res = await fetch(`${userBaseUrl}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    },
    updateUser: async ({
      id,
      ...user
    }: Partial<AdapterUser> & Pick<AdapterUser, "id">) => {
      const res = await fetch(`${userBaseUrl}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
      });

      if (!res.ok) return null;

      return await res.json();
    },
    deleteUser: async (userId: string) => {
      const res = await fetch(`${userBaseUrl}/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) return null;

      return await res.json();
    },
    linkAccount: async (account: AdapterAccount) => {
      const res = await fetch(`${accountBaseUrl}`, {
        method: "POST",
        body: JSON.stringify(account),
      });

      if (!res.ok) return null;

      return await res.json();
    },
    unlinkAccount: async ({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) => {
      const res = await fetch(
        `${accountBaseUrl}/${provider}/${providerAccountId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) return null;

      return await res.json();
    },
    // createSession: async (session: {
    //   sessionToken: string;
    //   userId: string;
    //   expires: Date;
    // }) => {
    //     const response = await client.post("/session", session);
    //     return response.data
    //       ? format<AdapterSession>(response.data)
    //       : response.data;
    // },
    // getSessionAndUser: async (sessionToken: string) => {
    //   const response = await client.get(`/session/${sessionToken}`);

    //   if (!response.data) {
    //     return response.data;
    //   }

    //   const session = format<AdapterSession>(response.data.session);
    //   const user = format<AdapterUser>(response.data.user);
    //   return { session, user };
    // },
    // updateSession: async (
    //   session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    // ) => {
    //   const response = await client.patch("/session", session);
    //   return response.data
    //     ? format<AdapterSession>(response.data)
    //     : response.data;
    // },
    // deleteSession: async (sessionToken: string) => {
    //   const response = await client.delete(`/session/${sessionToken}`);
    //   return response.data
    //     ? format<AdapterSession>(response.data)
    //     : response.data;
    // },
    // createVerificationToken: async (verificationToken: VerificationToken) => {
    //   const response = await client.post("/verification", verificationToken);
    //   return response.data
    //     ? format<VerificationToken>(response.data)
    //     : response.data;
    // },
    // useVerificationToken: async (params: {
    //   identifier: string;
    //   token: string;
    // }) => {
    //   const response = await client.patch(`/verification`, params);
    //   return response.data
    //     ? format<VerificationToken>(response.data)
    //     : response.data;
    // },
  };
}
