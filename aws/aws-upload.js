var aws = require('aws-sdk'),
  request = require('request'),
  fs = require('fs');

var awsS3 = new aws.S3({
  signatureVersion: 'v4',
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-west-1'
});

var s3Params = {
  Bucket: 'mahrio-iot',
  Expires: 60,
  ACL: 'public-read'
};

module.exports = function( dataObj, callback ){
  awsS3.Key = dataObj.filename;

  awsS3.getSignedUrl('putObject', s3Params, function(err, data){
    if( err ){ console.log('AWS SignedURL Error'); return; }

    console.log('AWS SIGNED URL: ', data);

    var req = request({
      method: 'put',
      url: data,
      headers: { 'x-amz-acl': 'public-read', 'Content-Type': undefined }
    }, function (err, resp, body) {
      if (err) {
        console.log('Error!');
      } else {
        callback();
      }
    });
    var form = req.form();
    form.append('file', fs.createReadStream(dataObj.filepath));
  });
};