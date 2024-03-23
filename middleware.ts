import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

export default NextAuth(authOptions).auth;

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
