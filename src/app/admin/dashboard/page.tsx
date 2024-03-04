"use client";

import { NavbarAdmin } from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Message {
	id: number;
	content: string;
	created_at: string;
	verified: boolean;
}

export default function Dashboard() {
	const { data: session, status } = useSession();
	const [messages, setMessages] = useState<Message[]>([]);

	if (!session && status === "loading") {
		return redirect(`${window.location.origin}/admin/login`);
	}

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data: messagesData, error } = await supabase
					.from<Message>("message")
					.select("*");
				console.log(messagesData);
				setMessages(messagesData);
			} catch (error: any) {
				console.error("Error fetching messages:", error.message);
			}
		};

		fetchMessages();
	}, []);
	return (
		<>
			<NavbarAdmin session={session} />
			<div className="min-h-screen p-5">
				<div className="max-w-xl mx-auto">
					<ScrollArea className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[10px]">Id</TableHead>
									<TableHead>Message</TableHead>
									<TableHead>Created At</TableHead>
									<TableHead className="text-right">Verify</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{messages.map((message, index) => (
									<>
										<TableRow key={message.id}>
											<TableCell className="font-medium">
												<Dialog>
													<DialogTrigger className="py-2 px-3 rounded-md bg-gray-300 text-black">
														{index + 1}
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Details</DialogTitle>
															{/* <DialogDescription>
																This action cannot be undone. This will permanently delete your
																account and remove your data from our servers.
															</DialogDescription> */}
														</DialogHeader>
														<TableRow key={message.id}>
															<TableCell className="font-medium">{index + 1}</TableCell>
															<TableCell>{message.content}</TableCell>
															<TableCell>{message.created_at}</TableCell>
															<TableCell className="text-right">
																{message.verified ? "true" : "false"}
															</TableCell>
														</TableRow>
													</DialogContent>
												</Dialog>
											</TableCell>
											<TableCell>{message.content}</TableCell>
											<TableCell>{message.created_at}</TableCell>
											<TableCell className="text-right">
												{message.verified ? "true" : "false"}
											</TableCell>
										</TableRow>
									</>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
