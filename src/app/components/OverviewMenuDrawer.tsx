"use client";

import { useOverviewMenu } from "@/menu";
import { motion } from "framer-motion";

export default function OverviewMenuDrawer() {
  const menu = useOverviewMenu();

  return (
    <motion.div 
      initial={{ x: "-100%" }}
			animate={{ x: 0 }}
			exit={{ x: "-100%" }}
			transition={{duration: 0.4, ease: "easeInOut"}}
      onMouseLeave={menu.closeMenu}
      className="flex w-80 h-screen">
      <div className="flex m-2 rounded-lg bg-white dark:bg-neutral-800 w-full h-130">
        
      </div>
    </motion.div>
    
  );
}