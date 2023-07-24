import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

async function updateVideoGood(req:Request) {
    
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    const vid = req.headers.get('vid')
    const id = await getSession()
    
    const video = await db.get(`SELECT good FROM video where id='${vid}'`);
    // console.log(vid, id, req, video,`update video set good=${video+1} where id='${vid}'`);
    await db.exec(`insert into goods (videoId, userId) values ('${vid}', '${id?.user?.email}')`)
    await db.exec(`update video set good=${video.good+1} where id='${vid}'`)
    return new Response(null,{
        status: 206,
    })
}

export async function POST(req: Request) {
  return updateVideoGood(req)
}