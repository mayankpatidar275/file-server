import React, { useState } from "react";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("server")}
          className={`${
            activeTab === "server"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } uppercase flex-1 text-center py-4 px-6 font-medium focus:outline-none`}
        >
          Server
        </button>
        <button
          onClick={() => setActiveTab("client")}
          className={`${
            activeTab === "client"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } uppercase flex-1 text-center py-4 px-6 font-medium focus:outline-none`}
        >
          Client
        </button>
      </div>

      {/* <div className="mt-8">
        {activeTab === "server" && <Server />}
        {activeTab === "client" && <Client />}
      </div> */}
    </div>
  );
};

export default Navbar;
