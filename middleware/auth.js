const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "访问被拒绝，请先登录" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: "用户不存在" })
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "账户已被禁用" })
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    }

    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "无效的访问令牌" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "访问令牌已过期，请重新登录" })
    }
    console.error("Auth middleware error:", error)
    res.status(500).json({ message: "身份验证失败" })
  }
}

module.exports = auth
