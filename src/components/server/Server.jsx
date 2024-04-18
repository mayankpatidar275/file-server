import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { Command } from "@tauri-apps/api/shell";

// Go to shell.js and learn how to implement
const Server = () => {
  // https://tauri.app/v1/api/js/shell/#restricting-access-to-the-command-apis
  // https://tauri.app/v1/guides/building/sidecar/#passing-arguments

  const [server, setServer] = useState(null);

  // arguments
  const [servePath, setServePath] = useState("/home/mayank/Documents/");
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
      await invoke("start_broadcasting");
      console.log("Broadcasting started");
    } catch (error) {
      console.error("Error starting broadcasting:", error);
    }
  };

  const stopBroadcast = async () => {
    // Stop broadcasting
    try {
      await invoke("stop_broadcasting");
      console.log("Broadcasting stoped");
    } catch (error) {
      console.error("Error stoping broadcasting:", error);
    }
  };

  const startDiscovering = async () => {
    // Start discovering
    try {
      await invoke("start_discovering");
      console.log("Discovering started");
    } catch (error) {
      console.error("Error starting discovering:", error);
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={startBroadcast}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Start Broadcast
      </button>
      <button
        onClick={stopBroadcast}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Stop Broadcast
      </button>
      <button
        onClick={startDiscovering}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Start Discovering
      </button>
      <h1 className="text-2xl font-bold mb-4">Server Setup</h1>

      <div className="mb-4">
        <label htmlFor="servePath" className="block font-semibold mb-2">
          Serve Path
        </label>
        <input
          type="text"
          value={servePath}
          onChange={(e) => setServePath(e.target.value)}
          placeholder="Serve Path"
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="port" className="block font-semibold mb-2">
          Port
        </label>
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          id="cors"
          checked={enableCors}
          onChange={(e) => setEnableCors(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="cors" className="font-semibold">
          Enable CORS
        </label>
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          id="allowAll"
          checked={allowAll}
          onChange={(e) => setAllowAll(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="allowAll" className="font-semibold">
          Allow all operations
        </label>
      </div>

      <div className="mb-4">
        {server ? <div>Server running...</div> : <div>Click to run server</div>}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleRunServer}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Run Server
        </button>
        <button
          onClick={handleStopServer}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Stop Server
        </button>
      </div>
    </div>
  );
};

export default Server;
