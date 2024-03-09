import { useState } from "react";
import "./App.css";
import d from "../public/data.json";

function App() {
  const [data, setData] = useState(import.meta.env.DEV ? d : DATA);
  console.log("data inside frontend App.jsx: ", data);
  return <div>data: </div>;
}

export default App;
