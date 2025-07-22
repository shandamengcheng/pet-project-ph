const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../models/User")
const auth = require("../middleware/auth")
const { sendEmail } = require("../utils/email")
const { validateRegistration, validateLogin } = require("../utils/validation")

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { error } = validateRegistration(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { fullName, email, password, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "该邮箱已被注册" })
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password,
      phone,
    })

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken()
    await user.save()

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
    await sendEmail({
      to: email,
      subject: "验证您的邮箱 - 爱宠之家",
      template: "emailVerification",
      data: {
        name: fullName,
        verificationUrl,
      },
    })

    // Generate auth token
    const token = user.generateAuthToken()

    res.status(201).json({
      message: "注册成功，请查收验证邮件",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "注册失败，请稍后重试" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { email, password } = req.body

    // Find user and include password
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({ message: "邮箱或密码错误" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "邮箱或密码错误" })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: "账户已被禁用，请联系管理员" })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = user.generateAuthToken()

    res.json({
      message: "登录成功",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "登录失败，请稍后重试" })
  }
})

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "用户不存在" })
    }

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        profile: user.profile,
        preferences: user.preferences,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ message: "获取用户信息失败" })
  }
})

// Verify email
router.post("/verify-email", async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: "验证令牌不能为空" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "用户不存在" })
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "邮箱已经验证过了" })
    }

    // Update user
    user.emailVerified = true
    user.emailVerificationToken = undefined
    await user.save()

    res.json({ message: "邮箱验证成功" })
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "无效的验证令牌" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "验证令牌已过期" })
    }
    console.error("Email verification error:", error)
    res.status(500).json({ message: "邮箱验证失败" })
  }
})

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "邮箱不能为空" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "该邮箱未注册" })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
    await user.save()

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    await sendEmail({
      to: email,
      subject: "重置密码 - 爱宠之家",
      template: "passwordReset",
      data: {
        name: user.fullName,
        resetUrl,
      },
    })

    res.json({ message: "密码重置邮件已发送，请查收" })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({ message: "发送重置邮件失败" })
  }
})

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ message: "令牌和新密码不能为空" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "密码至少需要6个字符" })
    }

    // Hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: "无效或已过期的重置令牌" })
    }

    // Update password
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    res.json({ message: "密码重置成功，请使用新密码登录" })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({ message: "密码重置失败" })
  }
})

// Logout (client-side token removal)
router.post("/logout", auth, (req, res) => {
  res.json({ message: "退出登录成功" })
})

module.exports = router
