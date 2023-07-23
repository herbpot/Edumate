import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { notFound } from 'next/navigation';

export default async function Video({ params }) {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });
  
  try{
    const video = await db.get(`SELECT * FROM video where id=${params.id}`);
    return (
      <div className="videoViewFrame">
        <div className="videoFrame">
          <video src={'/api/video?fileName='+video.src} controls></video>
          <div className="videoDiscription">
            <h1 className="videoTitle">{video.title}</h1>
            <small className="uploaddate">{video.date}</small>
            <small className="view">{video.view}</small>
            <small className="good">{video.good}</small>
          </div>
        </div>
        <div className="fileFrame">
          <div className="files"></div>
          <div className="filecontent"></div>
        </div>
      </div>
    );
  }catch{
    notFound()
  }
}
