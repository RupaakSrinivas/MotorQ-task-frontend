export default function LoadingScreen() {
  return (
    <div
      className={`w-full h-full flex-row bg-[#1f2937] transition duration-100 z-50 items-center justify-center flex`}
    >
      <div className="w-24 h-24 rounded-full animate-spin border-[#e5e7eb] border-t-2 border-b-2 rotate-180"></div>
    </div>
  );
}
