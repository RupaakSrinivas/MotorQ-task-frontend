import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./themeToggle/themeToggle";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { authStore } from "../store/auth";

const NavItemsManagers = [
  {
    title: "Drivers",
    icon: GoPerson,
    link: "/manager/drivers",
  },
  {
    title: "Vehicles",
    icon: BsTruck,
    link: "/manager/vehicles",
  },
  {
    title: "Assign",
    icon: MdOutlineAssignmentInd,
    link: "/manager/assign",
  },
];

const NavItemsDrivers = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    link: "/driver",
  },
];

export default function Sidebar() {
  const [minWidth, maxWidth, defaultWidth] = [80, 400, 201];
  const location = useLocation();
  const { logout, role } = authStore();
  const navigate = useNavigate();

  const [currentPath, setCurrentPath] = useState("");
  const [width, setWidth] = useState(defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, [maxWidth, minWidth]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      style={{ width: `${width / 16}rem` }}
      className=" h-full flex flex-row bg-secondary-bg"
    >
      <div
        style={{ width: `${width / 16}rem` }}
        className={`bg-secondary-bg text-secondary-text h-full transition-all flex flex-col gap-12 `}
      >
        <div
          className={`flex ${
            width > 100 ? "flex-row" : "flex-col"
          } gap-4 p-4 items-center justify-between`}
        >
          <section className="flex flex-row text-primary-text items-center justify-center gap-4">
            <img src="/MotorQ.svg" className="h-8" />
            <h1
              className={` ${width > 200 ? "" : "hidden"} font-bold text-2xl`}
            >
              MotorQ
            </h1>
          </section>

          <TbLayoutSidebarLeftExpand
            onClick={() => {
              setWidth((previousWidth) =>
                previousWidth >= defaultWidth ? minWidth : defaultWidth
              );
            }}
            className="text-2xl hover:cursor-pointer hover:text-primary-text"
          />
        </div>

        <nav className=" flex flex-col gap-4 items-start justify-center">
          {role === "manager" &&
            NavItemsManagers.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.link);
                }}
                className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 ${
                  currentPath === item.link
                    ? " text-accent-bg"
                    : "hover:text-primary-text"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <p className={`${width >= 200 ? "" : "hidden"}`}>
                  {item.title}
                </p>
              </button>
            ))}
          {role === "driver" &&
            NavItemsDrivers.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.link);
                }}
                className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 ${
                  currentPath === item.link
                    ? " text-accent-bg"
                    : "hover:text-primary-text"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <p className={`${width >= 200 ? "" : "hidden"}`}>
                  {item.title}
                </p>
              </button>
            ))}
          <button
            onClick={() => {
              logout();
            }}
            className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 hover:text-primary-text`}
          >
            <MdOutlineLogout className="w-6 h-6" />
            <p className={`${width >= 200 ? "" : "hidden"}`}>Logout</p>
          </button>
        </nav>

        <div className="h-full w-full flex flex-row items-end ml-4 mb-4">
          <ThemeToggle />
        </div>
      </div>
      <div
        onMouseDown={() => {
          isResized.current = true;
        }}
        className="hover:cursor-ew-resize h-full w-2 bg-secondary-bg"
      ></div>
    </div>
  );
}
