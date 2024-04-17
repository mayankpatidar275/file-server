import { useState } from "react";
import "./App.css";
import Client from "./components/client/Client";
import Server from "./components/server/Server";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [isServerPage, setIsServerPage] = useState(true);
  return (
    <div className="container">
      <Navbar />
      {isServerPage ? <Server /> : <Client />}
    </div>
  );
}

export default App;
