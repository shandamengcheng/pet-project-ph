const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    type: {
      type: String,
      required: [true, "Pet type is required"],
      enum: ["狗狗", "猫咪", "兔子", "仓鼠", "鸟类", "其他"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
      trim: true,
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["公", "母"],
    },
    weight: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      enum: ["小型", "中型", "大型", "超大型"],
    },
    color: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    personality: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    medicalInfo: {
      vaccinated: { type: Boolean, default: false },
      neutered: { type: Boolean, default: false },
      microchipped: { type: Boolean, default: false },
      medicalHistory: String,
      specialNeeds: String,
      allergies: [String],
    },
    adoptionInfo: {
      fee: {
        type: Number,
        required: [true, "Adoption fee is required"],
        min: [0, "Fee cannot be negative"],
      },
      status: {
        type: String,
        enum: ["available", "pending", "adopted", "unavailable"],
        default: "available",
      },
      idealFamily: String,
      requirements: [String],
    },
    rescueStory: {
      type: String,
      maxlength: [2000, "Rescue story cannot be more than 2000 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
petSchema.index({ type: 1, "adoptionInfo.status": 1 })
petSchema.index({ location: 1 })
petSchema.index({ featured: 1 })
petSchema.index({ createdAt: -1 })

// Virtual for primary image
petSchema.virtual("primaryImage").get(function () {
  const primaryImg = this.images.find((img) => img.isPrimary)
  return primaryImg || this.images[0] || null
})

// Method to increment views
petSchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

module.exports = mongoose.model("Pet", petSchema)
