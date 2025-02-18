import admin from "@/lib/Firebase/firebaseAdminSDKConfig";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    const auth = admin.auth();
    const {token} = await req.json();

    if (!token) {
        return NextResponse.json({error: "Token não fornecido"}, {status: 400})
    }

    try {
        const decodedToken = await auth.verifyIdToken(token)
        return NextResponse.json({success: true, decodedToken}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 401})
    }
}