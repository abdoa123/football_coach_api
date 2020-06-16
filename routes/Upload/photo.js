const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');

var userTable=require("../../database/userTable");

var resUrl="";

const storage = new googleStorage.Storage({
  projectId: "footballcoach-fbe05",
  keyFilename: "./auth.json"
});

const bucket = storage.bucket("gs://footballcoach-fbe05.appspot.com");

const multer = Multer({
  
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

router.post('/photo', multer.single('file'), (req, res) => {
  console.log('Upload Image');

  var tkn = req.headers['token'];
  var users=new userTable();

  let file = req.file;
  if (file) {
    uploadImageToStorage(file,users,tkn).then((success) => {
      res.status(200).send({
        url: resUrl
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file,users,tkn) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', async () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
      console.log(url)
      resUrl=url;
      await users.photoUsertkn(tkn,url);
    });

    blobStream.end(file.buffer);
  });
}

  module.exports= router;