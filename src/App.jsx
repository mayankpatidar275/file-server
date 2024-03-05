import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";

// Go to shell.js and learn how to implement
function App() {
  const [runServerErr, setRunServerErr] = useState(null);
  const [runServerStdout, setRunServerStdout] = useState(null);
  const [runServerStderr, setRunServerStderr] = useState(null);
  const command = Command.sidecar("../public/dufs"); // sidecar also returns an instance of Command
  const [server, setServer] = useState(null);

  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
  });
  command.on("error", (error) => {
    console.error(`command error: "${error}"`);
    setRunServerErr(error);
  });
  command.stdout.on("data", (line) => {
    console.log(`command stdout: "${line}"`);
    setRunServerStdout(line);
  });
  command.stderr.on("data", (line) => {
    console.log(`command stderr: "${line}"`);
    setRunServerStderr(line);
  });

  const handleRunServer = async () => {
    try {
      if (!server) {
        console.log("server: ", server);
        const newServer = await command.spawn();
        setServer(newServer); // Set server state
        console.log("server running: ", newServer);
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
      {server ? <div>Server running...</div> : <div>Click to run server</div>}
      <button onClick={handleRunServer}>Run dufs</button>
      <button onClick={handleStopServer}>Stop dufs</button>
      <div>
        {/* {runServerErr && <div>{runServerErr}</div>}
        {runServerStderr && <div>{runServerStderr}</div>}
        {runServerStdout && <div>{runServerStdout}</div>} */}
      </div>
    </div>
  );
}

export default App;
