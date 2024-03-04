"use client";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
	console.log(SessionProvider);
	return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
