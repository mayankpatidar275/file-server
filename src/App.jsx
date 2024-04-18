import { useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Client from "./components/client/Client";
import Server from "./components/server/Server";

function App() {
  const [activeTab, setActiveTab] = useState("server");
  const [server, setServer] = useState(null);

  // const [lastFetch, setLastFetch] = useState(null);
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with a certain height */}
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content container takes the rest of the height */}
      <div className="flex-1">
        {activeTab === "server" ? (
          <Server server={server} setServer={setServer} />
        ) : (
          <Client />
        )}
      </div>
    </div>
  );
}

export default App;
