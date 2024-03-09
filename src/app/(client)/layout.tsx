import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { CommandMenu } from "@/components/commandMenu";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "UTHM Voice",
	description: "Uthm Voice project",
	icons: {
		icon: [
			{
				url: "/logo1.png",
				href: "/logo1.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster richColors />
					<CommandMenu />
					<Navbar />
					<div
						className="bg-white dark:bg-black p-4 min-h-screen sm:ml-72 h-fit bg-no-repeat bg-cover bg-fixed"
						style={{
							backgroundImage: "url('/bg3.svg')",
						}}
					>
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
