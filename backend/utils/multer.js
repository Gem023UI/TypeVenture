const multer = require("multer");
const path = require("path");

module.exports = multer({
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp'); // Use /tmp for Render (ephemeral storage)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    console.log("📁 Multer checking file:", file.originalname);
    
    // If no file is uploaded, that's okay - avatar is optional
    if (!file) {
      console.log("ℹ️ No file uploaded");
      return cb(null, false);
    }

    let ext = path.extname(file.originalname).toLowerCase();
    
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      console.log("❌ Unsupported file type:", ext);
      // Properly reject the file with an error
      return cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"), false);
    }
    
    console.log("✅ File accepted:", file.originalname);
    cb(null, true);
  },
});