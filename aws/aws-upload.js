var aws = require('aws-sdk'),
  fs = require('fs');

var awsS3 = new aws.S3({
  signatureVersion: 'v4',
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-west-1'
});

module.exports = function( dataObj, callback ){
  var params = {
    Bucket: 'mahrio-iot',
    Key: dataObj.filename,
    Body: fs.createReadStream(dataObj.filepath),
    ACL: 'public-read'
  };

  awsS3.putObject( params, function(err, data){
    if( err ){
      console.log(err);
    }
    var uri = "https://s3-us-west-1.amazonaws.com/mahrio-iot/";
    callback( uri+encode(dataObj.filename) );
  });
};