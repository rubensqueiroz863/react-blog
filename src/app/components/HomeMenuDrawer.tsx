import { useHomeMenu } from "@/menu";
import { motion } from "framer-motion";

export default function MenuDrawer() {
	const menu = useHomeMenu();

	return (
		<motion.div
			initial={{ x: "-100%" }}
			animate={{ x: 0 }}
			exit={{ x: "-100%" }}
			transition={{duration: 0.4, ease: "easeInOut"}}
			className="fixed top-0 left-0 h-full w-2/5 bg-white shadow-2xl z-50 flex flex-col"
		>
			<div className="flex items-center justify-between p-4">
				<h2 className="text-xl font-semibold">Menu</h2>
				<button
					className="cursor-pointer w-8"
					onClick={menu.closeMenu}
				  aria-label="Fechar menu"
				>
					✕
				</button>
			</div>
		</motion.div>
	);
}