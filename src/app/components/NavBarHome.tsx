"use client";

import { useHomeMenu } from "@/menu";
import MenuDrawer from "./MenuDrawer";
import { AnimatePresence } from "framer-motion";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import HomeMenuButton from "./HomeMenuButton";

export default function NavbarHome() {
	const menu = useHomeMenu();
	
	return (
			<>
				<div className="flex h-20 p-4 justify-between w-full bg-white">
					<Logo />
					<div className="flex items-center gap-4">
						<LoginButton />
						<HomeMenuButton />
					</div>
				</div>
				<AnimatePresence>
					{menu.isOpen && <MenuDrawer />}
				</AnimatePresence>
			</>
	)
}