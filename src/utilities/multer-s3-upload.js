import * as AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import * as path from 'path';

// CONFIGURATION OF S3
AWS.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION,
});

// CREATE OBJECT FOR S3
const S3 = new AWS.S3();

// CREATE MULTER FUNCTION FOR UPLOAD
var upload = multer({
    // CREATE MULTER-S3 FUNCTION FOR STORAGE
    storage: multerS3({
        s3: S3,
        acl: 'public-read',
        // bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-folder1'
        bucket: process.env.BUCKET_NAME,
        // META DATA FOR PUTTING FIELD NAME
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        // SET / MODIFY ORIGINAL FILE NAME
        key: function (req, file, cb) {
            cb(null, file.originalname); //set unique file name if you wise using Date.toISOString()
            // EXAMPLE 1
            // cb(null, Date.now() + '-' + file.originalname);
            // EXAMPLE 2
            // cb(null, new Date().toISOString() + '-' + file.originalname);

        }
    }),
    // SET DEFAULT FILE SIZE UPLOAD LIMIT
    limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Allow images only of extensions jpeg|jpg|png !");
        }
    }
});

export default upload;