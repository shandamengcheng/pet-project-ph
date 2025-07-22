const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petInfo: {
      name: { type: String, required: true },
      type: { type: String, required: true },
      breed: String,
      age: String,
      weight: String,
      specialNeeds: String,
    },
    bookingDetails: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      duration: String,
      package: String,
      specialRequests: String,
    },
    contactInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: String,
    },
    pricing: {
      basePrice: { type: Number, required: true },
      additionalFees: [
        {
          name: String,
          amount: Number,
        },
      ],
      discount: {
        amount: Number,
        reason: String,
      },
      totalAmount: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled", "no_show"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "wechat", "alipay", "bank_transfer"],
    },
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reminder: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
bookingSchema.index({ user: 1, "bookingDetails.date": -1 })
bookingSchema.index({ service: 1, status: 1 })
bookingSchema.index({ "bookingDetails.date": 1, status: 1 })

module.exports = mongoose.model("Booking", bookingSchema)
