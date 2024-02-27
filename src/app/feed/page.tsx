"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";

interface Message {
	id: number;
	content: string;
	created_at: string;
}

export default function Feed() {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data: messagesData, error } = await supabase
					.from<Message>("message")
					.select("*");
				setMessages(messagesData);
			} catch (error) {
				console.error("Error fetching messages:", error.message);
			}
		};

		fetchMessages();
	}, []);

	return (
		<>
			<div className="min-h-screen grid md:grid-cols-3">
				<Card className="mx-auto md:w-[800px]">
					<CardContent className="flex justify-center">
						<ul className="space-y-4 text-left">
							<Card className="border-none shadow-none">
								{messages.map((message) => (
									<li key={message.id}>
										<CardHeader>
											<CardTitle>{message.id}</CardTitle>
											<CardDescription>{message.created_at}</CardDescription>
										</CardHeader>
										<CardContent>{message.content}</CardContent>
									</li>
								))}
							</Card>
						</ul>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
