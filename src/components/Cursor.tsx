"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
	const cursorSize = 15;
	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions),
	};

	const manageMouseMove = (e: any) => {
		const { clientX, clientY } = e;
		mouse.x.set(clientX - cursorSize / 2);
		mouse.y.set(clientY - cursorSize / 2);
	};

	useEffect(() => {
		window.addEventListener("mousemove", manageMouseMove);
		return () => {
			window.removeEventListener("mousemove", manageMouseMove);
		};
	}, []);

	return (
		<div className="fixed">
			<motion.div
				className="bg-black dark:bg-white"
				style={{
					width: cursorSize,
					height: cursorSize,
					borderRadius: "50%",
					pointerEvents: "none",
					position: "absolute",
					left: smoothMouse.x,
					top: smoothMouse.y,
				}}
			/>
		</div>
	);
}
