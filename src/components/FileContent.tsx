import { useState, useEffect } from "react";

const downloadModifiedFile = (filename: string = "test") => {
  fetch("/src/data/etcfile/" + filename)
    .then((res) => res.blob())
    .then((b) => {
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank"; // Open the link in a new tab
      a.click();
      URL.revokeObjectURL(url);
    });
};

export default function FileContent({ id }: { id: string }) {
  const [filelist, setFilelist] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/video/etcfile", {
      method: "POST",
      headers: {
        id__: id,
      },
    })
      .then((res) => res.json())
      .then((j) => {
        console.log(j);
        const fileListElements = j.files.map((f: string) => (
          <div key={f} onClick={() => downloadModifiedFile(f)}>
            {f}
          </div>
        ));
        setFilelist(fileListElements);
      });
  }, [id]);

  return (
    <div className="filecontent">
      {filelist === null ? (
        <div>Loading file list...</div>
      ) : (
        <>
          {filelist}
          <div
            onClick={() => downloadModifiedFile()}
            style={{ color: "white" }}
          >
            test
          </div>
        </>
      )}
    </div>
  );
}
