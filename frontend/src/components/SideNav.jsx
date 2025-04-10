import React from "react";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUserPlus,
  FaList,
  FaUsers,
  FaMoneyCheckAlt,
  FaHistory,
  FaUserTie,
  FaPhoneAlt,
} from "react-icons/fa";

const SideNav = () => {
  const location = useLocation();
  return (
    <div>
      <div className="w-[250px] relative min-h-full bg-[#eef608] text-zinc-700 flex flex-col items-center px-2 py-4">
        {/* Logo and Title */}
        <div className="flex bg-[#FF4191] flex-row justify-around w-full items-center mb-6 py-2 rounded-md">
          <img src={Logo} alt="Logo" className="w-10" />
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-center text-white">
              Institute Management App
            </h2>
            <p className="text-xs text-start text-white">
              Manage your Institute
            </p>
          </div>
        </div>

        <nav className="text-md font-semibold flex flex-col items-start w-full px-1 gap-1">
          <Link
            to={"/dashboard/home"}
            className={`${location.pathname==="/dashboard/home"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaHome /> Home
          </Link>
          <Link
            to={"/dashboard/add-course"}
            className={`${location.pathname==="/dashboard/add-course"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaBook /> Add Course
          </Link>
          <Link
            to={"/dashboard/add-student"}
            className={`${location.pathname==="/dashboard/add-student"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaUserPlus /> Add Student
          </Link>
          <Link
            to={"/dashboard/all-courses"}
            className={`${location.pathname==="/dashboard/all-courses"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaList /> All Courses
          </Link>
          <Link
            to={"/dashboard/all-students"}
            className={`${location.pathname==="/dashboard/all-students"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaUsers /> All Students
          </Link>
          <Link
            to={"/dashboard/collect-fee"}
            className={`${location.pathname==="/dashboard/collect-fee"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaMoneyCheckAlt /> Collect Fee
          </Link>
          <Link
            to={"/dashboard/payment-history"}
            className={`${location.pathname==="/dashboard/payment-history"?"bg-[#FF4191]":"hover:bg-[#FF4191]"} w-full p-2 rounded-md cursor-pointer flex items-center gap-2`}
          >
            <FaHistory /> Payment History
          </Link>
        </nav>

        <div className="absolute bottom-4 left-5 text-sm font-semibold flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <FaUserTie /> <span>Contact Developer</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt /> <span>1234567890</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
