"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, DollarSign, CheckCircle, Smartphone, Building, Gift } from "lucide-react"

export default function DonatePage() {
  const [donationType, setDonationType] = useState("one-time")
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("alipay")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [step, setStep] = useState(1)

  const presetAmounts = [50, 100, 200, 500, 1000, 2000]

  const projects = [
    {
      id: "rescue",
      title: "紧急救助基金",
      description: "用于救助受伤或生病的流浪动物",
      raised: 45000,
      target: 80000,
      donors: 234,
      urgent: true,
    },
    {
      id: "shelter",
      title: "收容所建设",
      description: "扩建收容所，为更多动物提供安全的家",
      raised: 120000,
      target: 200000,
      donors: 456,
      urgent: false,
    },
    {
      id: "medical",
      title: "医疗设备更新",
      description: "购买先进的医疗设备，提升治疗水平",
      raised: 30000,
      target: 100000,
      donors: 123,
      urgent: false,
    },
  ]

  const [selectedProject, setSelectedProject] = useState("rescue")

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString())
    setCustomAmount("")
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const getCurrentAmount = () => {
    return customAmount || amount
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!getCurrentAmount()) return
    setStep(2)
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold mb-4">感谢您的爱心捐助！</h1>
              <p className="text-gray-600 mb-6">
                您的捐助将直接用于帮助需要救助的动物们。我们会定期向您发送项目进展报告。
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2">捐助详情</h3>
                <div className="space-y-1 text-sm">
                  <div>捐助金额：¥{getCurrentAmount()}</div>
                  <div>捐助项目：{projects.find((p) => p.id === selectedProject)?.title}</div>
                  <div>捐助方式：{donationType === "one-time" ? "单次捐助" : "月度捐助"}</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/")}>返回首页</Button>
                <Button variant="outline" onClick={() => setStep(1)}>
                  继续捐助
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
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">爱心捐助</h1>
          <p className="text-xl text-gray-600">您的每一份爱心都能改变一个小生命的命运</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type */}
              <Card>
                <CardHeader>
                  <CardTitle>选择捐助方式</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={donationType} onValueChange={setDonationType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">单次捐助</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">月度捐助</Label>
                      <Badge variant="secondary" className="ml-2">
                        推荐
                      </Badge>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Project Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>选择捐助项目</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedProject === project.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold flex items-center">
                              {project.title}
                              {project.urgent && (
                                <Badge variant="destructive" className="ml-2 text-xs">
                                  紧急
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>已筹集：¥{project.raised.toLocaleString()}</span>
                            <span>目标：¥{project.target.toLocaleString()}</span>
                          </div>
                          <Progress value={(project.raised / project.target) * 100} />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{project.donors} 位爱心人士参与</span>
                            <span>{Math.round((project.raised / project.target) * 100)}% 完成</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amount Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>选择捐助金额</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {presetAmounts.map((presetAmount) => (
                        <button
                          key={presetAmount}
                          type="button"
                          onClick={() => handleAmountSelect(presetAmount)}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            amount === presetAmount.toString()
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          ¥{presetAmount}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount">自定义金额</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="请输入金额"
                          className="pl-10"
                          value={customAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>选择支付方式</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="alipay" id="alipay" />
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-blue-600" />
                          <Label htmlFor="alipay">支付宝</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="wechat" id="wechat" />
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <Label htmlFor="wechat">微信支付</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="bank" id="bank" />
                        <div className="flex items-center space-x-2">
                          <Building className="h-5 w-5 text-gray-600" />
                          <Label htmlFor="bank">银行转账</Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <Card>
                <CardHeader>
                  <CardTitle>其他选项</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <Label htmlFor="anonymous">匿名捐助</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">留言（可选）</Label>
                      <Textarea id="message" placeholder="您可以留下鼓励的话语..." rows={3} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg" disabled={!getCurrentAmount()}>
                <Heart className="h-4 w-4 mr-2" />
                捐助 ¥{getCurrentAmount() || "0"}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>您的捐助影响</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">¥50</div>
                    <div className="text-sm text-gray-600">可为一只小动物提供一周的食物</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">¥200</div>
                    <div className="text-sm text-gray-600">可支付一次基础医疗检查</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">¥500</div>
                    <div className="text-sm text-gray-600">可救助一只重伤的流浪动物</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donors */}
            <Card>
              <CardHeader>
                <CardTitle>最近的爱心人士</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        张
                      </div>
                      <span className="text-sm">张**</span>
                    </div>
                    <span className="text-sm text-gray-600">¥200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                        李
                      </div>
                      <span className="text-sm">李**</span>
                    </div>
                    <span className="text-sm text-gray-600">¥100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        王
                      </div>
                      <span className="text-sm">王**</span>
                    </div>
                    <span className="text-sm text-gray-600">¥500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm">
                        匿
                      </div>
                      <span className="text-sm">匿名用户</span>
                    </div>
                    <span className="text-sm text-gray-600">¥300</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Deduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  税收优惠
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  我们是合法注册的非营利组织，您的捐助可以申请税收减免。 我们会为您提供正式的捐助证明。
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>需要帮助？</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>电话：400-123-4567</div>
                  <div>邮箱：donate@petlove.com</div>
                  <div>工作时间：周一至周日 9:00-18:00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
