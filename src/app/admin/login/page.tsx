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
import { Button } from "@/components/ui/button";

export default function page() {
	const [data, setData] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.tagret;
		setData((prev: any) => ({ ...prev, [name]: value }));
	};

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
										value={data?.email}
										onChange={handleChange}
									/>
									<Input
										type="password"
										name="password"
										placeholder="Password"
										value={data?.password}
										onChange={handleChange}
									/>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button type="button">
								Login
							</Button>
							<Button type="button">
								Sign Up
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
