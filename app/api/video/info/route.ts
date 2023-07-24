import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

async function videoinfo(req: Request){
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    
    const id = req.headers.get('id__')
    // console.log(req.headers);
    
    const video = await db.get(`select * from video where id=${id}`)
    // console.log(video);
    
    return NextResponse.json({
        title: video.title,
        src: video.src,
        date: video.date,
        view: video.view,
        good: video.good,
    })
}

export async function POST(req: Request){
    return await videoinfo(req)
}