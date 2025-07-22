const express = require("express")
const Pet = require("../models/Pet")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")
const { validatePet } = require("../utils/validation")

const router = express.Router()

// Get all pets with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      age,
      location,
      status = "available",
      search,
      featured,
      sort = "-createdAt",
    } = req.query

    // Build query
    const query = { "adoptionInfo.status": status }

    if (type && type !== "all") {
      query.type = type
    }

    if (location) {
      query.location = new RegExp(location, "i")
    }

    if (featured === "true") {
      query.featured = true
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { breed: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ]
    }

    // Age filtering
    if (age && age !== "all") {
      // This is a simplified age filter - you might want to implement more sophisticated logic
      if (age === "young") {
        query.age = /(个月|[01]岁)/i
      } else if (age === "adult") {
        query.age = /[2-5]岁/i
      } else if (age === "senior") {
        query.age = /[6-9]岁|[1-9][0-9]岁/i
      }
    }

    // Execute query with pagination
    const pets = await Pet.find(query)
      .populate("createdBy", "fullName")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()

    // Get total count for pagination
    const total = await Pet.countDocuments(query)

    res.json({
      pets,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get pets error:", error)
    res.status(500).json({ message: "获取宠物列表失败" })
  }
})

// Get single pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("createdBy", "fullName email").lean()

    if (!pet) {
      return res.status(404).json({ message: "宠物不存在" })
    }

    // Increment views (don't await to avoid blocking response)
    Pet.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).exec()

    res.json({ pet })
  } catch (error) {
    console.error("Get pet error:", error)
    res.status(500).json({ message: "获取宠物信息失败" })
  }
})

// Create new pet (admin only)
router.post("/", auth, adminAuth, async (req, res) => {
  try {
    const { error } = validatePet(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const pet = new Pet({
      ...req.body,
      createdBy: req.user.id,
    })

    await pet.save()
    await pet.populate("createdBy", "fullName")

    res.status(201).json({
      message: "宠物信息创建成功",
      pet,
    })
  } catch (error) {
    console.error("Create pet error:", error)
    res.status(500).json({ message: "创建宠物信息失败" })
  }
})

// Update pet (admin only)
router.put("/:id", auth, adminAuth, async (req, res) => {
  try {
    const { error } = validatePet(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(
      "createdBy",
      "fullName",
    )

    if (!pet) {
      return res.status(404).json({ message: "宠物不存在" })
    }

    res.json({
      message: "宠物信息更新成功",
      pet,
    })
  } catch (error) {
    console.error("Update pet error:", error)
    res.status(500).json({ message: "更新宠物信息失败" })
  }
})

// Delete pet (admin only)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id)

    if (!pet) {
      return res.status(404).json({ message: "宠物不存在" })
    }

    res.json({ message: "宠物信息删除成功" })
  } catch (error) {
    console.error("Delete pet error:", error)
    res.status(500).json({ message: "删除宠物信息失败" })
  }
})

// Like/Unlike pet
router.post("/:id/like", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)

    if (!pet) {
      return res.status(404).json({ message: "宠物不存在" })
    }

    const existingLike = pet.likes.find((like) => like.user.toString() === req.user.id)

    if (existingLike) {
      // Unlike
      pet.likes = pet.likes.filter((like) => like.user.toString() !== req.user.id)
    } else {
      // Like
      pet.likes.push({ user: req.user.id })
    }

    await pet.save()

    res.json({
      message: existingLike ? "取消收藏成功" : "收藏成功",
      liked: !existingLike,
      likesCount: pet.likes.length,
    })
  } catch (error) {
    console.error("Like pet error:", error)
    res.status(500).json({ message: "操作失败" })
  }
})

// Get pet statistics (admin only)
router.get("/admin/stats", auth, adminAuth, async (req, res) => {
  try {
    const stats = await Pet.aggregate([
      {
        $group: {
          _id: "$adoptionInfo.status",
          count: { $sum: 1 },
        },
      },
    ])

    const typeStats = await Pet.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ])

    const totalViews = await Pet.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: { $size: "$likes" } },
        },
      },
    ])

    res.json({
      statusStats: stats,
      typeStats,
      totalViews: totalViews[0]?.totalViews || 0,
      totalLikes: totalViews[0]?.totalLikes || 0,
    })
  } catch (error) {
    console.error("Get pet stats error:", error)
    res.status(500).json({ message: "获取统计数据失败" })
  }
})

module.exports = router
