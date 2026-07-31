import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      schoolId: string | null;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    schoolId: string | null;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    schoolId: string | null;
  }
}
