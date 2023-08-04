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

export default function FileContent({ name }: { name: string }) {
    return (
        <div key={Math.random()} id={name} className="etcfile" onClick={() => downloadModifiedFile(name)}> 
            <h3 key={Math.random()}>{name}</h3>
        </div>
    );
}
