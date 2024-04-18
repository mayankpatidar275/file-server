import React, { useState } from "react";
import ClientInput from "./ClientInput";
import ClientExplorer from "./ClientExplorer";

const Client = () => {
  const [ip, setIp] = useState("192.168.1.35");
  const [port, setPort] = useState("5000");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col  bg-gray-100">
      <div className="bg-white shadow-md p-2">
        <ClientInput
          setIsSubmitted={setIsSubmitted}
          ip={ip}
          port={port}
          setIp={setIp}
          setPort={setPort}
        />
      </div>
      <div className="flex-1">
        {isSubmitted && <ClientExplorer ip={ip} port={port} />}
      </div>
    </div>
  );
};

export default Client;
