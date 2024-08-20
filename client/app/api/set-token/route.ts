import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if(token){
        const response = NextResponse.redirect(`${process.env.CLIENT_URL}/dashboard`);
        response.cookies.set("token", token, {
            httpOnly:true,
            secure:false,
            expires:new Date(Date.now()+1000*60*60*24*7),
            // sameSite:"none",
            // path:"/",
        });
        return response;
    }
    return NextResponse.redirect(`${process.env.CLIENT_URL}`);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}