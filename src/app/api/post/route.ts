import { FILE_PATH } from '@/module/aws/fileUpload'
import { S3Client, S3Object } from '@/module/aws/s3'
import { client } from '@/sanity/sanityClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()

  const s3Data = await S3Object.listObjectsV2({
    Bucket: 'jindolog-images',
    Prefix: `${FILE_PATH}/${res.postID}`,
  }).promise()

  const thumbnailURL = `https://jindolog-images.s3.ap-northeast-2.amazonaws.com/${s3Data.Contents?.[0].Key}`

  const postData = {
    _type: 'post',
    ...res,
    thumbnailURL,
  }

  const response = await client.create(postData)
  return NextResponse.json({ response })
}
