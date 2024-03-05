import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";

function App() {
  const command = Command.sidecar("../public/dufs");

  // const command = new Command('node');
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
  });
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => console.log(`command stdout: "${line}"`));
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));

  const handleButtonClick = async () => {
    try {
      const output = await command.execute();
      console.log("output: ", output);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="container">
      <button onClick={handleButtonClick}>Run dufs</button>
    </div>
  );
}

export default App;
