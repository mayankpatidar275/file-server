import React, { useState } from "react";
import ClientInput from "./ClientInput";
import ClientExplorer from "./ClientExplorer";

const Client = () => {
  const [ip, setIp] = useState("127.0.0.1");
  const [port, setPort] = useState("5000");
  const [clientExplorerKey, setClientExplorerKey] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setClientExplorerKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="bg-white shadow-md p-2">
        <ClientInput
          ip={ip}
          port={port}
          setIp={setIp}
          setPort={setPort}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
      <div className="flex-1">
        {clientExplorerKey > 0 ? (
          <ClientExplorer key={clientExplorerKey} ip={ip} port={port} />
        ) : (
          <div className="flex justify-center items-center h-screen  ">
            Click start to fetch
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
