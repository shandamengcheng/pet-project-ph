const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "权限不足，需要管理员权限" })
  }
  next()
}

module.exports = adminAuth
