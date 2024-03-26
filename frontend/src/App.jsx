import { useEffect, useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
import explorer from "./data/folderData";
import FolderAndFiles from "./components/FolderAndFiles";

export default function App() {
  const [isFolder, setIsFolder] = useState(true);

  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  // useEffect(() => {
  //   fetch(`http://192.168.0.115:5000`)
  //     .then((res) => {
  //       // Check if the response is HTML
  //       const isHTML = res.headers.get("content-type").includes("text/html");

  //       if (isHTML) {
  //         setIsFolder(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []); // Add 'name' to the dependency array

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
      <h1>Data</h1>
      <FolderAndFiles isFolder={true} name={"dufsRoot"} p={"/"} />

      {/* for the root call we realize that the call is for the file after calling. but for other recursive calls we knew it before and can pass it as prop -> isfolder */}
    </div>
  );
}

// fix connect script in latest video
