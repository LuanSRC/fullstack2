const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.route("/users").get(UserController.index).post(UserController.store);

router
  .route("/users/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
