import { S3Client } from '@aws-sdk/client-s3'

export const S3 = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESSKEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRETACCESSKEY as string,
  },
  region: 'ap-northeast-2',
})
