import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdCloudUpload,
  MdReceipt,
  MdSchedule,
  MdEvent,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

import { ToastContainer } from "react-toastify";

const NavItems = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    link: "/dashboard",
  },
  {
    title: "Upload",
    icon: MdCloudUpload,
    link: "/",
  },
  {
    title: "Invoice",
    icon: MdReceipt,
    link: "/invoice",
  },
  {
    title: "Schedule",
    icon: MdSchedule,
    link: "/schedule",
  },
  {
    title: "Calendar",
    icon: MdEvent,
    link: "/calendar",
  },
  {
    title: "notifications",
    icon: MdNotifications,
    link: "/notifs",
  },
  {
    title: "settings",
    icon: MdSettings,
    link: "/setting",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="h-[64px] flex flex-row items-center justify-between p-4 bg-primary-bg">
      <ToastContainer />
      <div className="md:hidden z-10">
        <button
          className={`${styles["hamburger"]} ${styles["hamburger--collapse"]} ${
            menuOpen ? styles["is-active"] : ""
          } z-20`}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`${styles["hamburger-box"]} `}>
            <span className={`${styles["hamburger-inner"]}`}></span>
          </span>
        </button>
      </div>
      <div className=" w-full flex flex-row items-center gap-4 justify-end border-red-500">
        <IoMdNotificationsOutline className="text-2xl text-primary-text" />
        <FaRegCircleUser className="h-6 w-6 text-primary-text"/>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-[100vh] bg-[#111] flex flex-col justify-start ${
          menuOpen ? "visible" : "hidden"
        } overflow-hidden`}
      >
        <div className="flex flex-col gap-4 p-4 w-[350px] max-w-full h-full items-center justify-center">
          <nav className=" flex flex-col gap-4 items-start justify-center text-secondary-text text-2xl">
            {NavItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 ${
                  currentPath === item.link
                    ? " bg-gradient-to-r from-[#ACA9FF6F] to-[#ACA9FF00] text-accent-bg"
                    : "hover:text-primary-text"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <p className="">{item.title}</p>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
