const session = require("express-session")
const MongoStore = require("connect-mongo")

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "seasalt-cornwall-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/seasalt",
    touchAfter: 24 * 3600, // lazy session update
    ttl: 24 * 60 * 60, // 24 hours
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true, // Prevent XSS attacks
  },
  name: "seasalt.sid", // Change default session name
})

module.exports = sessionConfig
