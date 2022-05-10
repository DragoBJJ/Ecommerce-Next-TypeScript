import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    specialization: string;
  }
  interface Session {
    user: User;
  }
}
