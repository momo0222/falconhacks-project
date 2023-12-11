// WebViewerComponent.jsx
import React, { useEffect, useRef } from 'react';
import WebViewer from "@pdftron/webviewer";

const WebViewerComponent = () => {
  const viewerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    WebViewer(
      {
        path: "lib",
        initialDoc: "https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf",
      },
      viewerDiv.current as HTMLDivElement
    ).then();
  }, []);

  return <div className="webviewer" ref={viewerDiv}></div>;
};

export default WebViewerComponent;
