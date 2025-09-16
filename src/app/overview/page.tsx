"use client";

import { useOverviewMenu } from "@/menu";
import NavBarOverview from "../components/NavBarOverviewTemp";
import OverviewMenuDrawer from "../components/OverviewMenuDrawer";
import { AnimatePresence } from "framer-motion";

export default function OverviewPage() {
  const menu = useOverviewMenu();

  return (
    <div>
      <NavBarOverview />
      {(menu.isOpen || menu.isLocked) && (
          <AnimatePresence>
            <OverviewMenuDrawer />
          </AnimatePresence>
      )}
    </div>

  );
}