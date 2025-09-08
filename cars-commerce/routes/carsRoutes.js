const express = require('express')
const Car = require('../models/car');
const { where } = require('sequelize');
const router = express.Router()

router.route('/cars')
    .get(async (req, res) => {
        const cars = await Car.findAll();
        res.json(cars)
    })
    .post(async (req, res) => {
        try {
            //Desetruturando a inforamação vinda no body da requisição HTTP, com método POST para esta rota.
            const { manufacturer, model, type, year, transmition, price } = req.body
            const newCar = await Car.create({
                manufacturer,
                model,
                type,
                year,
                transmition,
                price
            })
            return res.status(201).json(newCar)
        } catch(err){
            //Retorna uma simples mensagem de erro
            res.status(400).json({ error: err.message})
        }
    })

router.route('/cars/:id')
    .get(async (req, res) => {
        const car = await Car.findByPk(req.params.id)
        return res.json(car)
    })
    .put(async (req, res) => {
        try {

            const carFound = await Car.findByPk(req.params.id)
           
            const { manufacturer, model, type, year, transmition, price } = req.body
            
            if(!carFound)
                return res.status(404).json({ message:"Car not found" })
            
            await carFound.update({ manufacturer, model, type, year, transmition, price })
            
            return res.json(carFound)
        
        } catch (err) {
            //Retorna uma simples mensagem de erro
            res.status(400).json({ error: err.message})
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedCar = await Car.destroy({ where: {id: req.params.id} })
            
            if(!deletedCar)
                return res.status(404).json({ message:"Car not found" })

            return res.status(204).send()

        } catch (err) {
            //Retorna uma simples mensagem de erro
            res.status(400).json({ error: err.message})
        }
    })

module.exports = router