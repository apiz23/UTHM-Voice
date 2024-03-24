import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
	basePath: "/admin/dashboard",
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authOptions);
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import type { NextAuthConfig } from "next-auth";

// export const config = {
// 	theme: {
// 		logo: "https://next-auth.js.org/img/logo/logo-sm.png",
// 	},
// 	providers: [GitHub],
// 	basePath: "/admin/dashboard",
// 	callbacks: {
// 		authorized({ request, auth }) {
// 			const { pathname } = request.nextUrl;
// 			if (pathname === "/middleware-example") return !!auth;
// 			return true;
// 		},
// 		jwt({ token, trigger, session }) {
// 			if (trigger === "update") token.name = session.user.name;
// 			return token;
// 		},
// 	},
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);
