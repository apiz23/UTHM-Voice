"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export default function GithubSignInButton() {
	return (
		<Button
			onClick={() =>
				signIn("github", { callbackUrl: `${window.location.origin}/admin/dashboard` })
			}
			variant="outline"
			size="icon"
		>
			<Github className="h-5 w-5" />
		</Button>
	);
}
