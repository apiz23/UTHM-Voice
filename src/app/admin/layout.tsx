import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandMenu } from "@/components/commandMenu";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Login - UTHM Voice",
	description: "Uthm Voice project",
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<CommandMenu />
					<SessionWrapper>{children}</SessionWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
