"use client";

import Image from "next/image";
import { useState } from "react";

export default function NavBarGlobal() {
	const [isMenuOpen, setMenuOpen] = useState(false);
	
	return (
			<div className="flex h-20 p-4 justify-between w-full bg-white">
				<Image 
					src="https://i.postimg.cc/50cK06nC/pngtree-paper-icon-png-image-6294297.png"
					alt="Logo do blog"
					width={100}
					height={100}
					className="h-11 w-auto object-contain"
				/>
				<div className="flex items-center gap-4">
					<button 
						className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
						fazer login
					</button>
					 <div
							onClick={() => setMenuOpen(!isMenuOpen)}
							className="flex flex-col justify-between w-6 h-5 cursor-pointer relative"
						>
							{/* Linha 1 */}
							<span
								className={`h-1 w-full bg-neutral-900 rounded-lg transition-transform duration-300 ${
									isMenuOpen ? "rotate-45 translate-y-2" : ""
								}`}
							></span>

							{/* Linha 2 */}
							<span
								className={`h-1 w-full bg-neutral-900 rounded-lg transition-all duration-300 ${
									isMenuOpen ? "opacity-0" : "opacity-100"
								}`}
							></span>

							{/* Linha 3 */}
							<span
								className={`h-1 w-full bg-neutral-900 rounded-lg transition-transform duration-300 ${
									isMenuOpen ? "-rotate-45 -translate-y-2" : ""
								}`}
							></span>
						</div>
				</div>
			</div>
	)
}