"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Clock, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    specialRequests: "",
    serviceType: "in-store", // in-store, home-visit
  })

  const services = [
    {
      id: "grooming",
      name: "宠物美容",
      price: "¥80-200",
      duration: "1-3小时",
      description: "专业美容护理服务",
    },
    {
      id: "medical",
      name: "宠物医疗",
      price: "¥150-500",
      duration: "30分钟-2小时",
      description: "健康检查和医疗服务",
    },
    {
      id: "training",
      name: "宠物训练",
      price: "¥200-400",
      duration: "1小时",
      description: "专业训练指导服务",
    },
    {
      id: "boarding",
      name: "宠物寄养",
      price: "¥60-120/天",
      duration: "按天计算",
      description: "安全舒适的寄养服务",
    },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("Booking submitted:", formData)
    setStep(4) // Success step
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
              <h1 className="text-2xl font-bold mb-4">预约成功！</h1>
              <p className="text-gray-600 mb-6">您的预约已成功提交，我们将在24小时内与您联系确认详细信息。</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2">预约详情</h3>
                <div className="space-y-1 text-sm">
                  <div>服务：{services.find((s) => s.id === formData.service)?.name}</div>
                  <div>日期：{formData.date}</div>
                  <div>时间：{formData.time}</div>
                  <div>宠物：{formData.petName}</div>
                  <div>联系人：{formData.ownerName}</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/")}>返回首页</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/services")}>
                  查看更多服务
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">预约服务</h1>
          <p className="text-gray-600">为您的宠物预约专业服务</p>
        </div>

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
                  {i === 1 ? "选择服务" : i === 2 ? "选择时间" : "填写信息"}
                </span>
                {i < 3 && <div className="w-12 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>选择服务类型</CardTitle>
              <CardDescription>请选择您需要的服务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedService(service.id)
                      setFormData({ ...formData, service: service.id })
                    }}
                  >
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">{service.price}</span>
                      <span className="text-gray-500">{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleNext} disabled={!selectedService}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>选择日期和时间</CardTitle>
              <CardDescription>请选择您方便的日期和时间</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">服务方式</Label>
                <RadioGroup
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-store" id="in-store" />
                    <Label htmlFor="in-store">到店服务</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home-visit" id="home-visit" />
                    <Label htmlFor="home-visit">上门服务 (+¥50)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">选择日期</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: zhCN }) : "选择日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date)
                          setFormData({ ...formData, date: date ? format(date, "yyyy-MM-dd") : "" })
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">选择时间</Label>
                  <Select
                    value={selectedTime}
                    onValueChange={(value) => {
                      setSelectedTime(value)
                      setFormData({ ...formData, time: value })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择时间" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  上一步
                </Button>
                <Button onClick={handleNext} disabled={!selectedDate || !selectedTime}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>填写详细信息</CardTitle>
              <CardDescription>请填写您和宠物的基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">宠物信息</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="petName">宠物姓名 *</Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        placeholder="请输入宠物姓名"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petType">宠物类型 *</Label>
                      <Select
                        value={formData.petType}
                        onValueChange={(value) => setFormData({ ...formData, petType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择宠物类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">狗狗</SelectItem>
                          <SelectItem value="cat">猫咪</SelectItem>
                          <SelectItem value="rabbit">兔子</SelectItem>
                          <SelectItem value="bird">鸟类</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="petBreed">品种</Label>
                      <Input
                        id="petBreed"
                        value={formData.petBreed}
                        onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                        placeholder="请输入品种"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petAge">年龄</Label>
                      <Input
                        id="petAge"
                        value={formData.petAge}
                        onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                        placeholder="请输入年龄"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">联系信息</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">姓名 *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">电话 *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="请输入联系电话"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">地址 {formData.serviceType === "home-visit" && "*"}</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder={formData.serviceType === "home-visit" ? "请输入详细地址" : "可选"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">特殊要求</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="如有特殊要求请在这里说明..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious}>
                  上一步
                </Button>
                <Button onClick={handleSubmit}>确认预约</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-4">需要帮助？</h3>
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  400-123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  service@petlove.com
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  北京市朝阳区
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
