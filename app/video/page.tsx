'usee server'
import { useRouter } from 'next/router'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function Video({ videoInfo }) {
  if (!videoInfo) {
    const router = useRouter();
    if (typeof window !== "undefined") {
      router.push('/404');
    }
    return null;
  }
  
  return (
    <div className="videoViewFrame">      
        <div className='videoFrame'>
        <video src={videoInfo.src} controls></video>
        <div className='videoDiscription'>
          <h1 className='videoTitle'>{videoInfo.title}</h1>
          <small className='uploaddate'>{videoInfo.date}</small>
          <small className='view'>{videoInfo.view}</small>
          <small className='good'>{videoInfo.good}</small>
        </div>
        </div>
        <div className="fileFrame">
          <div className="files"></div>
          <div className="filecontent"></div>
        </div>
      </div>
  );
}

export async function getServerSideProps(context) {
  const params = { video: context.params.video };

  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });

  const video = await db.get("SELECT * FROM video WHERE id=?", [params.video]);
  
  if (video) {
    return { props: { videoInfo: video } };

  } else {
    if (typeof window !== "undefined") {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    } else {
      return { props: {} };
    }
  }
}

export default Video;
