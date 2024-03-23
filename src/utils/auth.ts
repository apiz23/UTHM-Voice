import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authOptions);
