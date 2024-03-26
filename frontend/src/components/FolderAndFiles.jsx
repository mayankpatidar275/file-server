import { useState, useEffect } from "react";

function FolderAndFiles({ isFolder, name, p }) {
  const [data, setData] = useState(null);
  const [expand, setExpand] = useState(false);
  // const isFile = p.includes(".");

  useEffect(() => {
    console.log("p : ", p);
    if (isFolder) {
      fetch(`http://192.168.1.35:5000${p}`)
        .then((res) => res.text())
        .then((html) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;

          const scriptTag = tempDiv.querySelector("script");

          if (scriptTag) {
            const dataScriptContent = scriptTag.textContent;
            const startIndex = dataScriptContent.indexOf("{");
            const endIndex = dataScriptContent.lastIndexOf("}") + 1;
            const dataJSON = dataScriptContent.substring(startIndex, endIndex);
            const extractedData = JSON.parse(dataJSON);
            console.log("setting data at: ", `http://192.168.0.115:5000${p}`);
            setData(extractedData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []); // Add 'p' and 'isFile' to the dependency array

  if (!isFolder) {
    return <span className="file">📄 {name}</span>;
  }

  return (
    <div>
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {name}</span>
        </div>

        {expand && (
          <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
            {data &&
              data.paths.map((item, index) => (
                <FolderAndFiles
                  key={index}
                  isFolder={item.path_type == "Dir" ? true : false}
                  name={item.name}
                  p={data.href + `${data.href == "/" ? "" : "/"}` + item.name}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderAndFiles;
