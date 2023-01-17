const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/');
  },
  filename: (req, file, cb) => {
    const prefix = Date.now();
    cb(null, `${prefix}_${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
