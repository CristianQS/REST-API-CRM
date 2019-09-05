const AWS = require('aws-sdk')
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env

module.exports.deleteImage = async (url) => {
  AWS.config.setPromisesDependency(require('bluebird'))
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION })

  const s3 = new AWS.S3()

  const params = {
    Bucket: S3_BUCKET,
    Key: url
  }
 
  await s3.deleteObject(params,function (err, data) {
    if (err) {
        console.log(err, err.stack)
        return next(err);
    }
  })

}