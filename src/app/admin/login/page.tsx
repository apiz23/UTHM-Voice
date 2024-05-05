"use client";

import {
	CardFooter,
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Page() {
	const { data: session, status } = useSession();

	if (!session) {
		return (
			<div>
				<div className="flex justify-center items-center h-screen">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>Admin Only</CardDescription>
						</CardHeader>

						<CardFooter className="flex justify-center">
							<Button
								onClick={() =>
									signIn("github", {
										callbackUrl: `${window.location.origin}/admin/dashboard`,
									})
								}
							>
								<Github />
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		);
	}
	return redirect(`${window.location.origin}/admin/dashboard`);
}
