import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client } from './s3'
import axios from 'axios'

export const FILE_PATH = 'post/images'

export async function uploadFile(file: File, postID: string) {
  try {
    const presignedURL = await getPresignedURL(file, postID)

    await axios.put(presignedURL, file, {
      headers: {
        'Content-Type': file.type,
      },
    })

    return presignedURL.split('?')[0]
  } catch (err) {
    throw new Error(`${err}`)
  }
}

export async function getPresignedURL(file: File, postID: string) {
  const command = new PutObjectCommand({
    Bucket: 'jindolog-images',
    Key: `${FILE_PATH}/${postID}/${file.name}`,
    ContentType: file.type,
  })

  try {
    const presignedUrl = await getSignedUrl(S3Client, command, {
      expiresIn: 3600,
    })

    return presignedUrl
  } catch (err) {
    console.log('Error', err)
    throw new Error('Failed to create presigned URL')
  }
}
