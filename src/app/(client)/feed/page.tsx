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
			<div className="min-h-screen p-10">
				<ScrollArea className="md:w-2/5 mx-auto rounded-md border">
					<Card className="mx-auto border-none shadow-none">
						<CardContent className="md:p-6 p-0 flex justify-center">
							<div className="col-span-1">
								<ul className="space-y-4 p-5">
									{messages.map((message) => (
										<div key={message.id} className="flex items-start">
											<Avatar className="md:block hidden me-5">
												<AvatarImage src="https://i.pinimg.com/564x/77/2a/a7/772aa709423494dba2e436c8df1fe643.jpg" />
												<AvatarFallback>AN</AvatarFallback>
											</Avatar>
											<Card className="bg-black w-full md:w-[400px] min-w-[200px] text-white dark:text-black dark:bg-white">
												<li key={message.id}>
													<CardHeader className="md:py-2">
														<div className="flex">
															<CardTitle className="me-4">{message.id}</CardTitle>
															<CardDescription>
																{getTimeDifference(message.created_at)}
															</CardDescription>
														</div>
													</CardHeader>
													<CardContent>{message.content}</CardContent>
													<CardFooter className="grid grid-cols-2 pb-3">
														<button>
															<HeartIcon className="mx-auto" />
														</button>
														<button>
															<MoreHorizontal className="mx-auto" />
														</button>
													</CardFooter>
												</li>
											</Card>
										</div>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</ScrollArea>
			</div>
		</>
	);
}
