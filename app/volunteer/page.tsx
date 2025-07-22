"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Users,
  CheckCircle,
  AlertCircle,
  Camera,
  Stethoscope,
  GraduationCap,
  Car,
  Megaphone,
  Wrench,
} from "lucide-react"

export default function VolunteerPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // 基本信息
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    occupation: "",
    // 志愿服务信息
    availableTime: [] as string[],
    preferredActivities: [] as string[],
    experience: "",
    skills: "",
    motivation: "",
    // 紧急联系人
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    // 其他
    hasTransport: false,
    canTravel: false,
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const volunteerActivities = [
    { id: "rescue", name: "动物救助", icon: Heart, description: "参与流浪动物救助工作" },
    { id: "care", name: "日常护理", icon: Stethoscope, description: "协助动物日常护理和清洁" },
    { id: "training", name: "训练协助", icon: GraduationCap, description: "协助动物行为训练" },
    { id: "transport", name: "运输服务", icon: Car, description: "协助动物运输和接送" },
    { id: "promotion", name: "宣传推广", icon: Megaphone, description: "参与宣传和教育活动" },
    { id: "maintenance", name: "设施维护", icon: Wrench, description: "协助设施维护和建设" },
    { id: "photography", name: "摄影记录", icon: Camera, description: "为动物拍摄照片和视频" },
    { id: "events", name: "活动组织", icon: Users, description: "协助组织各类活动" },
  ]

  const timeSlots = [
    "周一上午",
    "周一下午",
    "周一晚上",
    "周二上午",
    "周二下午",
    "周二晚上",
    "周三上午",
    "周三下午",
    "周三晚上",
    "周四上午",
    "周四下午",
    "周四晚上",
    "周五上午",
    "周五下午",
    "周五晚上",
    "周六上午",
    "周六下午",
    "周六晚上",
    "周日上午",
    "周日下午",
    "周日晚上",
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "请输入姓名"
    if (!formData.email) newErrors.email = "请输入邮箱"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "邮箱格式不正确"
    if (!formData.phone) newErrors.phone = "请输入手机号"
    if (!formData.age) newErrors.age = "请输入年龄"
    if (!formData.city) newErrors.city = "请选择城市"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (formData.availableTime.length === 0) {
      newErrors.availableTime = "请选择至少一个可用时间"
    }
    if (formData.preferredActivities.length === 0) {
      newErrors.preferredActivities = "请选择至少一个感兴趣的活动"
    }
    if (!formData.motivation.trim()) {
      newErrors.motivation = "请填写申请原因"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const newErrors: Record<string, string> = {}

    if (!formData.emergencyName.trim()) newErrors.emergencyName = "请输入紧急联系人姓名"
    if (!formData.emergencyPhone) newErrors.emergencyPhone = "请输入紧急联系人电话"
    if (!formData.agreeTerms) newErrors.agreeTerms = "请同意志愿者协议"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Volunteer application:", formData)
      setStep(4) // 成功页面
    } catch (error) {
      setErrors({ general: "提交失败，请稍后重试" })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTimeSlot = (time: string) => {
    const newTimes = formData.availableTime.includes(time)
      ? formData.availableTime.filter((t) => t !== time)
      : [...formData.availableTime, time]
    setFormData({ ...formData, availableTime: newTimes })
  }

  const toggleActivity = (activity: string) => {
    const newActivities = formData.preferredActivities.includes(activity)
      ? formData.preferredActivities.filter((a) => a !== activity)
      : [...formData.preferredActivities, activity]
    setFormData({ ...formData, preferredActivities: newActivities })
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold mb-4">申请提交成功！</h1>
              <p className="text-gray-600 mb-6">
                感谢您申请成为我们的志愿者！我们将在3-5个工作日内审核您的申请， 并通过邮件或电话与您联系。
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2">接下来的步骤：</h3>
                <ul className="text-sm space-y-1">
                  <li>• 我们会审核您的申请材料</li>
                  <li>• 安排面试或电话沟通</li>
                  <li>• 提供志愿者培训</li>
                  <li>• 开始您的志愿服务之旅</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/")}>返回首页</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/about")}>
                  了解更多
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">成为志愿者</h1>
          <p className="text-gray-600">加入我们，为动物福利事业贡献您的力量</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i}
                </div>
                <span className={`ml-2 text-sm ${i <= step ? "text-blue-600" : "text-gray-500"}`}>
                  {i === 1 ? "基本信息" : i === 2 ? "志愿服务" : "完善资料"}
                </span>
                {i < 3 && <div className="w-12 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>请填写您的基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">年龄 *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="请输入您的年龄"
                    />
                    {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="请输入您的邮箱"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号 *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="请输入您的手机号"
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">职业</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="请输入您的职业"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">详细地址</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="请输入您的详细地址（可选）"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext}>下一步</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>志愿服务信息</CardTitle>
              <CardDescription>告诉我们您的志愿服务偏好</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <Label className="text-base font-medium mb-4 block">可用时间 *</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleTimeSlot(time)}
                        className={`p-2 text-xs rounded-md border transition-colors ${
                          formData.availableTime.includes(time)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.availableTime && <p className="text-sm text-red-600 mt-2">{errors.availableTime}</p>}
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">感兴趣的活动 *</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {volunteerActivities.map((activity) => {
                      const IconComponent = activity.icon
                      return (
                        <div
                          key={activity.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.preferredActivities.includes(activity.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => toggleActivity(activity.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`p-2 rounded-lg ${
                                formData.preferredActivities.includes(activity.id)
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{activity.name}</h3>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {errors.preferredActivities && (
                    <p className="text-sm text-red-600 mt-2">{errors.preferredActivities}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">相关经验</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="请描述您的相关经验（如：养宠经验、志愿服务经验等）"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">特殊技能</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="请描述您的特殊技能（如：摄影、设计、医疗、训练等）"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">申请原因 *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder="请告诉我们您为什么想成为志愿者，以及您希望通过志愿服务实现什么..."
                    rows={4}
                  />
                  {errors.motivation && <p className="text-sm text-red-600">{errors.motivation}</p>}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    上一步
                  </Button>
                  <Button onClick={handleNext}>下一步</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>完善资料</CardTitle>
              <CardDescription>最后一步，完善您的申请资料</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">紧急联系人</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">姓名 *</Label>
                      <Input
                        id="emergencyName"
                        value={formData.emergencyName}
                        onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                        placeholder="紧急联系人姓名"
                      />
                      {errors.emergencyName && <p className="text-sm text-red-600">{errors.emergencyName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">电话 *</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        placeholder="紧急联系人电话"
                      />
                      {errors.emergencyPhone && <p className="text-sm text-red-600">{errors.emergencyPhone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">关系</Label>
                      <Select
                        value={formData.emergencyRelation}
                        onValueChange={(value) => setFormData({ ...formData, emergencyRelation: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择关系" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">父母</SelectItem>
                          <SelectItem value="spouse">配偶</SelectItem>
                          <SelectItem value="sibling">兄弟姐妹</SelectItem>
                          <SelectItem value="friend">朋友</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">其他信息</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasTransport"
                        checked={formData.hasTransport}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasTransport: checked as boolean })}
                      />
                      <Label htmlFor="hasTransport">我有自己的交通工具</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="canTravel"
                        checked={formData.canTravel}
                        onCheckedChange={(checked) => setFormData({ ...formData, canTravel: checked as boolean })}
                      />
                      <Label htmlFor="canTravel">我可以到其他城市参与志愿活动</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      />
                      <Label htmlFor="agreeTerms" className="leading-5">
                        我已阅读并同意《志愿者服务协议》，承诺遵守相关规定， 积极参与志愿服务活动
                      </Label>
                    </div>
                    {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    上一步
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "提交中..." : "提交申请"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">有意义的工作</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                直接参与拯救生命的工作，为无家可归的动物提供帮助，体验助人为乐的快乐。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">结识朋友</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">与志同道合的朋友一起工作，建立深厚的友谊，扩展您的社交圈。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">学习成长</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">学习动物护理知识，培养责任感和爱心，获得宝贵的人生经验。</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
