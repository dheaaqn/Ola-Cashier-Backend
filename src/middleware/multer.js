const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const limits = { fileSize: 1024 * 1024 * 1 };

const fileFilter = (request, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    return callback(new Error("File extension must be PNG or JPG"), false);
  }
};

let upload = multer({ storage, limits, fileFilter }).single("product_image");

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;
