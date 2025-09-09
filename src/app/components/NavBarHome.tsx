"use client";

import { useMenu } from "@/menu";
import MenuDrawer from "./MenuDrawer";
import { AnimatePresence } from "framer-motion";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

export default function NavBarGlobal() {
	const menu = useMenu();
	
	return (
			<>
				<div className="flex h-20 p-4 justify-between w-full bg-white">
					<Logo />
					<div className="flex items-center gap-4">
						<LoginButton />
						<div
								onClick={menu.toggleMenu}
								className="flex flex-col justify-between w-6 h-5 cursor-pointer relative"
							>
								<span
									className={`h-1 w-full bg-neutral-900 rounded-lg transition-transform duration-300 ${
										menu.isOpen ? "rotate-45 translate-y-2" : ""
									}`}
								></span>
								<span
									className={`h-1 w-full bg-neutral-900 rounded-lg transition-all duration-300 ${
										menu.isOpen ? "opacity-0" : "opacity-100"
									}`}
								></span>
								<span
									className={`h-1 w-full bg-neutral-900 rounded-lg transition-transform duration-300 ${
										menu.isOpen ? "-rotate-45 -translate-y-2" : ""
									}`}
								></span>
							</div>
					</div>
				</div>
				<AnimatePresence>
					{menu.isOpen && <MenuDrawer />}
				</AnimatePresence>
			</>
	)
}