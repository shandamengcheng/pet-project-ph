import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Shield, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const featuredPets = [
    {
      id: 1,
      name: "小白",
      type: "狗狗",
      breed: "金毛",
      age: "2岁",
      image: "/placeholder.svg?height=300&width=300",
      description: "温顺友好的金毛，喜欢和小朋友玩耍",
    },
    {
      id: 2,
      name: "咪咪",
      type: "猫咪",
      breed: "英短",
      age: "1岁",
      image: "/placeholder.svg?height=300&width=300",
      description: "安静可爱的英短，适合公寓饲养",
    },
    {
      id: 3,
      name: "豆豆",
      type: "兔子",
      breed: "垂耳兔",
      age: "6个月",
      image: "/placeholder.svg?height=300&width=300",
      description: "活泼的小兔子，毛色雪白",
    },
  ]

  const services = [
    {
      title: "宠物美容",
      description: "专业的宠物美容服务，让您的宠物更加美丽",
      icon: "✂️",
    },
    {
      title: "宠物医疗",
      description: "24小时宠物医疗服务，守护宠物健康",
      icon: "🏥",
    },
    {
      title: "宠物寄养",
      description: "安全舒适的寄养环境，让您出行无忧",
      icon: "🏠",
    },
    {
      title: "宠物训练",
      description: "专业训练师，培养宠物良好习惯",
      icon: "🎾",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                给每个小生命
                <span className="text-blue-600">找到温暖的家</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                我们致力于为流浪动物寻找爱心家庭，同时提供专业的宠物服务，让每个小生命都能得到最好的照顾。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/pets">
                    <Heart className="mr-2 h-5 w-5" />
                    开始领养
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/services">了解服务</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Happy pets"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-gray-600">成功领养</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">爱心家庭</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">合作机构</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">在线服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">等待领养的小天使</h2>
            <p className="text-xl text-gray-600">这些可爱的小生命正在等待一个温暖的家</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">{pet.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pet.name}
                    <span className="text-sm font-normal text-gray-500">{pet.age}</span>
                  </CardTitle>
                  <CardDescription>{pet.breed}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{pet.description}</p>
                  <Button asChild className="w-full">
                    <Link href={`/pets/${pet.id}`}>
                      了解更多
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/pets">
                查看所有宠物
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">专业宠物服务</h2>
            <p className="text-xl text-gray-600">为您的宠物提供全方位的专业服务</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">专业关爱</h3>
              <p className="text-gray-600">每只宠物都得到专业的医疗检查和悉心照料</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">安全保障</h3>
              <p className="text-gray-600">严格的领养流程，确保宠物和家庭的最佳匹配</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">社区支持</h3>
              <p className="text-gray-600">活跃的宠物主人社区，分享经验和互相帮助</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">专业认证</h3>
              <p className="text-gray-600">获得多项动物保护和服务质量认证</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">用户评价</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "通过这个平台领养了我的小狗豆豆，工作人员非常专业，后续服务也很到位。豆豆现在是我们家的开心果！"
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">张女士</div>
                    <div className="text-sm text-gray-500">北京</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "宠物美容服务非常专业，我家的猫咪每次都被打理得很漂亮。价格合理，服务态度也很好。"
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">李先生</div>
                    <div className="text-sm text-gray-500">上海</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "寄养服务让我出差时完全不用担心家里的宠物。环境干净，工作人员很负责，强烈推荐！"
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">王女士</div>
                    <div className="text-sm text-gray-500">广州</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">准备好迎接新家庭成员了吗？</h2>
          <p className="text-xl mb-8 opacity-90">立即开始您的宠物领养之旅，给一个小生命一个温暖的家</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/pets">
                <Heart className="mr-2 h-5 w-5" />
                开始领养
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">联系我们</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
