const AWS = require('aws-sdk')
const { sendError, sendSuccess } = require('../../../helpers/http/index')
const {  USER_NOT_FOUND, GET_SUCCESS} = require('../../../helpers/http/constants')
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
      Key: `${userEmail}.${type}`, 
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    }

    try {
      const { Location } = await s3.upload(params).promise()
      location = Location
    } catch (error) {
      return sendError(res,BAD_PARAMETERS).badRequest()
    }
  }
  return location
}