import { useEffect, useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
import "./App.css";
import explorer from "./data/folderData";
import FolderAndFiles from "./components/FolderAndFiles";
import FileViewer from "./components/FileViewer";

export default function App() {
  const [isFolder, setIsFolder] = useState(true);

  const [fileContent, setFileContent] = useState("");

  // const [explorerData, setExplorerData] = useState(explorer);

  // const { insertNode } = useTraverseTree();

  // const handleInsertNode = (folderId, item, isFolder) => {
  //   const finalTree = insertNode(explorerData, folderId, item, isFolder);
  //   setExplorerData(finalTree);
  // };

  function getFileContent(p) {
    console.log("getFileContent called: ");
    fetch(`http://192.168.0.115:5000${p}`)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        // console.log("file content: ", data);
        setFileContent(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetch(`http://192.168.0.115:5000`)
      .then((res) => {
        // Check if the response is HTML
        const isHTML = res.headers.get("content-type").includes("text/html");

        if (isHTML) {
          setIsFolder(true);
        }
        return res.text();
      })
      .then((data) => {
        // console.log(data);
        if (!isFolder) setFileContent(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Add 'name' to the dependency array

  return (
    <div className="App">
      {/* <Folder handleInsertNode={handleInsertNode} explorer={explorerData} /> */}

      <div className="main-container">
        <div className="side-explorer">
          <FolderAndFiles
            getFileContent={getFileContent}
            isFolder={true}
            name={"dufsRoot"}
            p={"/"}
            setFileContent={setFileContent}
          />
        </div>
        <FileViewer getFileContent={getFileContent} fileContent={fileContent} />
      </div>
    </div>
  );
}

// fix connect script in latest video
