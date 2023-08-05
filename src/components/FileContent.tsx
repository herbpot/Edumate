import React, { useState, useEffect } from "react";

export default function FileContent() {
  const [filelist, setFilelist] = useState<string[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    fetch("/src/data/etcfile") // 올바른 경로로 수정
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error fetching file list: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((files) => {
        setFilelist(files);
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  };

  const downloadFile = (filename: string) => {
    const fileURL = `/src/data/etcfile/${encodeURIComponent(filename)}`;
    fetch(fileURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle the error here, e.g., show an error message to the user
      });
  };

  if (filelist.length === 0) {
    return <div style={{ color: "white" }}>No files found.</div>;
  }

  return (
    <div className="filecontent">
      {filelist.map((filename: string, index: number) => (
        <div
          key={index}
          onClick={() => downloadFile(filename)}
          style={{ color: "white", cursor: "pointer" }}
        >
          {filename}
        </div>
      ))}
    </div>
  );
}
