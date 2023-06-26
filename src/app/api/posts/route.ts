import { client } from "@/sanity/sanityClient";
import { NextResponse } from "next/server";

export async function GET() {
  const post = await client.fetch(`*[_type == "post"]`);

  return NextResponse.json({ post });
}
