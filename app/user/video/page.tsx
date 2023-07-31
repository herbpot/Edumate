import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOption } from "../../api/auth/[...nextauth]/route";
import { Video } from "@/app/api/video/info/route";

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
            {video.map((i: Video) => {
            return (
              <div className='video'>
                <Link href={'/user/video/'+i.id} className='video'>
                  <div className='thumbnail videoViewFrame'>
                    <video src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div className='videoDescription'>
                    <h1 className='videoTitle'>{i.title}</h1>
                    <div className='videoDiscription'>
                      <small>{i.description}</small>
                      <small>{i.view}회 시청</small>
                    </div>
                  </div>
                </Link>
              </div>
          )
          })
        }
        </div>
    )
}