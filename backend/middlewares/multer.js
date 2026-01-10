import multer from "multer";

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("❌ Multer error:", err);
    return res.status(400).json({ 
      error: `File upload error: ${err.message}` 
    });
  } else if (err) {
    console.error("❌ File filter error:", err);
    return res.status(400).json({ 
      error: err.message 
    });
  }
  next();
};