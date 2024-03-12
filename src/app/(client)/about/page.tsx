"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Landing from "./landing";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();

			setTimeout(() => {
				document.body.style.cursor = "default";
				window.scrollTo(0, 0);
			}, 2000);
		})();
	}, []);
	// useEffect(() => {
	// 	gsap.to(".logo1", {
	// 		scrollTrigger: {
	// 			trigger: ".logo1",
	// 			start: "top bottom",
	// 			toggleActions: "restart pause reverse none",
	// 		},
	// 		x: 50,
	// 		duration: 2,
	// 	});
	// 	gsap.to(".logo2", {
	// 		scrollTrigger: {
	// 			trigger: ".logo2",
	// 			start: "top bottom",
	// 			toggleActions: "restart pause reverse none",
	// 		},
	// 		x: 320,
	// 		duration: 2,
	// 	});
	// 	gsap.to(".logo3", {
	// 		scrollTrigger: {
	// 			trigger: ".logo3",
	// 			start: "top bottom",
	// 			toggleActions: "restart pause reverse none",
	// 		},
	// 		x: 520,
	// 		duration: 2,
	// 	});
	// }, []);

	return (
		<>
			<div className="section2 min-h-screen">
				<Landing />
			</div>
			<div className="section1 min-h-screen mt-10">
				<div className="px-8 py-5 h-fit pt-40">
					<div className="bg-zinc-200 dark:bg-zinc-50 dark:bg-opacity-30 bg-opacity-40 rounded-md py-5 px-20 flex justify-between items-center">
						<img
							src="/next-js.svg"
							alt="next js"
							className="logo1 w-10 md:w-60 inline-block"
						/>
						<img
							src="/nextAuth.svg"
							alt="next js"
							className="logo2 w-10 md:w-44 inline-block"
						/>
						<img
							src="/supabase.svg"
							alt="next js"
							className="logo3 w-10 md:w-52 inline-block"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
