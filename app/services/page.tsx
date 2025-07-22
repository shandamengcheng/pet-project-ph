import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, Stethoscope, Home, GraduationCap, Shield, Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "grooming",
      title: "宠物美容",
      description: "专业的宠物美容服务，让您的宠物更加美丽健康",
      icon: Scissors,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥80 起",
      duration: "1-3小时",
      features: ["洗澡护理", "毛发修剪", "指甲修剪", "耳朵清洁", "造型设计"],
      popular: true,
    },
    {
      id: "medical",
      title: "宠物医疗",
      description: "24小时专业宠物医疗服务，守护宠物健康",
      icon: Stethoscope,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥150 起",
      duration: "30分钟-2小时",
      features: ["健康检查", "疫苗接种", "疾病治疗", "手术服务", "急诊服务"],
      popular: false,
    },
    {
      id: "boarding",
      title: "宠物寄养",
      description: "安全舒适的寄养环境，让您出行无忧",
      icon: Home,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥60/天 起",
      duration: "按天计算",
      features: ["24小时监护", "定时喂食", "运动陪伴", "健康监测", "视频探望"],
      popular: true,
    },
    {
      id: "training",
      title: "宠物训练",
      description: "专业训练师，培养宠物良好习惯",
      icon: GraduationCap,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥200/课 起",
      duration: "1小时/课",
      features: ["基础训练", "行为纠正", "社交训练", "技能培训", "一对一指导"],
      popular: false,
    },
    {
      id: "insurance",
      title: "宠物保险",
      description: "全面的宠物保险服务，为宠物健康保驾护航",
      icon: Shield,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥30/月 起",
      duration: "年度保障",
      features: ["医疗费用", "意外保障", "疾病治疗", "手术费用", "紧急救护"],
      popular: false,
    },
    {
      id: "daycare",
      title: "宠物日托",
      description: "白天托管服务，让上班族也能安心工作",
      icon: Clock,
      image: "/placeholder.svg?height=300&width=400",
      price: "从 ¥80/天 起",
      duration: "8小时",
      features: ["全天陪伴", "游戏活动", "社交互动", "定时喂食", "健康监护"],
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">专业宠物服务</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            为您的宠物提供全方位的专业服务，从美容护理到医疗保健，我们都能满足您的需求
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
                {service.popular && <Badge className="absolute top-4 right-4 z-10 bg-orange-500">热门</Badge>}
                <div className="relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <IconComponent className="h-8 w-8 mb-2" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {service.title}
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{service.price}</div>
                      <div className="text-xs text-gray-500">{service.duration}</div>
                    </div>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">服务内容：</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/services/${service.id}`}>了解详情</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/booking?service=${service.id}`}>立即预约</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们的服务</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">专业团队</h3>
              <p className="text-gray-600">经验丰富的专业团队，持证上岗</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">安全保障</h3>
              <p className="text-gray-600">严格的安全标准和保险保障</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">便捷服务</h3>
              <p className="text-gray-600">在线预约，上门接送服务</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">贴心跟进</h3>
              <p className="text-gray-600">服务后跟进，确保宠物健康</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好为您的宠物预约服务了吗？</h2>
          <p className="text-xl mb-8 opacity-90">立即预约，享受专业的宠物服务</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/booking">立即预约服务</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">咨询客服</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
