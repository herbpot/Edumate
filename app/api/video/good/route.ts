import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getServerSession } from 'next-auth';
import { authOption } from '../../auth/[...nextauth]/route';

async function updateVideoGood(req:Request) {
    
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    const vid = req.headers.get('vid')
    const session = await getServerSession(authOption)
    console.log(session);
    
    
    const video = await db.get(`SELECT good FROM video where id='${vid}'`);
    const g = await db.get(`select * from goods where videoid=${vid} and userId='${session?.user?.email}'`)
    if (g === undefined){
        await db.exec(`insert into goods (videoId, userId) values ('${vid}', '${session?.user?.email}')`)
        await db.exec(`update video set good=${video.good+1} where id='${vid}'`)
    }
    return new Response(null,{
        status: 206,
    })
}

export async function POST(req: Request) {
  return updateVideoGood(req)
}