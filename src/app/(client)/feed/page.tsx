"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { MoreHorizontal, HeartIcon } from "lucide-react";
import supabase from "@/lib/supabase";

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
					.select("*")
					.eq("verified", true);
				setMessages(messagesData);
			} catch (error: any) {
				console.error("Error fetching messages:", error.message);
			}
		};

		fetchMessages();
	}, []);

	const getTimeDifference = (created_at: string): string => {
		const messageDate = new Date(created_at);
		const currentDate = new Date();

		if (currentDate.getFullYear() === messageDate.getFullYear()) {
			return messageDate.toLocaleDateString(undefined, {
				day: "numeric",
				month: "short",
			});
		} else {
			return messageDate.toLocaleDateString(undefined, {
				day: "numeric",
				month: "short",
				year: "numeric",
			});
		}
	};

	return (
		<>
			<div className="min-h-screen">
				<ScrollArea className="md:w-2/5 mx-auto rounded-md">
					<div className="col-span-1">
						<ul className="space-y-4 p-5">
							{messages.map((message) => (
								<div key={message.id}>
									<Card className="bg-black md:w-full min-w-[200px] text-white dark:text-black dark:bg-white py-5">
										<li key={message.id}>
											<CardHeader className="md:py-2">
												<div className="flex my-3">
													<Avatar className="me-5">
														<AvatarImage src="https://i.pinimg.com/564x/77/2a/a7/772aa709423494dba2e436c8df1fe643.jpg" />
														<AvatarFallback>AN</AvatarFallback>
													</Avatar>
													<CardTitle className="me-4">{message.id}</CardTitle>
													<CardDescription>
														{getTimeDifference(message.created_at)}
													</CardDescription>
												</div>
											</CardHeader>
											<CardContent>{message.content}</CardContent>
											<CardFooter className="flex justify-between pb-3">
												<button className="mx-auto">
													<HeartIcon />
												</button>
												<button className="mx-auto">
													<MoreHorizontal />
												</button>
											</CardFooter>
										</li>
									</Card>
								</div>
							))}
						</ul>
					</div>
				</ScrollArea>
			</div>
		</>
	);
}
