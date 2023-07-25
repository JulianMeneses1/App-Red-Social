const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const {auth} = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + file.originalname);
    }
})

const uploads = multer({storage});

router.post("/uploadavatar", [auth, uploads.single("file")], fileController.uploadAvatar);
router.post("/uploadfile", [auth, uploads.single("file")], fileController.uploadFile);
router.get("/avatar/:filename", auth, fileController.getAvatar );
router.get("/file/:filename", auth, fileController.getFile );

module.exports = router;