import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest) {
 

  try {
    const credentials = Buffer.from(
      `${process.env.BILALSADASUB_USERNAME}:${process.env.BILALSADASUB_PASSWORD}`
    ).toString("base64");

    const response = await axios.post(
      `https://bilalsadasub.com/api/user`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`
        }
      }
    );

  
    return NextResponse.json(response.data);

  } catch (error:any) {
    return NextResponse.json({
      error: error.response?.data || error.message
    });
  }
}
