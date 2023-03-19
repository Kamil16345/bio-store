const multer = require("multer")
const config=require('../config/default.json')

const gridFsStorage = new gridFsStorage({
    
    url: config.db,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
}, console.log("11111111111111111111111111"))
module.exports = multer({ storage });