// // pages/_middleware.js (for Next.js 12) or middleware.js (for Next.js 13+)
// import { NextResponse } from 'next/server'

// export function middleware(request) {
//     const basicAuth = request.headers.get('authorization')

//     if (basicAuth) {
//         const authValue = basicAuth.split(' ')[1]
//         const [user, pwd] = atob(authValue).split(':')

//         // Change these credentials
//         if (user === 'admin' && pwd === 'password123') {
//             return NextResponse.next()
//         }
//     }

//     return new NextResponse(null, {
//         status: 401,
//         headers: {
//             'WWW-Authenticate': 'Basic realm="Restricted Content"'
//         }
//     })
// }

// export const config = {
//     matcher: ['/:path*']
// }

import { NextResponse } from "next/server";

export function middleware(req) {
    const authHeader = req.headers.get("authorization");

    // Set username & password
    const validUsername = "yourUsername";
    const validPassword = "yourPassword";

    if (!authHeader) {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Secure Area"',
            },
        });
    }

    const encodedCreds = authHeader.split(" ")[1];
    const decodedCreds = Buffer.from(encodedCreds, "base64").toString();
    const [username, password] = decodedCreds.split(":");

    if (username !== validUsername || password !== validPassword) {
        return new Response("Forbidden", { status: 403 });
    }

    return NextResponse.next();
}
