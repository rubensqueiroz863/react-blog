"use client";

import { useOverviewMenu } from "@/menu";
import NavBarOverview from "../components/NavBarOverviewTemp";
import OverviewMenuDrawer from "../components/OverviewMenuDrawer";
import { AnimatePresence } from "framer-motion";

export default function OverviewPage() {
  const menu = useOverviewMenu();

  return (
    <div className="flex flex-col h-screen">
      <NavBarOverview /> {/* h-10 já está aplicado no próprio componente */}
      <div className="flex-1 relative">
        {(menu.isOpen || menu.isLocked) && (
          <AnimatePresence>
            <OverviewMenuDrawer />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
