import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { format } from "util";

function datedecode(date: string){
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return [year, month, day]
}

async function videoinfo(req: Request){
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    
    const id = req.headers.get('id__')

    const video = await db.all(`select * from video where uploader='${id}'`)
    console.log(`select * from video where uploader='${id}'`);
    
    return NextResponse.json({
        video: video
    })
}

export async function POST(req: Request){
    return await videoinfo(req)
}