import { client } from "@/sanity/sanityClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const postID = searchParams.get("postID");

  const post = await client.fetch(`*[_type == "post" && _id == "${postID}"]`);

  return NextResponse.json({ post });
}
