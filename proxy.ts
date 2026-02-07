import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./helpers/jwt";


interface CustomNextRequest extends NextRequest {
  user: any;
}

export async function proxy(req: CustomNextRequest) {
  const token: any = req.cookies.get("token")?.value;

  // if there's no token
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      // redirect to home page
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  try {
    const decoded: any = await verifyJwt(token);


    if (decoded) {
      console.log(decoded)
      if (req.nextUrl.pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      req.headers.set("user", JSON.stringify(decoded));

      return NextResponse.next();
    } else {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const response = NextResponse.next();
        response.cookies.delete("token");

        if (req.nextUrl.pathname.startsWith("/api/")) {
          return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
          );
        }

        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
  } catch (error) {}

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // updated to match all pages
};