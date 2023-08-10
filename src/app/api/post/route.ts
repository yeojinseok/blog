import { FILE_PATH } from '@/module/aws/fileUpload'
import { S3Object } from '@/module/aws/s3'
import { client } from '@/sanity/sanityClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()

  const s3Data = await S3Object.listObjectsV2({
    Bucket: 'jindolog-images',
    Prefix: `${FILE_PATH}/${res.postID}`,
  }).promise()

  const thumbnailURL =
    s3Data.Contents?.[0] != null
      ? `https://jindolog-images.s3.ap-northeast-2.amazonaws.com/${s3Data.Contents?.[0].Key}`
      : '/profile.JPG'

  const postData = {
    _type: 'post',
    ...res,

    thumbnailURL,
  }

  res.tags.forEach((tag: string) => {
    const tagData = {
      _type: 'tag',
      name: tag,
    }
    client.create(tagData)
  })

  const response = await client.create(postData)
  return NextResponse.json({ response })
}
