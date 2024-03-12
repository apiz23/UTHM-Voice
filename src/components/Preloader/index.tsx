"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import { TypeAnimation } from "react-type-animation";

export default function Preloader() {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setDimension({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height + 300} 0 ${
		dimension.height
	}  L0 0`;
	const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

	const curve = {
		initial: {
			d: initialPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			d: targetPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
		},
	};

	return (
		<motion.div
			variants={slideUp}
			initial="initial"
			exit="exit"
			className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-black"
		>
			{dimension.width > 0 && (
				<>
					<motion.p
						variants={opacity}
						initial="initial"
						animate="enter"
						className="text-white text-6xl flex items-center relative z-10"
					>
						<TypeAnimation
							sequence={["Welcome", 500]}
							wrapper="span"
							speed={25}
							style={{ fontSize: "2em", display: "inline-block" }}
							repeat={Infinity}
						/>
					</motion.p>
					<svg
						className="absolute top-0 w-full"
						style={{ height: `calc(100% + 300px)` }}
					>
						<motion.path
							variants={curve}
							initial="initial"
							exit="exit"
							fill="#18181b"
						></motion.path>
					</svg>
				</>
			)}
		</motion.div>
	);
}
