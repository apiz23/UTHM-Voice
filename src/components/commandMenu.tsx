"use client";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CommandMenu() {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<Link href="/feed">View Feeds</Link>
					</CommandItem>
					<CommandItem>
						<Link href="/messages">Send Message</Link>
					</CommandItem>
					<CommandItem>
						<Link href="/admin">Login</Link>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
