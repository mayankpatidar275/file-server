import { useState } from "react";
import "./App.css";
import Client from "./components/client/Client";
import Server from "./components/server/Server";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [activeTab, setActiveTab] = useState("server");
  // const [lastFetch, setLastFetch] = useState(null);
  return (
    <div className="container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "server" ? <Server /> : <Client />}
    </div>
  );
}

export default App;
