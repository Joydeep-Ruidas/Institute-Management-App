import React from "react";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex flex-col w-full">
      {/* TopNavbar */}
      <div className="w-full border-b-2 border-[#E90074] py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
        <img src={user.imageURL} alt="" className="w-12 rounded-full overflow-hidden" />
        <h2 className="text-[#E90074] text-lg font-semibold">
          {user.instituteName}
        </h2>
        </div>
        <button onClick={logoutHandler} className="text-sm bg-[#E90074] hover:bg-[#FF4191] text-white px-3 py-2 rounded-md cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
