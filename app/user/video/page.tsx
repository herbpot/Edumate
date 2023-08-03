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
            {video.map((i: Video, i_:number) => {
            return (
              <div key={i_} className='video'>
                <Link key={i_} href={'/user/video/'+i.id} className='video'>
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
    )
}