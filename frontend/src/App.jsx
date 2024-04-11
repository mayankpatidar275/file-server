import { useEffect, useState } from "react";
import "./styles.css";
import "./App.css";
import FolderAndFiles from "./components/FolderAndFiles";
import FileViewer from "./components/FileViewer";

export default function App() {
  const [isFolder, setIsFolder] = useState(true);

  const [fileContent, setFileContent] = useState("");

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
