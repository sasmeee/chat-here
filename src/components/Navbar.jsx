import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { BsChatDotsFill } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import { getRoomID } from "../pages/Dashboard";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChanger = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Copy Room ID

  const copyRoomID = () => {
    navigator.clipboard
      .writeText(getRoomID)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => console.error(err));
  };

  // Define a component to conditionally render content on "chat:room" route
  const ConditionalContent = () => {
    const location = useLocation();

    if (location.pathname === "/chat:room") {
      return (
        <div className="md:py-2 md:px-10 dark:bg-slate-800 dark:text-gray-400 dark:border-gray-600 flex items-center justify-between w-full px-8 py-1 text-gray-600 duration-100 bg-white border-b border-gray-200">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase">
            <span>Room</span>
            <span className="dark:bg-gray-700 flex items-center justify-center px-2 bg-gray-100 rounded-lg">
              {getRoomID}
            </span>
          </p>
          <button
            className="flex items-center justify-center"
            onClick={copyRoomID}
          >
            <IoCopy />
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="sticky top-0 z-10">
      <nav className="md:px-10 dark:bg-slate-800 dark:border-gray-600 md:py-5 flex items-center justify-between w-full px-8 py-4 duration-100 bg-white border-b border-gray-200">
        <div className="dark:text-cyan-500 flex items-center gap-2 text-lg font-semibold tracking-wider text-blue-500 duration-100">
          <BsChatDotsFill />
          <p className="dark:text-gray-300 text-gray-800 duration-100">
            ChatHere
          </p>
        </div>
        <div className="dark:text-gray-300 flex items-center justify-center gap-3 text-gray-700 duration-100">
          <a
            href="https://github.com/sasmeee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub className="text-lg" />
          </a>
          <div>
            <button
              className="text-2xl relative top-[3px] "
              onClick={handleThemeChanger}
            >
              {theme === "light" ? <PiMoonStarsFill /> : <PiSunDimFill />}
            </button>
          </div>
        </div>
      </nav>
      <ConditionalContent />
    </div>
  );
};

export default Navbar;
