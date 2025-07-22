"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Heart, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdoptionApplicationPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    age: "",
    occupation: "",

    // Living Situation
    housingType: "",
    ownRent: "",
    hasYard: "",
    landlordPermission: false,

    // Pet Experience
    previousPets: "",
    currentPets: "",
    petExperience: "",

    // Lifestyle
    workSchedule: "",
    exerciseTime: "",
    travelFrequency: "",

    // Motivation
    adoptionReason: "",
    expectations: "",

    // Agreement
    agreements: [],
  })

  // 模拟宠物数据
  const pet = {
    id: Number.parseInt(params.id),
    name: "小白",
    type: "狗狗",
    breed: "金毛",
    age: "2岁",
    image: "/placeholder.svg?height=300&width=300",
  }

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // 处理表单提交
    console.log("Form submitted:", formData)
    // 这里可以添加提交到后端的逻辑
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">个人基本信息</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">姓名 *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <Label htmlFor="email">邮箱 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">电话 *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="请输入您的电话号码"
                  />
                </div>
                <div>
                  <Label htmlFor="age">年龄 *</Label>
                  <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择年龄段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25岁</SelectItem>
                      <SelectItem value="26-35">26-35岁</SelectItem>
                      <SelectItem value="36-45">36-45岁</SelectItem>
                      <SelectItem value="46-55">46-55岁</SelectItem>
                      <SelectItem value="55+">55岁以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="occupation">职业 *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="请输入您的职业"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">居住环境</h3>
              <div className="space-y-4">
                <div>
                  <Label>住房类型 *</Label>
                  <RadioGroup
                    value={formData.housingType}
                    onValueChange={(value) => setFormData({ ...formData, housingType: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apartment" id="apartment" />
                      <Label htmlFor="apartment">公寓</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="house" id="house" />
                      <Label htmlFor="house">独栋房屋</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="townhouse" id="townhouse" />
                      <Label htmlFor="townhouse">联排别墅</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>房屋性质 *</Label>
                  <RadioGroup
                    value={formData.ownRent}
                    onValueChange={(value) => setFormData({ ...formData, ownRent: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="own" id="own" />
                      <Label htmlFor="own">自有</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">租赁</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>是否有院子或阳台 *</Label>
                  <RadioGroup
                    value={formData.hasYard}
                    onValueChange={(value) => setFormData({ ...formData, hasYard: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yard-yes" />
                      <Label htmlFor="yard-yes">有</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="yard-no" />
                      <Label htmlFor="yard-no">没有</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.ownRent === "rent" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="landlordPermission"
                      checked={formData.landlordPermission}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, landlordPermission: checked as boolean })
                      }
                    />
                    <Label htmlFor="landlordPermission">我已获得房东同意饲养宠物的许可</Label>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">宠物经验</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="previousPets">您之前是否养过宠物？ *</Label>
                  <Select
                    value={formData.previousPets}
                    onValueChange={(value) => setFormData({ ...formData, previousPets: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">从未养过</SelectItem>
                      <SelectItem value="childhood">小时候养过</SelectItem>
                      <SelectItem value="recent">最近几年养过</SelectItem>
                      <SelectItem value="experienced">有丰富经验</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentPets">您现在是否还有其他宠物？ *</Label>
                  <Select
                    value={formData.currentPets}
                    onValueChange={(value) => setFormData({ ...formData, currentPets: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">没有</SelectItem>
                      <SelectItem value="dog">有狗狗</SelectItem>
                      <SelectItem value="cat">有猫咪</SelectItem>
                      <SelectItem value="other">有其他宠物</SelectItem>
                      <SelectItem value="multiple">有多只宠物</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="petExperience">请描述您的宠物饲养经验</Label>
                  <Textarea
                    id="petExperience"
                    value={formData.petExperience}
                    onChange={(e) => setFormData({ ...formData, petExperience: e.target.value })}
                    placeholder="请详细描述您之前的宠物饲养经验，包括宠物类型、饲养时间等"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">生活方式</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="workSchedule">您的工作时间安排 *</Label>
                  <Select
                    value={formData.workSchedule}
                    onValueChange={(value) => setFormData({ ...formData, workSchedule: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">全职工作（8小时）</SelectItem>
                      <SelectItem value="part-time">兼职工作</SelectItem>
                      <SelectItem value="flexible">弹性工作时间</SelectItem>
                      <SelectItem value="home">在家工作</SelectItem>
                      <SelectItem value="retired">退休</SelectItem>
                      <SelectItem value="student">学生</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="exerciseTime">每天能陪伴宠物运动的时间 *</Label>
                  <Select
                    value={formData.exerciseTime}
                    onValueChange={(value) => setFormData({ ...formData, exerciseTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-30min">少于30分钟</SelectItem>
                      <SelectItem value="30min-1hour">30分钟-1小时</SelectItem>
                      <SelectItem value="1-2hours">1-2小时</SelectItem>
                      <SelectItem value="more-2hours">超过2小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="travelFrequency">您的出差/旅行频率 *</Label>
                  <Select
                    value={formData.travelFrequency}
                    onValueChange={(value) => setFormData({ ...formData, travelFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">很少出行</SelectItem>
                      <SelectItem value="occasionally">偶尔出行</SelectItem>
                      <SelectItem value="monthly">每月1-2次</SelectItem>
                      <SelectItem value="frequently">经常出行</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">领养动机与期望</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adoptionReason">您为什么想要领养这只宠物？ *</Label>
                  <Textarea
                    id="adoptionReason"
                    value={formData.adoptionReason}
                    onChange={(e) => setFormData({ ...formData, adoptionReason: e.target.value })}
                    placeholder="请详细说明您的领养动机"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="expectations">您对这只宠物有什么期望？ *</Label>
                  <Textarea
                    id="expectations"
                    value={formData.expectations}
                    onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                    placeholder="请描述您希望宠物在您家庭中扮演的角色"
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>请确认以下条款：</Label>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="agreement1" />
                      <Label htmlFor="agreement1" className="text-sm leading-relaxed">
                        我承诺为宠物提供充足的食物、水、住所和医疗护理
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="agreement2" />
                      <Label htmlFor="agreement2" className="text-sm leading-relaxed">
                        我承诺定期带宠物进行健康检查和疫苗接种
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="agreement3" />
                      <Label htmlFor="agreement3" className="text-sm leading-relaxed">
                        我承诺不会遗弃宠物，如无法继续饲养会联系救助机构
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="agreement4" />
                      <Label htmlFor="agreement4" className="text-sm leading-relaxed">
                        我同意接受家访和后续跟进服务
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/pets/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回宠物详情
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">领养申请表</h1>
          <p className="text-gray-600">感谢您选择领养，请填写以下信息帮助我们更好地了解您</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Pet Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <Image
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  {pet.name}
                </CardTitle>
                <CardDescription>
                  {pet.breed} • {pet.age}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-gray-600">您正在申请领养这只可爱的{pet.type}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    步骤 {currentStep} / {totalSteps}
                  </CardTitle>
                  <div className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% 完成</div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </CardHeader>
              <CardContent>{renderStep()}</CardContent>
              <div className="p-6 border-t bg-gray-50 flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  上一步
                </Button>
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>下一步</Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    提交申请
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
