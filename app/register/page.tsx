"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Heart, User, Mail, Lock, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // 基本信息
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // 详细信息
    city: "",
    district: "",
    address: "",
    experience: "",
    motivation: "",
    // 协议
    agreeTerms: false,
    agreeNewsletter: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "请输入您的姓名"
    }

    if (!formData.email) {
      newErrors.email = "请输入邮箱地址"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    if (!formData.phone) {
      newErrors.phone = "请输入手机号码"
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "请输入有效的手机号码"
    }

    if (!formData.password) {
      newErrors.password = "请输入密码"
    } else if (formData.password.length < 8) {
      newErrors.password = "密码至少需要8个字符"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "请确认密码"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "请同意服务条款和隐私政策"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // 验证第二步表单
    const newErrors: Record<string, string> = {}

    if (!formData.city) {
      newErrors.city = "请选择所在城市"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // 模拟注册请求
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Registration data:", formData)
      setStep(3) // 成功页面
    } catch (error) {
      setErrors({ general: "注册失败，请稍后重试" })
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold mb-4">注册成功！</h1>
              <p className="text-gray-600 mb-6">
                欢迎加入爱宠之家大家庭！我们已经向您的邮箱发送了验证邮件，请查收并完成邮箱验证。
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">立即登录</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/">返回首页</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">爱宠之家</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">创建账户</h2>
          <p className="mt-2 text-gray-600">加入我们的爱心社区</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div className={`w-12 h-px ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{step === 1 ? "基本信息" : "详细信息"}</CardTitle>
            <CardDescription>
              {step === 1 ? (
                <>
                  已有账户？{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-500">
                    立即登录
                  </Link>
                </>
              ) : (
                "完善您的个人资料"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-6">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="请输入您的姓名"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址 *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="请输入您的邮箱"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">手机号码 *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="请输入您的手机号"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">密码 *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入密码（至少8位）"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认密码 *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入密码"
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-5">
                      我同意{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        服务条款
                      </Link>{" "}
                      和{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        隐私政策
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeNewsletter"
                      checked={formData.agreeNewsletter}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeNewsletter: checked as boolean })}
                    />
                    <Label htmlFor="agreeNewsletter" className="text-sm">
                      订阅我们的新闻通讯，获取最新的宠物护理知识
                    </Label>
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full">
                  下一步
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">所在城市 *</Label>
                    <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beijing">北京</SelectItem>
                        <SelectItem value="shanghai">上海</SelectItem>
                        <SelectItem value="guangzhou">广州</SelectItem>
                        <SelectItem value="shenzhen">深圳</SelectItem>
                        <SelectItem value="hangzhou">杭州</SelectItem>
                        <SelectItem value="chengdu">成都</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">所在区域</Label>
                    <Input
                      id="district"
                      placeholder="如：朝阳区"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">详细地址</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="请输入详细地址（可选）"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">养宠经验</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择您的养宠经验" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">没有经验</SelectItem>
                      <SelectItem value="beginner">初学者（1年以下）</SelectItem>
                      <SelectItem value="intermediate">有一定经验（1-5年）</SelectItem>
                      <SelectItem value="experienced">经验丰富（5年以上）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">加入我们的原因</Label>
                  <textarea
                    id="motivation"
                    placeholder="请简单介绍您为什么想要加入我们的社区..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                    rows={3}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 bg-transparent">
                    上一步
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "注册中..." : "完成注册"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
