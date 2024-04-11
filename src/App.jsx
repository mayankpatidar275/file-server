import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";
import Client from "./components/client/Client";

// Go to shell.js and learn how to implement
function App() {
  // https://tauri.app/v1/api/js/shell/#restricting-access-to-the-command-apis
  // https://tauri.app/v1/guides/building/sidecar/#passing-arguments

  const [server, setServer] = useState(null);

  // arguments
  const [servePath, setServePath] = useState("/home/mayank/Downloads/");
  const [port, setPort] = useState("5000");
  const [enableCors, setEnableCors] = useState(false);
  const [allowAll, setAllowAll] = useState(false);
  const [commandArgs, setCommandArgs] = useState([]);

  const command = Command.sidecar("../public/dufs", commandArgs); // sidecar also returns an instance of Command

  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
  });
  command.on("error", (error) => {
    console.error(`command error: "${error}"`);
  });
  command.stdout.on("data", (line) => {
    console.log(`command stdout: "${line}"`);
  });
  command.stderr.on("data", (line) => {
    console.log(`command stderr: "${line}"`);
  });

  const startBroadcast = async () => {
    // Start broadcasting
    try {
      await invoke("start_broadcasting", { port: 5000 });
      console.log("Broadcasting started");
    } catch (error) {
      console.error("Error starting broadcasting:", error);
    }
  };

  useEffect(() => {
    const argsList = [];
    if (allowAll) argsList.push("-A");
    if (enableCors) argsList.push("--enable-cors");
    if (port) argsList.push("--port", port);
    if (servePath) argsList.push(servePath);
    setCommandArgs(argsList);
  }, [allowAll, enableCors, port, servePath]);

  const handleRunServer = async () => {
    try {
      if (!server) {
        const newServer = await command.spawn();
        setServer(newServer); // Set server state
      } else {
        console.log("already running");
      }
    } catch (error) {
      console.log("error starting the server: ", error);
    }
  };

  const handleStopServer = async () => {
    try {
      if (server) {
        console.log("stoppinng server...", server);
        await server.kill();
        setServer(null);
        console.log("Server stopped");
      } else {
        console.log("No running server");
      }
    } catch (error) {
      console.log("error stopping the server: ", error);
    }
  };

  return (
    <div className="container">
      <button onClick={startBroadcast}>Broadcast</button>
      <h1>Server</h1>
      {/* UI for inputting arguments */}
      <input
        type="text"
        value={servePath}
        onChange={(e) => setServePath(e.target.value)}
        placeholder="Serve Path"
      />
      <input
        type="text"
        value={port}
        onChange={(e) => setPort(e.target.value)}
        placeholder="Port"
      />
      <input
        type="checkbox"
        checked={enableCors}
        onChange={(e) => setEnableCors(e.target.checked)}
      />
      <label htmlFor="cors"> Enable CORS </label>
      <input
        type="checkbox"
        checked={allowAll}
        onChange={(e) => setAllowAll(e.target.checked)}
      />
      <label htmlFor="allowAll"> Allow all operations </label>

      {server ? <div>Server running...</div> : <div>Click to run server</div>}
      <button onClick={handleRunServer}>Run dufs</button>
      <button onClick={handleStopServer}>Stop dufs</button>

      <br />
      <br />
      <Client />
    </div>
  );
}

export default App;
