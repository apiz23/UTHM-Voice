"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

export default function Admin() {
	
	return (
		<>
			<div>
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Admin Only</CardDescription>
					</CardHeader>
					<LoginForm />
				</Card>
			</div>
		</>
	);
}
