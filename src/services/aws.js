// Load the SDK para JavaScript
import AWS from 'aws-sdk';
// Set the Region
AWS.config.update({ region: 'sa-east-1' });

const s3 = new AWS.S3();
const bucketName = process.env.MARVEL_BUCKET_NAME;

const publicParams = {
  Bucket: bucketName,
  Key: process.env.MARVEL_PUBLIC_KEY_FILE_NAME,
};

const privateParams = {
  Bucket: bucketName,
  Key: process.env.MARVEL_PRIVATE_KEY_FILE_NAME,
};

const getKeys = async () => {
  try {
    console.log('Iniciando busca de chaves no S3');
    const publicKey = await s3.getObject(publicParams).promise();
    const privateKey = await s3.getObject(privateParams).promise();
    console.log('Chaves recebidas');

    return {
      publicKey: publicKey.Body.toString().trim(),
      privateKey: privateKey.Body.toString().trim(),
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { getKeys };
