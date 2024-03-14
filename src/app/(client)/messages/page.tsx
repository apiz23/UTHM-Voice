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
import supabase from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SelectValueProps } from "@radix-ui/react-select";
import { InfoIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Message() {
	const [message, setMessage] = useState<string>();
	const [category, setCategory] = useState<number>();

	const handleMessage = async () => {
		if (!message && !category) {
			toast.error("Please fill all the inputs");
			return;
		}
		try {
			const { data, error } = await supabase
				.from("message")
				.insert([{ content: message, category: category }])
				.select();

			if (error) {
				toast.error("Error");
			}
			const promise = () =>
				new Promise((resolve) =>
					setTimeout(() => resolve({ name: "Sonner" }), 2000)
				);

			toast.promise(promise, {
				loading: "Loading...",
				success: () => {
					return "Message inserted successfully";
				},
				error: "Error",
			});
		} catch (error: any) {
			console.error("Error inserting message:", error.message);
		}
	};

	return (
		<>
			<div className="max-w-3xl mx-auto my-44">
				<Card className="mx-auto py-4 px-7 md:px-14 md:py-8 bg-zinc-300 dark:bg-zinc-900">
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
							<div className="flex mx-auto mb-5">
								<Select
									onValueChange={(value: string) => {
										setCategory(Number(value));
									}}
								>
									<SelectTrigger className="w-[200px]">
										<SelectValue placeholder="Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">FSKTM</SelectItem>
										<SelectItem value="1">PPD</SelectItem>
										<SelectItem value="2">FTK</SelectItem>
									</SelectContent>
								</Select>
								<div className="ms-5 rounded-full p-2">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<InfoIcon className="w-5 h-5" />
											</TooltipTrigger>
											<TooltipContent>
												<p>Faculty that you want to target lol</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
							<Textarea
								placeholder="Type your message here."
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
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
		</>
	);
}
