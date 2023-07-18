import { S3Client as S3_Client } from '@aws-sdk/client-s3'
import { S3 } from 'aws-sdk'

export const S3Client = new S3_Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESSKEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRETACCESSKEY as string,
  },
  region: 'ap-northeast-2',
})

export const S3Object = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESSKEY as string,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRETACCESSKEY as string,
  region: 'ap-northeast-2',
})
