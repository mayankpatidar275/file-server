import { useState, useEffect } from "react";

function FolderAndFiles({
  // getFileContent,
  isFolder,
  name,
  p,
  setFileContent,
  searchIp,
  searchPort,
  setFilePath,
  // setLastFetch,
}) {
  const [data, setData] = useState(null);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (isFolder) {
      fetch(`http://${searchIp}:${searchPort}${p}`)
        .then((res) => res.text())
        .then((html) => {
          // setLastFetch(`http://${searchIp}:${searchPort}${p}`);
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;

          const scriptTag = tempDiv.querySelector("script");

          if (scriptTag) {
            const dataScriptContent = scriptTag.textContent;
            const startIndex = dataScriptContent.indexOf("{");
            const endIndex = dataScriptContent.lastIndexOf("}") + 1;
            const dataJSON = dataScriptContent.substring(startIndex, endIndex);
            const extractedData = JSON.parse(dataJSON);
            setData(extractedData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [p, isFolder]);

  if (!isFolder) {
    return (
      <span
        // onClick={() => getFileContent(p)}
        onClick={() => setFilePath(p)}
        className="cursor-pointer inline-block text-gray-800 hover:text-blue-500"
      >
        📄 {name}
      </span>
    );
  }

  return (
    <div>
      <div className="mt-2">
        <div
          onClick={() => setExpand(!expand)}
          className="cursor-pointer flex items-center text-gray-800 hover:text-blue-500"
        >
          <span className="mr-2">📁</span>
          <span>{name}</span>
        </div>

        {expand && (
          <div className="pl-4">
            {data &&
              data.paths.map((item, index) => (
                <FolderAndFiles
                  key={index}
                  // getFileContent={getFileContent}
                  isFolder={item.path_type === "Dir"}
                  name={item.name}
                  p={data.href + (data.href === "/" ? "" : "/") + item.name}
                  setFileContent={setFileContent}
                  searchIp={searchIp}
                  searchPort={searchPort}
                  setFilePath={setFilePath}
                  // setLastFetch={setLastFetch}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderAndFiles;
