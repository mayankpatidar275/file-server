/* eslint-disable react/prop-types */

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// import { useState, useEffect } from "react";
const FileViewer = ({ fileUri }) => {
  const docs = [
    {
      uri: fileUri,
    },
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return (
    <div className="font-mono bg-gray-100 text-gray-900 flex-grow p-5 h-[70vh] overflow-y-auto overflow-auto">
      <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
    </div>
  );
};

export default FileViewer;
