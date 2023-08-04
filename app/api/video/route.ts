import * as fs from 'fs'
import { getServerSession } from "next-auth";
import { authOption } from '../auth/[...nextauth]/route';
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const CHUNK_SIZE_IN_BYTES = 1000000

async function getVideoStream(req:Request) {
  const range = req.headers.get('range')

  if (!range) {
    return new Response('No Range is provieded', { status: 400} )
  }
  const path = 'src/data/video/'+req.url.split('fileName')[1].replace('=','')
  const b = fs.statSync(path).size
  const chunkStart = Number(range.replace(/\D/g, ''))
  const chunkEnd = Math.min(chunkStart+ CHUNK_SIZE_IN_BYTES, b - 1)
  const contentLength = chunkEnd - chunkStart + 1  

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${b}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength.toString(),
    'Content-Type': 'video/mp4'
  } as { [key: string]: string}

  const stream = fs.createReadStream(path, {
    start: chunkStart,
    end: chunkEnd
  })
  if (chunkEnd == b-1){
    const db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database,
    });
    const session = await getServerSession(authOption)
    const id = path.split('_')[0].split('/')[3]
    const view = await db.get(`select view from video where id='${id}'`)
    if (session !== null){
        const views = await db.get(`select * from views where videoid='${id}' and userId='${session?.user?.email}'`)
        if (views === undefined){
            await db.exec(`insert into views (videoId, userId) values('${id}', '${session?.user?.email}')`)
        }
    }
    await db.exec(`update video set view='${view!.view+1}' where id='${id}'`)
    
  }
  return new Response(stream as any, {
    status: 206,
    headers
  })
}

export async function GET(req: Request) {
  return getVideoStream(req)
}