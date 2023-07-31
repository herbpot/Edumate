import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { format } from "util";

async function videoinfo(req: Request){
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    
    const id = req.headers.get('id__')
    const session = await getServerSession(authOption)
    if (session === undefined) notFound()

    const files = await db.all(`select src from etcFile where vid='${id}'`)
    
    return NextResponse.json({
        files: files.map((f) => (f.src as string).split('/')[3])
    })
}

export async function POST(req: Request){
    return await videoinfo(req)
}