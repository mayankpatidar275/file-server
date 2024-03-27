/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";

const FileViewer = ({ fileContent }) => {
  return (
    <div
      style={{
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        backgroundColor: "lightgray",
        flexGrow: "1",
        padding: "1rem",
        height: "90vh",
        overflow: "auto",
        width: "70%",
      }}
    >
      {fileContent || "File preview"}
    </div>
  );
};

export default FileViewer;
