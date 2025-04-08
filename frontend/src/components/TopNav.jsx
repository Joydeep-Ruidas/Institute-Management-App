import React from "react";
import Logo from "../assets/logo.png";

const TopNav = () => {
  return (
    <div className="flex flex-col w-full">
      {/* TopNavbar */}
      <div className="w-full bg-[#CDC7E5] py-1.5 px-6 flex justify-between items-center">
        <h2 className="text-[#192B5D] text-lg font-semibold">
          Joydeep's Coding Academy
        </h2>
        <img src={Logo} alt="" className="w-14 overflow-hidden" />
        <button className="text-sm bg-[#FF674D] text-white px-3 py-2 rounded-md cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
