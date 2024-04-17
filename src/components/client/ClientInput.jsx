import React, { useState } from "react";

const ClientInput = ({ setIsSubmitted, ip, port, setIp, setPort }) => {
  const handleIpChange = (e) => {
    setIp(e.target.value);
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        value={ip}
        onChange={handleIpChange}
        placeholder="Enter IP Address"
        className="border rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        value={port}
        onChange={handlePortChange}
        placeholder="Enter Port"
        className="border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded text-sm"
      >
        Start
      </button>
    </form>
  );
};

export default ClientInput;
