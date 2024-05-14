import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { Command } from "@tauri-apps/api/shell";
import { isPortAvailable } from "../../utils";

// Go to shell.js and learn how to implement
const Server = ({ servers, setServers }) => {
  // https://tauri.app/v1/api/js/shell/#restricting-access-to-the-command-apis
  // https://tauri.app/v1/guides/building/sidecar/#passing-arguments

  // arguments
  const [servePath, setServePath] = useState("/home/mayank/Documents/");
  const [port, setPort] = useState("5000");
  const [enableCors, setEnableCors] = useState(true);
  const [allowAll, setAllowAll] = useState(true);
  const [commandArgs, setCommandArgs] = useState([]);

  const command = Command.sidecar("../public/dufs", commandArgs); // sidecar also returns an instance of Command

  const setupCommandListeners = (_command, _port, _path, _newServer) => {
    _command.on("close", (data) => {
      // stopBroadcast(_newServer.pid.toString(), _port);
      console.log(
        `command finished with code ${data.code} and signal ${data.signal}`
      );
    });

    _command.on("error", (error) => {
      // stopBroadcast(_newServer.pid.toString(), _port);
      console.error(`command error: "${error}"`);
    });

    _command.stdout.on("data", (line) => {
      console.log(`command stdout: "${line}"`);
      // Check if the line contains the desired text
      if (line.includes("Listening on:")) {
        setServers((prev) => [
          ...prev,
          { server: _newServer, port: _port, path: _path },
        ]);
        startBroadcast(_newServer.pid.toString(), _port);
      }
    });

    _command.stderr.on("data", (line) => {
      // stopBroadcast(_newServer.pid.toString(), _port);
      console.log(`command stderr: "${line}"`);
    });
  };

  const startBroadcast = async (instance_name, port) => {
    // Start broadcasting
    // Convert port to u16
    const port_number = parseInt(port, 10);
    try {
      await invoke("start_broadcasting", {
        instanceName: instance_name,
        port: port_number,
      });
      console.log("Broadcasting started");
    } catch (error) {
      console.error("Error starting broadcasting:", error);
    }
  };

  const stopBroadcast = async (instance_name, port) => {
    // Stop broadcasting
    const port_number = parseInt(port, 10);
    try {
      await invoke("stop_broadcasting", {
        instanceName: instance_name,
        port: port_number,
      });
      console.log("Broadcasting stoped");
    } catch (error) {
      console.error("Error stoping broadcasting:", error);
    }
  };

  const startDiscovering = async () => {
    try {
      console.log("discovering...");
      const discoveredServices = await invoke("start_discovering");
      console.log("Discovered services:", discoveredServices);
      // Handle the discovered services here
    } catch (error) {
      console.error("Error starting discovery:", error);
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

  const handleRunServer = async (_servers, _port, _path) => {
    try {
      // isPortAvailable check is not necceassary, instead check using the output of newServer
      // console.log("servers: ", _servers);
      if (isPortAvailable(_servers, _port)) {
        console.log("starting new server...");
        const newServer = await command.spawn();
        console.log(newServer);
        setupCommandListeners(command, _port, _path, newServer);
        // setServers((prev) => [
        //   ...prev,
        //   { server: newServer, port: _port, path: _path },
        // ]);
        // startBroadcast();
      } else {
        console.log("already running");
      }
    } catch (error) {
      console.log("error starting the server: ", error);
    }
  };

  const handleStopServer = async (pid) => {
    try {
      if (pid) {
        console.log("stoppinng server...");
        const arr = [];
        servers?.forEach((item) => {
          if (item.server.pid != pid) arr.push(item);
          else item.server.kill();
        });
        setServers(arr);
        console.log("Server stopped");
      } else {
        console.log("No running server");
      }
    } catch (error) {
      console.log("error stopping the server: ", error);
    }
  };

  useEffect(() => {
    console.log("servers: ", servers);
  }, [servers]);

  return (
    <>
      {servers.length > 0 ? (
        <div className="w-screen mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <ul>
            {servers?.map((item, index) => (
              <li
                key={item?.server?.pid}
                className={`flex items-center justify-between mb-4 ${
                  index !== servers.length - 1
                    ? "border-b border-gray-200 pb-4"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <p className="text-base text-green-600 mr-2">Serving:</p>
                  <p className="text-base text-gray-900 font-semibold">
                    {item?.path}
                  </p>
                  <div className="w-4"></div> {/* Add a gap */}
                  <p className="text-base text-gray-600 mx-2">at port</p>
                  <p className="text-base text-gray-900 font-semibold">
                    {item?.port}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleStopServer(item.server.pid);
                  }}
                  className="text-white py-2 px-4 rounded-md  focus:outline-none flex items-center"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-screen mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center text-gray-600">
          No server running
        </div>
      )}
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
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
            id="allowAll"
            checked={allowAll}
            onChange={(e) => setAllowAll(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowAll" className="font-semibold">
            Allow all operations
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              startDiscovering();
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            discover Server
          </button>
          <button
            onClick={() => {
              handleRunServer(servers, port, servePath);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Run Server
          </button>
        </div>
      </div>
    </>
  );
};

export default Server;
