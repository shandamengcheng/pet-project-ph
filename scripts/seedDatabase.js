const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const Pet = require("../models/Pet")
const Service = require("../models/Service")
const BlogPost = require("../models/BlogPost")

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/petwebsite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await User.deleteMany({})
    await Pet.deleteMany({})
    await Service.deleteMany({})
    await BlogPost.deleteMany({})

    // Create admin user
    const adminUser = new User({
      fullName: "系统管理员",
      email: process.env.ADMIN_EMAIL || "admin@petlove.com",
      password: process.env.ADMIN_PASSWORD || "admin123456",
      role: "admin",
      emailVerified: true,
    })
    await adminUser.save()
    console.log("✅ Admin user created")

    // Create sample pets
    const samplePets = [
      {
        name: "小白",
        type: "狗狗",
        breed: "金毛",
        age: "2岁",
        gender: "公",
        weight: "25kg",
        location: "北京",
        description: "温顺友好的金毛犬，特别喜欢和小朋友玩耍。性格开朗活泼，对人类非常友善。",
        personality: ["友善", "活泼", "聪明", "忠诚"],
        images: [{ url: "/placeholder.svg?height=400&width=400", alt: "小白的照片", isPrimary: true }],
        medicalInfo: {
          vaccinated: true,
          neutered: false,
          microchipped: true,
          medicalHistory: "已完成狂犬疫苗、六联疫苗接种",
          specialNeeds: "需要每天至少1小时的户外运动",
        },
        adoptionInfo: {
          fee: 500,
          status: "available",
          idealFamily: "适合有孩子的家庭，需要有院子或经常带它外出运动的家庭",
        },
        rescueStory: "小白是从一个繁殖场救助出来的，经过几个月的悉心照料，现在已经完全恢复健康。",
        createdBy: adminUser._id,
        featured: true,
      },
      {
        name: "咪咪",
        type: "猫咪",
        breed: "英短",
        age: "1岁",
        gender: "母",
        weight: "4kg",
        location: "上海",
        description: "安静可爱的英短猫，适合公寓饲养，性格温和。",
        personality: ["安静", "温和", "独立", "可爱"],
        images: [{ url: "/placeholder.svg?height=400&width=400", alt: "咪咪的照片", isPrimary: true }],
        medicalInfo: {
          vaccinated: true,
          neutered: true,
          microchipped: true,
          medicalHistory: "已完成疫苗接种和绝育手术",
        },
        adoptionInfo: {
          fee: 300,
          status: "available",
          idealFamily: "适合公寓居住的家庭",
        },
        createdBy: adminUser._id,
      },
    ]

    await Pet.insertMany(samplePets)
    console.log("✅ Sample pets created")

    // Create sample services
    const sampleServices = [
      {
        name: "宠物美容",
        category: "grooming",
        description: "专业的宠物美容服务，包括洗澡、修剪、造型等",
        shortDescription: "让您的宠物更加美丽健康",
        features: ["洗澡护理", "毛发修剪", "指甲修剪", "耳朵清洁", "造型设计"],
        pricing: {
          basePrice: 80,
          currency: "CNY",
          unit: "per_session",
        },
        duration: {
          estimated: "1-3小时",
        },
        availability: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          hours: { start: "09:00", end: "18:00" },
        },
        isActive: true,
        popular: true,
      },
      {
        name: "宠物医疗",
        category: "medical",
        description: "24小时专业宠物医疗服务，包括健康检查、疫苗接种、疾病治疗等",
        shortDescription: "守护宠物健康",
        features: ["健康检查", "疫苗接种", "疾病治疗", "手术服务", "急诊服务"],
        pricing: {
          basePrice: 150,
          currency: "CNY",
          unit: "per_session",
        },
        duration: {
          estimated: "30分钟-2小时",
        },
        availability: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          hours: { start: "00:00", end: "23:59" },
        },
        isActive: true,
      },
    ]

    await Service.insertMany(sampleServices)
    console.log("✅ Sample services created")

    // Create sample blog posts
    const sampleBlogPosts = [
      {
        title: "新手养狗完全指南：从选择到日常护理",
        slug: "beginner-dog-care-guide",
        excerpt: "准备迎接一只新的狗狗家庭成员？这份详细指南将帮助您了解从选择合适的品种到日常护理的所有要点。",
        content: "这里是完整的文章内容...",
        author: adminUser._id,
        category: "养护指南",
        tags: ["狗狗护理", "新手指南", "宠物选择"],
        status: "published",
        featured: true,
        readTime: "8分钟",
        publishedAt: new Date(),
      },
      {
        title: "猫咪行为解读：理解您的猫咪在想什么",
        slug: "understanding-cat-behavior",
        excerpt: "猫咪的行为往往充满神秘色彩，了解这些行为背后的含义能帮助您更好地与猫咪沟通。",
        content: "这里是完整的文章内容...",
        author: adminUser._id,
        category: "行为训练",
        tags: ["猫咪行为", "宠物心理", "沟通技巧"],
        status: "published",
        readTime: "6分钟",
        publishedAt: new Date(),
      },
    ]

    await BlogPost.insertMany(sampleBlogPosts)
    console.log("✅ Sample blog posts created")

    console.log("🎉 Database seeding completed successfully!")
    console.log(`Admin login: ${adminUser.email} / ${process.env.ADMIN_PASSWORD || "admin123456"}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
