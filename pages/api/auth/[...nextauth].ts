import NextAuth, { type NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import mongoClient from "@/utils/db";
import { AuthRestAdapter } from "@/utils/auth-reset-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  session: {
    strategy: "jwt",
  },
  // adapter: AuthRestAdapter(),
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    Github({
      clientId: "84a99f19d1baef7d7669",
      clientSecret: "02d2fa79536ea169a91d0e45f3e8e28998e1d2c5",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // const { email, password: _ } = credentials;

        // const user = await authOptions.adapter?.getUser(
        //   "66343523cbf5c58ed8923ce4"
        // );

        return null; //user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // if (account?.type === "oauth") {
      //   const res = await fetch("http://localhost:3000/api/token");
      //   if (!res.ok) return null;

      //   token.access_token = await res.text();
      // }

      return token;
    },
    session({ session, token }) {
      if (token) {
        // session.user.access_token = token.access_token;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
