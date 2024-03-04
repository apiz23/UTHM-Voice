import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { CommandMenu } from "@/components/commandMenu";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "UTHM Voice",
	description: "Uthm Voice project",
	icons: {
		icon: [
			{
				url: "/logo.png",
				href: "/logo.png",
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
					<CommandMenu />
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
