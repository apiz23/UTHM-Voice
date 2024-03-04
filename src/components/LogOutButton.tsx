import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
	return (
		<>
			<Button
				onClick={() =>
					signOut({ callbackUrl: `${window.location.origin}/admin/login` })
				}
				variant="ghost"
				className="rounded-lg"
			>
				<LogOut className="w-5 h-5" />
			</Button>
		</>
	);
}
