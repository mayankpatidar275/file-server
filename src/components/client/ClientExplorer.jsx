import React, { useState, useEffect } from "react";
import FolderAndFiles from "./FolderAndFiles";
import FileViewer from "./FileViewer";

const ClientExplorer = ({ ip, port }) => {
  const [isFolder, setIsFolder] = useState(true);
  const [fileContent, setFileContent] = useState("");
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  const [filePath, setFilePath] = useState("/");

  useEffect(() => {
    // fetch(lastFetch ? lastFetch : `http://${ip}:${port}`)
    if (ip && port) {
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
          setIsFetchFailed(true);
          console.error("Error fetching data:", error);
        });
    } else {
      console.log("ip or port not found");
    }
  }, [ip, port, isFolder]);

  // const getFileContent = (p) => {
  //   fetch(`http://${ip}:${port}${p}`)
  //     .then((res) => res.text())
  //     .then((data) => {
  //       setFileContent(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  return (
    <div className="flex flex-col   bg-gray-50">
      {!ip && !port && (
        <div className="flex justify-center items-center bg-white text-gray-500 h-40">
          No server selected
        </div>
      )}
      {ip && port ? (
        !isFetchFailed ? (
          <div className="flex-1 flex">
            <div className="w-1/3 bg-gray-200 h-[80vh] overflow-y-auto p-4">
              <FolderAndFiles
                // getFileContent={getFileContent}
                isFolder={true}
                name={`Explore ${ip}:${port}`}
                p={filePath}
                setFileContent={setFileContent}
                searchIp={ip}
                searchPort={port}
                setFilePath={setFilePath}
                // setLastFetch={setLastFetch}
              />
            </div>
            <div className="w-2/3 bg-white ">
              {filePath !== "/" ? (
                <FileViewer fileUri={`http://${ip}:${port}${filePath}`} />
              ) : (
                <div className="flex justify-center items-center h-[80vh]">
                  No file selected
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen  ">
            No response
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ClientExplorer;
