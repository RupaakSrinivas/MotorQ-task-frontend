import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar/Navbar";

export default function App() {

  return (
    <div className="flex flex-row h-screen w-full items-center overflow-hidden absolute justify-center">
      <div className="hidden md:block h-full max-w-[400px]">
        <Sidebar />
      </div>
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
