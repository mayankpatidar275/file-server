import React, { useState, useEffect } from "react";
import FolderAndFiles from "./FolderAndFiles";
import FileViewer from "./FileViewer";

const ClientExplorer = ({ ip, port }) => {
  const [isFolder, setIsFolder] = useState(true);
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    // fetch(lastFetch ? lastFetch : `http://${ip}:${port}`)
    fetch(`http://${ip}:${port}`)
      .then((res) => {
        const isHTML = res.headers.get("content-type").includes("text/html");
        setIsFolder(isHTML);
        return res.text();
      })
      .then((data) => {
        setFileContent(isFolder ? "" : data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ip, port, isFolder]);

  const getFileContent = (p) => {
    fetch(`http://${ip}:${port}${p}`)
      .then((res) => res.text())
      .then((data) => {
        setFileContent(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 flex">
        <div className="w-1/3 bg-gray-200 overflow-y-auto p-4">
          <FolderAndFiles
            getFileContent={getFileContent}
            isFolder={true}
            name={"dufsRoot"}
            p={"/"}
            setFileContent={setFileContent}
            searchIp={ip}
            searchPort={port}
            // setLastFetch={setLastFetch}
          />
        </div>
        <div className="w-2/3 bg-white p-4">
          <FileViewer
            getFileContent={getFileContent}
            fileContent={fileContent}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientExplorer;
