const mongoose = require("mongoose")

const adoptionSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicationData: {
      // Personal Information
      personalInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        age: { type: String, required: true },
        occupation: { type: String, required: true },
      },

      // Living Situation
      livingSituation: {
        housingType: { type: String, required: true },
        ownRent: { type: String, required: true },
        hasYard: { type: String, required: true },
        landlordPermission: { type: Boolean, default: false },
      },

      // Pet Experience
      petExperience: {
        previousPets: { type: String, required: true },
        currentPets: { type: String, required: true },
        experience: String,
      },

      // Lifestyle
      lifestyle: {
        workSchedule: { type: String, required: true },
        exerciseTime: { type: String, required: true },
        travelFrequency: { type: String, required: true },
      },

      // Motivation
      motivation: {
        adoptionReason: { type: String, required: true },
        expectations: { type: String, required: true },
      },

      // Agreements
      agreements: [String],
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected", "completed"],
      default: "pending",
    },
    reviewNotes: [
      {
        note: String,
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
    homeVisit: {
      scheduled: { type: Boolean, default: false },
      date: Date,
      completed: { type: Boolean, default: false },
      notes: String,
      inspector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    adoptionDate: Date,
    followUpSchedule: [
      {
        date: Date,
        completed: { type: Boolean, default: false },
        notes: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes
adoptionSchema.index({ pet: 1, applicant: 1 }, { unique: true })
adoptionSchema.index({ status: 1 })
adoptionSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Adoption", adoptionSchema)
