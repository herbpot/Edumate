'use client'
import { Video } from '@/app/api/video/info/route';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function Home() {
  const [video, setVideo] = useState<[Video]>([] as unknown as [Video])
  useEffect(() => {
    fetch('http://localhost:3000/api/videos/like',{
      method: 'POST',
      next: {
        revalidate: 10,
      }
    }).then((res) => res.json().then((j) => setVideo(j.videos)))

  }, [])
  return (
    <div>      
      <div className='videoFrame full'>
        {video.map((i: Video, i_) => {
            return (
              <div key={Math.random()} className='video'>
                <Link key={Math.random()}href={'/video/'+i.id} className='video'>
                  <div key={Math.random()} className='thumbnail videoViewFrame'>
                    <video key={Math.random()} src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div key={Math.random()} className='videoDescription'>
                    <h1 key={Math.random()} className='videoTitle'>{i.title}</h1>
                    <div key={Math.random()} className='videoDiscription'>
                      <small key={Math.random()}>{i.description}</small>
                      <small key={Math.random()}>{i.view}회 시청</small>
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
