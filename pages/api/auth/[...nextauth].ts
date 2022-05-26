import NextAuth from "next-auth";
import * as bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { apolloAuthorizedClient } from "../../../graphql/apolloClient";
import {
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  GetUserByEmailDocument
} from "../../../generated/graphql";

import { ApolloQueryResult } from "@apollo/client";
import { User } from "next-auth/core/types";

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Aleksander@gmail.com"
        },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        console.log("credentials", credentials);
        if (!credentials) return null;
        const {
          data
        }: ApolloQueryResult<GetUserByEmailQuery> = await apolloAuthorizedClient.query<
          GetUserByEmailQuery,
          GetUserByEmailQueryVariables
        >({
          query: GetUserByEmailDocument,
          variables: {
            email: credentials.email
          }
        });

        if (!data.account) return null;
        const { account } = data;
        const userExist = await bcrypt.compare(
          credentials.password,
          account.password
        );

        if (!userExist) return null;
        const user = {
          id: account.id,
          username: account.username,
          email: account.email,
          specialization: account.specialization
        };
        return user;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    }
  },
  secret: process.env.NEXTAUTH_TOKEN
});
