const Product = require("../models/Product")

// Sample product data for homepage
const sampleProducts = {
  featured: [
    {
      id: 1,
      name: "Dresses",
      image: "/assets/dresses.avif",
      category: "dresses",
      description: "Beautiful dresses for every occasion",
    },
    {
      id: 2,
      name: "Tops",
      image: "/assets/tops.avif",
      category: "tops",
      description: "Stylish tops and blouses",
    },
    {
      id: 3,
      name: "Knitwear",
      image: "/assets/knitwear.avif",
      category: "knitwear",
      description: "Cozy knitwear collection",
    },
  ],
  carousel: [
    {
      id: 1,
      title: "HOLIDAY SHOP",
      subtitle: "THE",
      image: "/assets/holiday-shop.avif",
      buttonText: "VIEW THE COLLECTION",
      link: "/products/holiday",
    },
    {
      id: 2,
      title: "Seasalt Linen",
      subtitle: "",
      image: "/assets/seasalt-linen.avif",
      buttonText: "SHOP NEW IN",
      link: "/products/linen",
    },
    {
      id: 3,
      title: "SEASALT MEN",
      subtitle: "",
      image: "/assets/seasalt-men.avif",
      buttonText: "SHOP MEN'S",
      link: "/products/mens",
    },
  ],
  categories: [
    { name: "Dresses", slug: "dresses" },
    { name: "Tops", slug: "tops" },
    { name: "Knitwear", slug: "knitwear" },
    { name: "Outerwear", slug: "outerwear" },
    { name: "Trousers", slug: "trousers" },
    { name: "Accessories", slug: "accessories" },
  ],
}

// GET /products
const getProducts = async (req, res) => {
  try {
    const category = req.query.category
    const search = req.query.search
    const query = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const products = await Product.find(query).lean()

    const formattedProducts = products.map((product) => ({
      ...product,
      image: product.imageUrl,
      name: product.title,
      description: product.description,
      priceFormatted: `£${product.price.toFixed(2)}`,
    }))

    res.render("products", {
      title: "Products - Seasalt Cornwall",
      products: formattedProducts,
      categories: sampleProducts.categories,
      selectedCategory: category,
      searchTerm: search,
      pageClass: "products-page",
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    req.flash("error", "Unable to load products. Please try again.")
    res.render("products", {
      title: "Products - Seasalt Cornwall",
      products: [],
      categories: sampleProducts.categories,
      selectedCategory: req.query.category,
      searchTerm: req.query.search,
      pageClass: "products-page",
    })
  }
}

// GET /products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean()

    if (!product) {
      req.flash("error", "Product not found")
      return res.redirect("/products")
    }

    res.render("product-detail", {
      title: `${product.title} - Seasalt Cornwall`,
      product: {
        ...product,
        priceFormatted: `£${product.price.toFixed(2)}`,
      },
      pageClass: "product-detail-page",
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    req.flash("error", "Unable to load product details.")
    res.redirect("/products")
  }
}

module.exports = {
  getProducts,
  getProductById,
  sampleProducts,
}
