const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const {auth} = require("../middlewares/auth");
const multer = require("multer");

const storageAvatars = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + file.originalname);
    }
})

const storagePublications = multer.diskStorage({
  
    destination: (req, file, cb) => {
        cb(null, "./files/publications");
    },
    filename: (req, file, cb) => {
        cb(null, "publication-" + file.originalname);
    }
})

const uploadsAvatars = multer({storage: storageAvatars});
const uploadsPublications = multer({storage: storagePublications});

router.post("/uploadavatar", [auth, uploadsAvatars.single("file")], fileController.uploadAvatar);
router.post("/uploadfile/:id", [auth, uploadsPublications.single("file")], fileController.uploadFile);
router.get("/avatar/:filename", auth, fileController.getAvatar );
router.get("/file/:filename", auth, fileController.getFile );

module.exports = router;