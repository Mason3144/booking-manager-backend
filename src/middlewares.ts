import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const bucket = "booking-manager/imgs"

const s3ImageUploader = multerS3({
  s3: s3,
  bucket,
  acl: "public-read",
  key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadFiles = multer({
  storage: s3ImageUploader
})

export const handleDeletePhotoFromAWS = (url: string) => {
  const decodedUrl = decodeURI(url);
  const Key = decodedUrl.split("amazonaws.com/")[1];

  s3.deleteObject({
      Bucket:bucket,
      Key,
    })
};




export const protectorMiddleware = (req, res, next) => {
  if (req.session.login) {
    return next();
  } else {
    return res.send({ok:false, error:"로그인이 필요합니다."});
  }
};