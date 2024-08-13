/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillDiscord } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";
import ThemeToggle from "../../components/themeToggle/themeToggle";
import { getProfile } from "../../utils/auth";
import { useState } from "react";

export default function App() {
  const { update, login } = authStore();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("");

  const handleLogin = async (e: any) => {
    const email = e.target[0].value;
    if (loginType === "manager") {
      update({ email: email, role: "manager" });
      navigate("/manager");
      return;
    }
    try {
      const data = await getProfile(email);
      data["role"] = "driver";
      login(data);
      navigate("/driver");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row h-screen p-4 gap-6 items-center justify-center bg-primary-bg">
      {/* left side*/}
      <div className="hidden md:block w-full h-full bg-[#4b59d7cf] rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col h-full rounded-3xl p-6 lg:p-12 gap-6 items-start justify-start bg-[#4b58d7] relative">
          <div className="p-4 rounded-full bg-white flex flex-row items-center justify-between gap-6">
            {/* todo change to svg*/}
            <img src="/MotorQ.svg" className="h-12 w-12" />
            <h2 className="text-2xl font-bold text-black">MotorQ</h2>
          </div>
          <div className="flex flex-col gap-6 items-start justify-start">
            <h2 className="text-5xl font-bold text-white max-w-[500px] leading-[63px]">
              Move smarter with device-free insights
            </h2>
          </div>
          <img
            src="/auth/img.png"
            className=" absolute right-0 bottom-0 max-w-[70%] max-h-[350px]"
          />
          <div className="absolute bottom-0 left-0">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* right side*/}
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="md:hidden absolute top-0 flex flex-row items-center gap-4 h-20 p-4 bg-[#605bff] w-full">
          <img src="/MotorQ.svg" className="h-12 w-12" />
          <h2 className="text-2xl text-primary-text font-semibold">MotorQ</h2>
        </div>
        <div className="max-w-[450px] w-full text-primary-text h-full max-h-[600px] flex flex-col gap-6 justify-start">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="font-bold">Sign in to your account</p>
          <div className="w-full flex-row flex gap-4 items-center justify-between">
            <button
              onClick={() => {
                setLoginType("manager");
                console.log(loginType);
              }}
              className={`w-full p-2 rounded-xl text-primary-text font-bold flex items-center justify-center transition-all gap-4 border-2 border-secondary-bg hover:border-accent-bg
              ${
                loginType == "manager" ? "bg-accent-bg" : "bg-secondary-bg"
              }
                `}
            >
              <p>Sign in as a Manager</p>
            </button>
            <button
              onClick={() => {
                setLoginType("driver");
                console.log(loginType);
              }}
              className={`w-full p-2 rounded-xl text-primary-text font-bold flex items-center transition-all justify-center gap-4 border-2 border-secondary-bg hover:border-accent-bg
              ${loginType == "driver" ? "bg-accent-bg" : "bg-secondary-bg"}
                `}
            >
              <p>Sign in as a Driver</p>
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(e);
            }}
            className="bg-secondary-bg  rounded-xl w-full p-8 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-full">
              <label className="font-bold w-full">Email</label>
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full p-2 my-2 rounded-xl bg-primary-bg  font-bold"
              />
            </div>

            <div className="w-full">
              <label className=" font-bold w-full">Password</label>
              <input
                required
                type="password"
                placeholder="password"
                className="w-full p-2 my-2 rounded-xl bg-primary-bg font-bold"
              />
            </div>
            <a href="/forgotpassword" className="w-full text-[#4979D9]">
              Forgot Password?
            </a>
            <button
              type="submit"
              className="w-full p-2 my-2 rounded-xl bg-[#605bff] font-bold hover:bg-opacity-80"
            >
              Sign in
            </button>
          </form>
          <div className="flex flex-row gap-2 items-center justify-center">
            <p className="text-[#858585]">Don't have an account?</p>
            <a href="/signup" className="text-[#605bff]">
              Register here
            </a>
          </div>

          <div className="flex flex-row h-full gap-4 items-end justify-center ">
            <FaGithub className="text-[#858585] text-2xl" />
            <AiFillTwitterCircle className="text-[#858585] text-2xl" />
            <IoLogoLinkedin className="text-[#858585] text-2xl" />
            <AiFillDiscord className="text-[#858585] text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
