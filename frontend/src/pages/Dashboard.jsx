import React from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#E90074] to-[#dbbeca] p-4">
      <div className="flex flex-row w-[95%] h-full lg:h-[90vh] rounded-md overflow-hidden bg-white">
        <SideNav />
        <div className="flex flex-col flex-1">
          <TopNav />

          {/* Main Content Area */}
          <div className="p-4 overflow-y-auto h-full scrollbar-hide">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
