import { useState, useEffect } from "react";

const FileViewer = ({ fileUri }) => {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const name = fileUri.substring(fileUri.lastIndexOf("/") + 1);
    setFileName(name);
  }, [fileUri]);

  return (
    <div className="font-mono bg-gray-100 text-gray-900 flex-grow p-5 h-[80vh] overflow-y-auto">
      <div className="mb-3">
        <h2 className="text-lg font-bold">{fileName}</h2>
      </div>

      <iframe
        src={fileUri}
        className="h-[95%] w-full border-none"
        title="File Preview"
      />
    </div>
  );
};

export default FileViewer;

// import { useEffect, useRef } from "react";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// const FileViewer = ({ fileUri }) => {
//   const containerRef = useRef(null); // Ref on the wrapping div

//   const docs = [
//     {
//       uri: fileUri,
//     },
//   ];

//   useEffect(() => {
//     // Check if the container is rendered
//     if (containerRef.current) {
//       console.log(containerRef.current);
//       const noRendererElement =
//         containerRef.current.querySelector("#no-renderer");
//       const downloadButton = containerRef.current.querySelector(
//         "#no-renderer-download"
//       );

//       // If the element with id 'no-renderer' exists, modify its content and styling
//       if (noRendererElement) {
//         console.log("no renderer element: ", noRendererElement);
//         // Hide the download button
//         if (downloadButton) {
//           downloadButton.style.display = "none"; // Hide the download button
//         }

//         // Change the text and style of the no-renderer div
//         noRendererElement.textContent =
//           "This file cannot be previewed, please download it manually.";
//         noRendererElement.style.color = "red"; // Change text color
//         noRendererElement.style.fontSize = "18px"; // Change font size
//         noRendererElement.style.padding = "10px"; // Add padding
//         noRendererElement.style.border = "2px solid red"; // Add border
//       }
//       console.log("ref after modificaitno: ", containerRef.current);
//     }
//   }, [fileUri]);

//   return (
//     <div className="font-mono bg-gray-100 text-gray-900 flex-grow p-5 h-[80vh] overflow-y-auto overflow-auto">
//       <div ref={containerRef}>
//         <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
//       </div>
//     </div>
//   );
// };

// export default FileViewer;
