"use client";

import { useMenu } from "@/menu";
import MenuDrawer from "./MenuDrawer";
import { AnimatePresence } from "framer-motion";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

export default function NavbarHome() {
	const menu = useMenu();
	
	return (
			<>
				<div className="flex h-20 p-4 justify-between w-full bg-white">
					<Logo />
					<div className="flex items-center gap-4">
						<LoginButton />
						<MenuButton />
					</div>
				</div>
				<AnimatePresence>
					{menu.isOpen && <MenuDrawer />}
				</AnimatePresence>
			</>
	)
}