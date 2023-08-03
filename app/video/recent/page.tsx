import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Link from 'next/link';


export default async function Home() {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });

  const video = await db.all("SELECT * FROM video ORDER BY good");
  return (
    <div>      
      <div className='videoFrame full'>
        {video.map((i, i_) => {
            return (
              <div key={i_} className='video'>
                <Link key={i_} href={'/video/'+i.id} className='video'>
                  <div key={i_} className='thumbnail videoViewFrame'>
                    <video key={i_} src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div key={i_} className='videoDescription'>
                    <h1 key={i_} className='videoTitle'>{i.title}</h1>
                    <div key={i_} className='videoDiscription'>
                      <small key={i_}>{i.description}</small>
                      <small key={i_}>{i.view}회 시청</small>
                    </div>
                  </div>
                </Link>
              </div>
          )
          })
        }
      </div>
    </div>
  )
}
