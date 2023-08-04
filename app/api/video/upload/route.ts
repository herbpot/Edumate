import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });
  const data = await request.formData()
  
  const file: [File] | null = data.getAll('file') as unknown as [File]
  
  
  if (!file) {
    return NextResponse.json({ success: false })
  }
  const isVideo = request.headers.get('isVideo')
  for (let i = 0; i < file.length; i++) {
    const session = await getServerSession()
    if (session === null) return NextResponse.json({ success: false })
    const f = file[i]!;
    const bytes = await f.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const id = request.cookies.get('id')?.value
    const path = isVideo != 'true' ? `src/data/video/${id}_${f.name}` : `src/data/etcFiles/${id}_${f.name}`
    await writeFile(path, buffer)
    if (!isVideo) {
      await db.exec(`insert into etcFile(vid, src) values('${request.cookies.get('id')?.value}', '${path}')`)
    }else {
      await db.exec(`insert into video(id, title, description, src, date, view, good, uploader) values('${request.cookies.get('id')?.value}', '${request.headers.get('title')}', '${request.headers.get('description')}', '${path}', 0, 0, ${session!.user!.email})`)
    }
  }
  
  return NextResponse.json({ success: true })
}