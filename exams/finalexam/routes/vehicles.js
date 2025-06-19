const express = require("express")
const { getVehicles, getVehicleById } = require("../controllers/vehicleController")

const router = express.Router()

// GET /vehicles
router.get("/vehicles", getVehicles)

// GET /vehicles/:id
router.get("/vehicles/:id", getVehicleById)

module.exports = router
