import React, { useState } from "react";
import ClientExplorer from "./ClientExplorer";
import ClientInput from "./ClientInput";

const Client = () => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [clientExplorerKey, setClientExplorerKey] = useState(0);

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
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
          <div className="flex justify-center items-center bg-white text-gray-500 h-40">
            No server selected
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
