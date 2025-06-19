const express = require("express")
const { requireAdmin } = require("../middleware/admin")
const {
  getVehicles,
  getAddVehicle,
  postAddVehicle,
  getEditVehicle,
  postEditVehicle,
  deleteVehicle,
} = require("../controllers/adminVehicleController")

const router = express.Router()

// All admin vehicle routes require admin authentication
router.use(requireAdmin)

// Vehicles Management
router.get("/vehicles", getVehicles)
router.get("/vehicles/add", getAddVehicle)
router.post("/vehicles/add", postAddVehicle)
router.get("/vehicles/edit/:id", getEditVehicle)
router.post("/vehicles/edit/:id", postEditVehicle)
router.post("/vehicles/delete/:id", deleteVehicle)

module.exports = router
