import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as mime from 'mime-types'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY as string,
  },
  region: 'ap-northeast-2',
})

// export const uploadImage = (imageFile: File) => {
//   const upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: 'jindolog-images',
//       Key: imageFile.name,
//       Body: imageFile,
//     },
//   })
//   const promise = upload.promise()

//   promise.then()
// }

export async function uploadFile(file: File) {
  console.log(process.env.NEXT_PUBLIC_SECRETACCESSKEY, '??')
  const uploadParams = {
    Bucket: 'jindolog-images',
    Key: file.name,
    Body: file,
    ContentType: mime.lookup(file.type) as string,
  }

  const res = await s3.send(new PutObjectCommand(uploadParams))
  return res.$metadata.httpStatusCode
}
