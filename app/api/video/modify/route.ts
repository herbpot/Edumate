import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { writeFile, rm } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });
  const isVideo = request.headers.get('isVideo')

  const data = await request.formData()
  if (isVideo){
    console.log(`update video set title='${data.get('title')}', description='${data.get('description')}', tag='${data.get('tag')}' where id='${request.cookies.get('id')!.value}'`);
    
    await db.exec(`update video set title='${data.get('title')}', description='${data.get('description')}', tag='${data.get('tag')}' where id='${request.cookies.get('id')!.value}'`)
  }else{
  
    const file: [File] | null = data.getAll('file') as unknown as [File]
        
    if (!file) {
      return NextResponse.json({ success: false })
    }
    for (let i = 0; i < file.length; i++) {
      const f = file[i]!;
      const bytes = await f.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = request.cookies.get('id')?.value
      const path = `src/data/etcFiles/${filename}_${f.name}`
      await writeFile(path, buffer)
      await db.exec(`insert into etcFile(vid, src) values('${request.cookies.get('id')?.value}', '${path}')`)
    }

    if (request.headers.get('remove')){
      const rmlsit: [string] | null = data.getAll('rmlist') as unknown as [string]
      for (let i = 0; i < rmlsit.length; i++) {
        await rm(rmlsit[i]);
      }
    }
  }
  return NextResponse.json({ success: true })
}
  