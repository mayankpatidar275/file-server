import React, { useState } from "react";
import ClientInput from "./ClientInput";
import ClientExplorer from "./ClientExplorer";

const Client = () => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (ip, port) => {
    setIp(ip);
    setPort(port);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-2">
        <ClientInput onSubmit={handleSubmit} />
      </div>
      <div className="flex-1 overflow-hidden">
        {isSubmitted && <ClientExplorer ip={ip} port={port} />}
      </div>
    </div>
  );
};

export default Client;
