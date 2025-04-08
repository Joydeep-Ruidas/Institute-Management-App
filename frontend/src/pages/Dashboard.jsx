import React from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#CDC7E5] to-[#FFEC51] p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-full lg:h-[90vh] rounded-md overflow-hidden bg-[#FFFBDB]">
        <SideNav />
        <div className="flex flex-col flex-1">
          <TopNav />

          {/* Main Content Area */}
          <div className="p-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
