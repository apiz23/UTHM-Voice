"use client";
import { TypeAnimation } from "react-type-animation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
	const [showCheckbox, setShowCheckbox] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowCheckbox(true);
		}, 1200);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			<div className="min-h-screen flex justify-center items-center">
				<div>
					<TypeAnimation
						sequence={["UTHM Voice", 100]}
						wrapper="span"
						speed={50}
						style={{ fontSize: "2em", display: "inline-block" }}
						repeat={Infinity}
					/>
					{showCheckbox && (
						<div className="flex items-center space-x-2 my-6">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
							</label>
							<Link href="/messages">
								<Button variant="outline">Continue</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
