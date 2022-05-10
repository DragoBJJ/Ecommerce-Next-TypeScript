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
import { callbackify } from "util";

export default NextAuth({
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

      async authorize(credentials, req) {
        if (!credentials) return null;
        const { data: userData } = await apolloAuthorizedClient.query<
          GetUserByEmailQuery,
          GetUserByEmailQueryVariables
        >({
          query: GetUserByEmailDocument,
          variables: {
            email: credentials.email
          }
        });

        if (!userData.account) return null;
        const userExist = await bcrypt.compare(
          credentials.password,
          userData.account.password
        );

        if (!userExist) return null;

        console.log("userData", userData.account);

        return {
          id: userData.account.id,
          username: userData.account.username,
          specialization: userData.account.specialization
        };
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  secret: process.env.NEXTAUTH_TOKEN
});
