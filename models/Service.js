const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["grooming", "medical", "boarding", "training", "insurance", "daycare"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Price cannot be negative"],
      },
      currency: {
        type: String,
        default: "CNY",
      },
      unit: {
        type: String,
        enum: ["per_session", "per_hour", "per_day", "per_month", "per_year"],
        default: "per_session",
      },
      packages: [
        {
          name: String,
          price: Number,
          duration: String,
          features: [String],
        },
      ],
    },
    duration: {
      estimated: String,
      minimum: String,
      maximum: String,
    },
    availability: {
      days: [
        {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        },
      ],
      hours: {
        start: String,
        end: String,
      },
      bookingAdvance: {
        type: Number,
        default: 24, // hours
      },
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    staff: [
      {
        name: String,
        role: String,
        qualifications: [String],
        image: String,
      },
    ],
    location: {
      address: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
serviceSchema.index({ category: 1, isActive: 1 })
serviceSchema.index({ popular: 1 })
serviceSchema.index({ "rating.average": -1 })

module.exports = mongoose.model("Service", serviceSchema)
