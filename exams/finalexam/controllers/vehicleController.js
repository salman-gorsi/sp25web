const Vehicle = require("../models/Vehicle")

// GET /vehicles - Public vehicles page
const getVehicles = async (req, res) => {
  try {
    const type = req.query.type
    const search = req.query.search
    const query = {}

    if (type) {
      query.type = type
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 }).lean()

    const formattedVehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      priceFormatted: `£${vehicle.price.toLocaleString()}`,
    }))

    res.render("vehicles/index", {
      title: "Vehicles - Seasalt Cornwall",
      vehicles: formattedVehicles,
      selectedType: type,
      searchTerm: search,
      pageClass: "vehicles-page",
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    req.flash("error", "Unable to load vehicles. Please try again.")
    res.render("vehicles/index", {
      title: "Vehicles - Seasalt Cornwall",
      vehicles: [],
      selectedType: req.query.type,
      searchTerm: req.query.search,
      pageClass: "vehicles-page",
    })
  }
}

// GET /vehicles/:id - Vehicle details
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean()

    if (!vehicle) {
      req.flash("error", "Vehicle not found")
      return res.redirect("/vehicles")
    }

    res.render("vehicles/detail", {
      title: `${vehicle.name} - Seasalt Cornwall`,
      vehicle: {
        ...vehicle,
        priceFormatted: `£${vehicle.price.toLocaleString()}`,
      },
      pageClass: "vehicle-detail-page",
    })
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    req.flash("error", "Unable to load vehicle details.")
    res.redirect("/vehicles")
  }
}

module.exports = {
  getVehicles,
  getVehicleById,
}
