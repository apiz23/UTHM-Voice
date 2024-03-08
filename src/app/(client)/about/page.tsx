"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function About() {
	return (
		<>
			<div className="section1 min-h-screen">About</div>
			<div className="section2 min-h-screen">About</div>
		</>
	);
}
