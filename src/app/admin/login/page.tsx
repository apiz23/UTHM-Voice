"use client";

import {
	CardContent,
	CardFooter,
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import GithubSignInButton from "@/components/GithubSignInButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
	const { data: session, status } = useSession();

	const [data, setData] = useState({ email: "", password: "" });

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};

	if (!session) {
		return (
			<div>
				<div className="flex justify-center items-center h-screen">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>Admin Only</CardDescription>
						</CardHeader>

						<form>
							<CardContent>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Input
											type="text"
											name="email"
											placeholder="Email"
											value={data.email}
											onChange={handleChange}
											autoComplete="1"
										/>
										<Input
											type="password"
											name="password"
											placeholder="Password"
											value={data.password}
											onChange={handleChange}
										/>
									</div>
								</div>
							</CardContent>
						</form>
						<CardFooter className="flex justify-center">
							<GithubSignInButton />
						</CardFooter>
					</Card>
				</div>
			</div>
		);
	}
	return redirect(`${window.location.origin}/admin/dashboard`);
}
