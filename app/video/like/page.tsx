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
              <div key={i_} className='video'>
                <Link key={i_}href={'/video/'+i.id} className='video'>
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
