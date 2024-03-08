"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	MenuIcon,
	Moon,
	SearchIcon,
	Sun,
	Command,
	MessageSquareText,
	Send,
	Info,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutButton from "./LogOutButton";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
	SheetHeader,
	SheetDescription,
} from "@/components/ui/sheet";
import { H3 } from "./typography";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
	const { setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = () => {
		const event = new KeyboardEvent("keydown", {
			key: "j",
			code: "KeyJ",
			ctrlKey: true,
		});
		document.dispatchEvent(event);
	};

	const navItems = [
		{
			label: "Feed",
			path: "/feed",
			icon: <MessageSquareText className="me-5" />,
		},
		{ label: "Message", path: "/messages", icon: <Send className="me-5" /> },
		{ label: "About", path: "/about", icon: <Info className="me-5" /> },
	];

	return (
		<>
			<div className="flex px-2 py-3 justify-between md:hidden">
				<div className="md:hidden">
					<Sheet key="left">
						<SheetTrigger>
							<button
								type="button"
								className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								<span className="sr-only">Open main menu</span>
								<MenuIcon />
							</button>
						</SheetTrigger>
						<SheetContent side="left">
							<SheetHeader>
								<SheetTitle>
									<Link
										href="/"
										className="flex items-center space-x-3 rtl:space-x-reverse"
									>
										<span className="self-center mx-3 text-2xl font-semibold whitespace-nowrap dark:text-white">
											UTHM VOICE
										</span>
									</Link>
								</SheetTitle>
								<SheetDescription>
									<button type="button" onClick={handleClick}>
										<div className="hidden md:block">
											<div className="flex group items-center s justify-between mt-1 bg-surface-100 bg-opacity-75 shadow-lg hover:bg-surface-200 hover:bg-opacity-100 border transition pl-1.5 md:pl-3 pr-1.5 w-full h-[32px] rounded text-foreground-lighter ">
												<div className="flex items-center space-x-2">
													<SearchIcon className="w-4 h-4" />
													<p className="hidden md:flex text-sm pe-5">Search docs...</p>
												</div>
												<div className="hidden md:flex items-center space-x-1">
													<div
														aria-hidden="true"
														className="md:flex items-center justify-center h-5 w-10 border rounded bg-surface-300 gap-1"
													>
														<Command className="w-3 h-3" />

														<span className="text-[12px]">K</span>
													</div>
												</div>
											</div>
										</div>
									</button>
								</SheetDescription>
							</SheetHeader>
							<ul className="space-y-2 font-medium">
								{navItems.map((item) => (
									<li key={item.label} className="pt-2">
										<Link
											href={item.path}
											className={`flex py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
												usePathname() === item.path ? "text-purple-600" : ""
											}`}
										>
											{item.icon}

											{item.label}
										</Link>
									</li>
								))}
								<ThemeToggle />
							</ul>
						</SheetContent>
					</Sheet>
				</div>
				<div className="relative block md:hidden">
					<button
						className="flex items-center justify-center w-10 h-10 bg-surface-100 bg-opacity-75 hover:bg-surface-200 hover:bg-opacity-100 rounded-full transition"
						onClick={handleClick}
					>
						<SearchIcon className="w-5 h-5" />
					</button>
				</div>
			</div>

			<aside className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 md:block hidden shadow-md shadow-gray-500">
				<div
					className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-black bg-no-repeat bg-center bg-contain"
					style={{
						backgroundImage: "url('/aside.svg')",
					}}
				>
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse px-3 my-5"
					>
						<span className="self-center mx-3 text-2xl font-semibold whitespace-nowrap dark:text-white">
							UTHM VOICE
						</span>
					</Link>
					<ul className="space-y-2 font-medium">
						<div className="flex justify-between mb-5">
							<button type="button" onClick={handleClick}>
								<div className="relative hidden md:block shadow-lg">
									<div className="flex group items-center justify-between mt-1 bg-surface-100 bg-opacity-75 hover:bg-surface-200 hover:bg-opacity-100 border transition pl-1.5 md:pl-3 pr-1.5 w-full h-[32px] rounded text-foreground-lighter ">
										<div className="flex items-center space-x-2">
											<SearchIcon className="w-4 h-4" />
											<p className="hidden md:flex text-sm pe-5">Search docs...</p>
										</div>
										<div className="hidden md:flex items-center space-x-1">
											<div
												aria-hidden="true"
												className="md:flex items-center justify-center h-5 w-10 border rounded bg-surface-300 gap-1"
											>
												<Command className="w-3 h-3" />

												<span className="text-[12px]">K</span>
											</div>
										</div>
									</div>
								</div>
							</button>
							<ThemeToggle />
						</div>
						{navItems.map((item) => (
							<li key={item.label} className="pt-2">
								<Link
									href={item.path}
									className={`flex py-2 px-3 mb-5 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
										usePathname() === item.path ? "text-purple-600" : ""
									}`}
								>
									{item.icon}
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</>
	);
};

export const NavbarAdmin = ({ session }: any) => {
	const { setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	const handleClick = () => {
		const event = new KeyboardEvent("keydown", {
			key: "j",
			code: "KeyJ",
			ctrlKey: true,
		});
		document.dispatchEvent(event);
	};

	const navItemsAdmin = [{ label: "Dashboard", path: "/admin/dashboard" }];
	return (
		<nav className="py-3 border  bg-white border-gray-100 dark:border-gray-800 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
				<Link
					href="/admin/dashboard"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<span className="self-center mx-3 text-2xl font-semibold whitespace-nowrap dark:text-white">
						UTHM VOICE
					</span>
				</Link>
				<div className="flex">
					<div className="relative block md:hidden">
						<button
							className="flex items-center justify-center w-10 h-10 bg-surface-100 bg-opacity-75 hover:bg-surface-200 hover:bg-opacity-100 rounded-full transition"
							onClick={handleClick}
						>
							<SearchIcon className="w-5 h-5" />
						</button>
					</div>
					<button
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						onClick={toggleNavbar}
					>
						<span className="sr-only">Open main menu</span>
						<MenuIcon />
					</button>
				</div>
				<div className={`w-full md:block md:w-auto ${isOpen ? "hidden" : "block"}`}>
					<ul className="font-medium flex flex-col md:m-0 m-2 p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<button type="button" onClick={handleClick}>
							<div className="relative hidden md:block">
								<div className="flex group items-center justify-between mt-1 bg-surface-100 bg-opacity-75 hover:bg-surface-200 hover:bg-opacity-100 border transition pl-1.5 md:pl-3 pr-1.5 w-full h-[32px] rounded text-foreground-lighter ">
									<div className="flex items-center space-x-2">
										<SearchIcon className="w-4 h-4" />
										<p className="hidden md:flex text-sm pe-5">Search docs...</p>
									</div>
									<div className="hidden md:flex items-center space-x-1">
										<div
											aria-hidden="true"
											className="md:flex items-center justify-center h-5 w-10 border rounded bg-surface-300 gap-1"
										>
											<Command className="w-3 h-3" />

											<span className="text-[12px]">K</span>
										</div>
									</div>
								</div>
							</div>
						</button>

						{navItemsAdmin.map((item) => (
							<li key={item.label} className="pt-2">
								<Link
									href={item.path}
									className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
										usePathname() === item.path ? "text-purple-600" : ""
									}`}
								>
									{item.label}
								</Link>
							</li>
						))}

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className={`${isOpen ? "hidden" : ""}`}
								>
									<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									System
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Sheet>
							<SheetTrigger>
								<Avatar>
									<AvatarImage src={session.user?.image} alt="icon" sizes="icon" />
									<AvatarFallback>{session.user?.name}</AvatarFallback>
								</Avatar>
							</SheetTrigger>
							<SheetContent className="flex flex-col justify-between">
								<SheetTitle>
									<H3 text="Profile" />
								</SheetTitle>
								<div className="p-4">
									<div className="flex justify-center items-center mb-5">
										<Avatar className="w-40 h-40">
											<AvatarImage src={session.user?.image} alt="icon" />
											<AvatarFallback>{session.user?.name}</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex items-center justify-between mb-4">
										<div>
											<p className="text-lg font-semibold">{session.user?.name}</p>
											<span className="text-sm text-gray-500">{session.user?.email}</span>
										</div>
									</div>
								</div>

								<SheetFooter className="mt-auto">
									<LogOutButton />
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</ul>
				</div>
			</div>
		</nav>
	);
};
