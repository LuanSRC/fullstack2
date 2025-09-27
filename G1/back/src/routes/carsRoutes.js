const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarController.js");

router.route("/cars").get(CarController.index).post(CarController.store);

router
  .route("/cars/:id")
  .get(CarController.show)
  .put(CarController.update)
  .delete(CarController.delete);

module.exports = router;
