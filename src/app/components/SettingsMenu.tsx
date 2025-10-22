import { useEffect, useRef } from "react";

export default function SettingsMenu({ onClose }: Readonly<{ onClose: () => void }>) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose(); // fecha o menu
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 👇 esse clique é importante
  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation(); // impede o clique de “vazar” pro UserMenu
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={handleContainerClick} // 👈 intercepta aqui
    >
      <div
        ref={menuRef}
        className="flex flex-col px-4 py-4 w-[90%] max-w-md h-auto rounded-xl border border-neutral-700 dark:bg-neutral-800 shadow-2xl"
      >
        <div className="flex w-full justify-end items-end">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-neutral-700 cursor-pointer text-neutral-600"
          >
            <p>✖</p>
          </button>
        </div>
        <h2 className="text-xl font-semibold text-white mb-4">Configurações</h2>
        <p className="text-neutral-300">Clique fora para fechar</p>
      </div>
    </div>
  );
}
