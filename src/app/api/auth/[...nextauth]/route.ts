import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import prisma from "@/lib/db";

// const handler = NextAuth({
// 	adapter: PrismaAdapter(prisma),
// 	providers: [
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID as string,
// 			clientSecret: process.env.GITHUB_SECRET as string,
// 		}),
// 	],
// });

// export { handler as GET, handler as POST };
