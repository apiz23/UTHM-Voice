"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase/supabase";

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
			} catch (error: any) {
				console.error("Error fetching messages:", error.message);
			}
		};

		fetchMessages();
	}, []);

	return (
		<>
			<div className="min-h-screen p-10">
				<Card className="mx-auto border-none shadow-none">
					<CardContent className="flex justify-center">
						<div className="col-span-1 border-l border-gray-300">
							<ul className="space-y-4 text-left p-5">
								{messages.map((message) => (
									<Card className="bg-black text-white dark:text-black dark:bg-white">
										<li key={message.id}>
											<CardHeader>
												<CardTitle>{message.id}</CardTitle>
												<CardDescription>{message.created_at}</CardDescription>
											</CardHeader>
											<CardContent>{message.content}</CardContent>
										</li>
									</Card>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
