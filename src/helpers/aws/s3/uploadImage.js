const AWS = require('aws-sdk')
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env

module.exports.uploadImage = async (base64, userEmail) => {
  AWS.config.setPromisesDependency(require('bluebird'))
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION })

  const s3 = new AWS.S3()

  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  const type = base64.split(';')[0].split('/')[1]

  if (type === "png" || type === "jpg" || type === "jpeg") {
    const params = {
      Bucket: S3_BUCKET,
      Key: `${userEmail}.${type}`, // type is not required
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}` // required. Notice the back ticks
    }

    try {
      const { Location } = await s3.upload(params).promise()
      location = Location
    } catch (error) {
        // console.log(error)
    }
  }
  return location
}