const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, callBackFn) => {
        callBackFn(null, "public");
    },
    filename: (req, file, callBackFn) => {
        const originalFileName = file.originalname;
        const uniqueName = `${Date.now()}-${originalFileName}`;
        callBackFn(null, uniqueName);
    }
});

const upload = multer({storage})

module.exports = {upload}