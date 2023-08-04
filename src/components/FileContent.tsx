import { useRouter } from "next/router";
import { ReactElement } from "react";

const downloadModifiedFile = (filename: string = "test") => {
  fetch("/src/data/etcfile/" + filename)
    .then((res) => res.blob())
    .then((b) => {
      const url = URL.createObjectURL(b);
      window.open(url);
    });
};

export default function FileContent({ id }: { id: string }) {
  const filelist: ReactElement[] = [];

  fetch("http://localhost:3000/api/video/etcfile", {
    method: "POST",
    headers: {
      id__: id,
    },
  })
    .then((res) => res.json())
    .then((j) => {
      console.log(j);
      j.files.map((f: string) => {
        filelist.push(
          <div key={f} onClick={() => downloadModifiedFile(f)}>
            {f}
          </div>
        );
      });
    });

  return (
    <div className="filecontent">
      {filelist}
      <div onClick={() => downloadModifiedFile()}>{"test"}</div>
    </div>
  );
}
