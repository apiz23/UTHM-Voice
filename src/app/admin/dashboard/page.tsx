"use client";

import LogOutButton from "@/components/LogOutButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				{session.user?.name}
				{session.user?.email}
				<LogOutButton />
			</>
		);
	} else {
		return redirect(`${window.location.origin}/admin/login`);
	}
}
