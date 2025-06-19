const Vehicle = require("../models/Vehicle")

// GET /admin/vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean()

    const formattedVehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      priceFormatted: `£${vehicle.price.toLocaleString()}`,
      createdAtFormatted: vehicle.createdAt.toLocaleDateString("en-GB"),
    }))

    res.render("admin/vehicles/list", {
      title: "Manage Vehicles - Admin",
      vehicles: formattedVehicles,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    req.flash("error", "Error loading vehicles")
    res.redirect("/admin")
  }
}

// GET /admin/vehicles/add
const getAddVehicle = (req, res) => {
  res.render("admin/vehicles/add", {
    title: "Add Vehicle - Admin",
    pageClass: "admin-page",
    layout: "layouts/admin",
  })
}

// POST /admin/vehicles/add
const postAddVehicle = async (req, res) => {
  try {
    const { name, brand, price, type, imageUrl, description, inStock, featured } = req.body

    if (!name || !brand || !price || !type || !imageUrl) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect("/admin/vehicles/add")
    }

    const newVehicle = new Vehicle({
      name: name.trim(),
      brand: brand.trim(),
      price: Number.parseFloat(price),
      type,
      imageUrl: imageUrl.trim(),
      description: description ? description.trim() : "",
      inStock: inStock === "on",
      featured: featured === "on",
    })

    await newVehicle.save()
    req.flash("success", "Vehicle added successfully!")
    res.redirect("/admin/vehicles")
  } catch (error) {
    console.error("Error adding vehicle:", error)
    req.flash("error", "Error adding vehicle. Please try again.")
    res.redirect("/admin/vehicles/add")
  }
}

// GET /admin/vehicles/edit/:id
const getEditVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean()

    if (!vehicle) {
      req.flash("error", "Vehicle not found")
      return res.redirect("/admin/vehicles")
    }

    res.render("admin/vehicles/edit", {
      title: "Edit Vehicle - Admin",
      vehicle,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    req.flash("error", "Error loading vehicle")
    res.redirect("/admin/vehicles")
  }
}

// POST /admin/vehicles/edit/:id
const postEditVehicle = async (req, res) => {
  try {
    const { name, brand, price, type, imageUrl, description, inStock, featured } = req.body

    if (!name || !brand || !price || !type || !imageUrl) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect(`/admin/vehicles/edit/${req.params.id}`)
    }

    await Vehicle.findByIdAndUpdate(req.params.id, {
      name: name.trim(),
      brand: brand.trim(),
      price: Number.parseFloat(price),
      type,
      imageUrl: imageUrl.trim(),
      description: description ? description.trim() : "",
      inStock: inStock === "on",
      featured: featured === "on",
      updatedAt: Date.now(),
    })

    req.flash("success", "Vehicle updated successfully!")
    res.redirect("/admin/vehicles")
  } catch (error) {
    console.error("Error updating vehicle:", error)
    req.flash("error", "Error updating vehicle. Please try again.")
    res.redirect(`/admin/vehicles/edit/${req.params.id}`)
  }
}

// POST /admin/vehicles/delete/:id
const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id)
    req.flash("success", "Vehicle deleted successfully!")
    res.redirect("/admin/vehicles")
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    req.flash("error", "Error deleting vehicle")
    res.redirect("/admin/vehicles")
  }
}

module.exports = {
  getVehicles,
  getAddVehicle,
  postAddVehicle,
  getEditVehicle,
  postEditVehicle,
  deleteVehicle,
}
