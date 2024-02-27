// Import necessary components and hooks
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (email && password) {
			router.push("/admin/dashboard");
		} else {
			console.log("Please fill in both email and password.");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Input
								type="text"
								id="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								type="password"
								id="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button type="submit">Submit</Button>
				</CardFooter>
			</form>
		</>
	);
}
