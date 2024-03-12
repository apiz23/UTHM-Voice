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
import {
	MoreHorizontal,
	HeartIcon,
	RefreshCwIcon,
	MessageCircleIcon,
} from "lucide-react";
import supabase from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
	id: number;
	content: string;
	created_at: string;
}

export default function Feed() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isFetching, setIsFetching] = useState(false);

	const fetchMessages = async () => {
		try {
			setIsFetching(true);
			const { data: messagesData, error } = await supabase
				.from<Message>("message")
				.select("*")
				.eq("verified", true);
			setMessages(messagesData);
		} catch (error: any) {
			console.error("Error fetching messages:", error.message);
		} finally {
			setIsFetching(false);
		}
	};
	useEffect(() => {
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
			<div className="rounded-lg md:w-2/5 mx-auto px-5 py-2.5 my-5 bg-zinc-800 text-white">
				<div className="grid grid-cols-3 w-full">
					<div className="col-span-2">
						<Link href="/messages" className="w-full">
							<div className="relative block float-left">
								<div className="flex group items-center justify-between w-full mt-1 bg-surface-100 bg-opacity-75 hover:bg-surface-200 hover:bg-opacity-100 transition h-[32px] rounded text-foreground-lighter ">
									<div className="flex items-center space-x-2">
										<MessageCircleIcon className="w-4 h-4" />
										<p className="flex text-sm pe-5">Send Message...</p>
									</div>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-span-1 flex justify-end">
						<Separator orientation="vertical" className="bg-black mx-5" />
						<Button variant="ghost" onClick={fetchMessages}>
							<RefreshCwIcon className={isFetching ? "animate-spin" : ""} />
						</Button>
					</div>
				</div>
			</div>
			<ScrollArea className="w-full md:w-2/5 h-[700px] mx-auto shadow-2xl rounded-lg py-5">
				<div className="col-span-1">
					<ul className="space-y-4 p-5">
						{messages.map((message) => (
							<div key={message.id}>
								<Card className="bg-black md:w-full border-none min-w-[200px] text-white dark:text-black dark:bg-white py-5">
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
		</>
	);
}
