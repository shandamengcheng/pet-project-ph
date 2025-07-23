const express = require("express")
const { PrismaClient } = require("@prisma/client")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")
require("dotenv").config()

// Initialize Prisma Client
const prisma = new PrismaClient()

// Import routes
const authRoutes = require("./routes/auth")
const petRoutes = require("./routes/pets")
const adoptionRoutes = require("./routes/adoptions")
const serviceRoutes = require("./routes/services")
const bookingRoutes = require("./routes/bookings")
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/users")
const uploadRoutes = require("./routes/upload")
const volunteerRoutes = require("./routes/volunteers")
const donationRoutes = require("./routes/donations")

const app = express()

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
})
app.use(limiter)

// Logging
app.use(morgan("combined"))

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Static files
app.use("/uploads", express.static("uploads"))

// Make Prisma available in routes
app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/pets", petRoutes)
app.use("/api/adoptions", adoptionRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/users", userRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/volunteers", volunteerRoutes)
app.use("/api/donations", donationRoutes)

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "Connected",
    })
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "Disconnected",
      error: error.message,
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)

  // Prisma error handling
  if (err.code === "P2002") {
    return res.status(400).json({
      message: "Duplicate entry error",
      error: process.env.NODE_ENV === "development" ? err.message : "Data already exists",
    })
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      message: "Record not found",
      error: process.env.NODE_ENV === "development" ? err.message : "Requested data not found",
    })
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

const PORT = process.env.PORT || 5000

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully...")
  await prisma.$disconnect()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...")
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
