import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      clientId: string;
    } & DefaultSession["user"];
  }

  interface User {
    clientId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    clientId?: string;
  }
}
