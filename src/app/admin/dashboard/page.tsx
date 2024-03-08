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
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { H2 } from "@/components/typography";

interface Message {
	id: number;
	content: string;
	created_at: string;
	verified: boolean;
}

export default function Dashboard() {
	const { data: session, status } = useSession();
	const [messages, setMessages] = useState<Message[]>([]);
	const [tempData, setTempData] = useState<{ id: number; verified: boolean }[]>(
		[]
	);
	const [isFetching, setIsFetching] = useState(false);

	if (!session && status === "loading") {
		return redirect(`${window.location.origin}/admin/login`);
	}

	const fetchMessages = async () => {
		setIsFetching(true);
		try {
			const { data: messagesData, error } = await supabase
				.from<Message>("message")
				.select("*");
			setMessages(messagesData);
			setTempData(
				messagesData.map((message) => ({
					id: message.id,
					verified: message.verified,
				}))
			);
		} catch (error: any) {
			console.error("Error fetching messages:", error.message);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchMessages();
	}, []);
	const handleSwitchChange = (isChecked: boolean, messageId: number) => {
		setTempData((prevStates) =>
			prevStates.map((state) =>
				state.id === messageId ? { ...state, verified: isChecked } : state
			)
		);
	};

	const handleSave = async (id: number) => {
		const temp = tempData.find((message) => message.id === id);
		console.log(temp?.verified);
		if (temp) {
			try {
				const { data, error } = await supabase
					.from("message")
					.update({ verified: temp?.verified })
					.eq("id", temp?.id);
			} catch (error) {
				console.error(`Error updating message with ID ${id}:`, error.message);
			}
		}
	};
	const handleRefresh = () => {
		fetchMessages();
	};
	return (
		<>
			<NavbarAdmin session={session} />
			<div className="min-h-screen p-5">
				<div className="max-w-xl mx-auto">
					<div className="flex justify-end">
						<Button
							onClick={handleRefresh}
							disabled={isFetching}
							variant="secondary"
							className="m-5"
						>
							{isFetching ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
						</Button>
					</div>
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
															<DialogTitle>
																<H2 text="Details" />
															</DialogTitle>
														</DialogHeader>
														<div>
															<div key={message.id}>
																<label className="font-medium">
																	Id: {message.id} Created: {message.created_at}
																</label>
																<Textarea disabled className="my-5">
																	{message.content}
																</Textarea>
																<div className="text-right">
																	<Switch
																		checked={
																			tempData.find((state) => state.id === message.id)
																				?.verified || false
																		}
																		onCheckedChange={(isChecked) =>
																			handleSwitchChange(isChecked, message.id)
																		}
																	/>
																</div>
																<Button
																	onClick={() => {
																		handleSave(message.id);
																	}}
																	variant="outline"
																>
																	Save
																</Button>
															</div>
														</div>
													</DialogContent>
												</Dialog>
											</TableCell>
											<TableCell>{message.content}</TableCell>
											<TableCell>{message.created_at}</TableCell>
											<TableCell className="text-right">
												<Switch checked={message.verified} disabled />
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
