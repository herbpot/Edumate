import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOption } from "../../api/auth/[...nextauth]/route";
import { Video } from "@/app/api/video/info/route";
import maxstring from "@/src/ts/Maxstring";

export default async function video() {
  const session = await getServerSession(authOption)
  const video = await fetch('http:localhost:3000/api/user/info',{
    method: 'POST',
    headers: {
      id__: session?.user?.email!
    },
    next: {
      revalidate: 10,
    }
  }).then(async(res) => {
    
    const v = await res.json()
    return v.video!
  });
  
  return (
    <div>
      <div className='videoFrame full'>
        {video.map((i: Video, i_:number) => {

          return (
          <div key={Math.random()} className='video'>
            <Link key={Math.random()} href={'/user/video/'+i.id} className='video'>
              <div key={Math.random()} className='thumbnail videoViewFrame'>
                <video key={Math.random()} src={'/api/video?fileName='+i.src}></video>
              </div>
              <div key={Math.random()} className='videoDescription'>
                <h1 key={Math.random()} className='videoTitle'>{maxstring(i.title,5)}</h1>
                <div key={Math.random()} className='videoDiscription'>
                  <small key={Math.random()}>{maxstring(i.description,15)}</small>
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