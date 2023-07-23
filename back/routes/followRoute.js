const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const followController = require("../controllers/followController");

router.get("/following/:id?/:page?", auth, followController.following);
router.get("/followers/:id?/:page?", auth, followController.followers);
router.post("/follow", auth, followController.follow);
router.delete("/unfollow/:id", auth, followController.unfollow);


module.exports = router;