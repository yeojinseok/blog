import AWS from 'aws-sdk'

AWS.config.update({
  region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:09c0caef-e76d-44d6-add8-698a26348532', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
  }),
})

export const uploadImage = (imageFile: File) => {
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'jindolog-images',
      Key: imageFile.name,
      Body: imageFile,
    },
  })
  const promise = upload.promise()

  promise.then()
}
