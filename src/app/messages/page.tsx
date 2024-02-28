"use client";

import { H1, Parag } from "@/components/typography";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import supabase from "../../lib/supabase/supabase";

export default function Message() {
	const [message, setMessage] = useState<string>();

	const handleMessage = async () => {
		try {
			const { data, error } = await supabase
				.from("message")
				.insert([{ content: message }])
				.select();

			if (error) {
				throw error;
			}

			console.log("Message inserted successfully:", data);
		} catch (error: any) {
			console.error("Error inserting message:", error.message);
		}
	};

	return (
		<div className="min-h-screen py-48">
			<div className="max-w-3xl mx-auto">
				<Card className="border-none shadow-none mx-auto">
					<CardHeader className="text-center">
						<CardTitle>
							<H1 text="UTHM Voice" />
						</CardTitle>
						<CardDescription className="text-lg">
							<Parag text="Submit your confession here 🙊" />
						</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Textarea
								placeholder="Type your message here."
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center">
						<button
							type="submit"
							onClick={handleMessage}
							className="text-white w-3/6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							Submit
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
