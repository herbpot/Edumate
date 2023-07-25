import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

async function videoinfo(req: Request){
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    
    const session = await getServerSession(authOption)

    const videos = await db.all(`SELECT * FROM video where id in (select videoId from views where userid=${session?.user?.email})`);
    
    return NextResponse.json({
        videos: videos
    })
}

export async function POST(req: Request){
    return await videoinfo(req)
}