const express = require("express");
const publicationController = require("../controllers/publicationController");
const {auth} = require("../middlewares/auth");
const router = express.Router();

router.post("", auth, publicationController.save);
router.get("/detail/:id", auth, publicationController.getPublication);
router.get("/user/:id?/:page?", auth, publicationController.getUserPublications);
router.delete("/:id", auth, publicationController.remove);
router.put("/update/:id", auth, publicationController.update)

module.exports = router;