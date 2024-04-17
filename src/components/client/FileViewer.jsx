/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
const FileViewer = ({ fileContent }) => {
  return (
    <div className="font-mono bg-gray-100 text-gray-900 flex-grow p-4 overflow-auto">
      {fileContent || "File preview"}
    </div>
  );
};

export default FileViewer;
