import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Client from "./components/client/Client";
import Server from "./components/server/Server";
import { killAllServers } from "./utils";

function App() {
  const [activeTab, setActiveTab] = useState("server");
  const [servers, setServers] = useState([]);

  useEffect(() => {
    return () => {
      console.log("iside USEEFFECT");
      killAllServers(servers);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with a certain height */}
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content container takes the rest of the height */}
      <div className="flex-1">
        <div className={activeTab === "server" ? "block" : "hidden"}>
          <Server servers={servers} setServers={setServers} />
        </div>
        <div className={activeTab === "client" ? "block" : "hidden"}>
          <Client />
        </div>
      </div>
    </div>
  );
}

export default App;
