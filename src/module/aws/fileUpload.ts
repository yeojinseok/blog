import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from './s3'
import axios from 'axios'

const FILE_PATH = 'post/images'

export async function uploadFile(file: File) {
  try {
    const presignedURL = await getPresignedURL(file)

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

export async function getPresignedURL(file: File) {
  const command = new PutObjectCommand({
    Bucket: 'jindolog-images',
    Key: getFilePath(file.name),
    ContentType: file.type,
  })

  try {
    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 3600,
    })
    console.log(`Presigned URL: ${presignedUrl}`)

    return presignedUrl
  } catch (err) {
    console.log('Error', err)
    throw new Error('Failed to create presigned URL')
  }
}

function getFilePath(fileName: string) {
  return `${FILE_PATH}/${fileName}.png` //확인필요
}
