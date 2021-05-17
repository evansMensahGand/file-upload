const express = require("express");
const multer = require("multer");

const storageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    const { originalname, mimetype } = file;
    if (!mimetype.includes("image")) {
      cb(true, null);
    }
    cb(null, originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
});
const filter = (req, file, cb) => {
  const { mimetype } = file;
  if (!mimetype.includes("image")) {
    return cb(true, false);
  }
  return cb(null, true);
};

const upload = multer({ 
  storage: storageEngine, 
  fileFilter: filter, 
  limits:{
  fieldSize: 1 * 1024 * 1024,
}, 
});

const app = express();

app.post("/upload", upload.single("profile"), (req, res) => {
  res.status(200).send("File Upload");
});

app.listen(4000, () =>
  console.log(
    "I will not upload biaaa, but server is  up and running like Usain Bolt"
  )
);
