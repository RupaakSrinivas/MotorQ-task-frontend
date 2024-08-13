import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";

export default function ThemeToggle() {

  const [currentTheme, setCurrentTheme] = useState("light");

  function toggleDarkMode() {
    const container = document.getElementsByTagName("body")[0];
    const dataTheme = container.getAttribute("data-theme");

    if (dataTheme === "dark") {
      container.setAttribute("data-theme", "light");
      setCurrentTheme("light");
    } else {
      container.setAttribute("data-theme", "dark");
      setCurrentTheme("dark");
    }
  }

  return (
    <div className="flex justify-center">
      <button
        id="toggleDarkMode"
        onClick={toggleDarkMode}
        className="rounded-full p-[4px] w-auto h-auto flex flex-row gap-4 items-center justify-between bg-primary-bg text-secondary-text   "
      >
        <MdOutlineLightMode size={20} className={`${currentTheme === "dark" ? "": "bg-secondary-bg rounded-full p-2 h-8 w-8"}`} />
        <MdOutlineDarkMode size={20} className={`${currentTheme === "dark" ? "bg-secondary-bg rounded-full p-2 h-8 w-8" : ""}`} />
      </button>
    </div>
  );
}
