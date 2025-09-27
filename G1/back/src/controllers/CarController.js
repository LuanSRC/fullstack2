const Car = require("../models/CarModel.js");
const { where } = require("sequelize");

class CarController {
  async index(req, res) {
    const cars = await Car.findAll();
    res.status(201).json(cars);
  }

  store(req, res) {
    const newCar = {
      name: req.body.name,
      trade: req.body.trade,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
    };
    Car.create(newCar);
    res.status(201).json(newCar);
  }

  async show(req, res) {
    const id = parseInt(req.params.id);
    const car = await Car.findByPk(id);
    res.json(car);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const { name, trade, model, year, price } = req.body;
    const car = {
      name,
      trade,
      model,
      year,
      price,
    };
    const carUpdated = await Car.update(car, { where: { id } });
    if (parseInt(carUpdated)) res.status(200).json(carUpdated);
    res.status(404).json({ message: "Car not found" });
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);
    const deletedCar = await Car.destroy({ where: { id } });
    if (deletedCar) res.status(204).send();
    res.status(404).json({ message: "Car not found" });
  }
}

module.exports = new CarController();
