import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Client from "./components/client/Client";
import Server from "./components/server/Server";
import { killAllServers } from "./utils";

function App() {
  const [activeTab, setActiveTab] = useState("server");
  const [servers, setServers] = useState([]);

  // useEffect hook to run when component unmounts
  useEffect(() => {
    // Cleanup function to run before unmounting the component or before page is reloaded
    const cleanup = () => {
      console.log("inside cleanup function");
      killAllServers(servers); // Call killAllServers function with servers array
    };

    // Attach the cleanup function to the beforeunload event
    window.addEventListener("beforeunload", cleanup);

    // Detach the cleanup function when component unmounts
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [servers]); // Run the cleanup function whenever servers array changes

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
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
