import { useState, useEffect } from "react";

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

export default function FileContent() {
  const [filelist, setFilelist] = useState<string[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const response = await fetch("/src/data/etcfile");
    if (response.ok) {
      const files = await response.json();
      setFilelist(files);
    } else {
      console.error(
        "Error fetching file list:",
        response.status,
        response.statusText
      );
    }
  };

  if (filelist.length === 0) {
    return <div style={{ color: "white" }}>No files found.</div>;
  }

  return (
    <div className="filecontent">
      {filelist.map((filename) => (
        <div
          key={filename}
          onClick={() => downloadFile(filename)}
          style={{ color: "white", cursor: "pointer" }}
        >
          {filename}
        </div>
      ))}
    </div>
  );
}
