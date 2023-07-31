const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {auth} = require("../middlewares/auth");

// auth que es el middleware se ejecuta antes de la función test del controlador
router.get("/profile/:id?",auth,userController.profile);
router.get("/list/:page?",auth,userController.listUsers);
router.get("/counters/:id?",auth,userController.counters);
router.post("",userController.register);
router.post("/login",userController.login);
router.put("/update",auth,userController.update);

module.exports = router;