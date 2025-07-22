"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, ArrowLeft, MapPin, Calendar, Shield, Stethoscope, Camera, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PetDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 模拟宠物数据
  const pet = {
    id: Number.parseInt(params.id),
    name: "小白",
    type: "狗狗",
    breed: "金毛寻回犬",
    age: "2岁",
    gender: "公",
    weight: "25kg",
    location: "北京市朝阳区",
    arrivalDate: "2024-01-10",
    images: [
      "/placeholder.svg?height=400&width=600&text=小白正面照",
      "/placeholder.svg?height=400&width=600&text=小白侧面照",
      "/placeholder.svg?height=400&width=600&text=小白玩耍照",
      "/placeholder.svg?height=400&width=600&text=小白睡觉照",
    ],
    video: "/placeholder.mp4",
    description:
      "小白是一只非常温顺友好的金毛寻回犬，它有着金黄色的毛发和温和的性格。小白特别喜欢和人互动，也很喜欢和小朋友玩耍。它已经完成了所有必要的疫苗接种，身体健康状况良好。",
    personality: ["温顺友好", "活泼好动", "容易训练", "喜欢游泳", "对小孩友善"],
    medicalHistory: [
      {
        date: "2024-01-15",
        type: "疫苗接种",
        description: "完成狂犬病疫苗接种",
        vet: "李医生",
      },
      {
        date: "2024-01-10",
        type: "健康检查",
        description: "入院全面体检，身体状况良好",
        vet: "张医生",
      },
    ],
    careNeeds: ["每天需要1-2小时运动", "定期梳理毛发", "均衡营养饮食", "定期健康检查"],
    vaccinated: true,
    neutered: false,
    microchipped: true,
    rescueStory:
      "小白是在一个雨夜被发现的，当时它又冷又饿，躲在一个废弃的纸箱里。救助人员将它带回后，经过悉心照料，小白很快恢复了健康，展现出了金毛犬特有的温和性格。现在的小白健康活泼，正在寻找一个永远的家。",
    adoptionRequirements: [
      "有固定居所",
      "有饲养宠物经验者优先",
      "能够提供充足的运动空间",
      "定期医疗护理",
      "家庭成员同意",
    ],
  }

  const similarPets = [
    {
      id: 2,
      name: "大黄",
      type: "狗狗",
      breed: "中华田园犬",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      name: "小金",
      type: "狗狗",
      breed: "金毛",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 8,
      name: "旺财",
      type: "狗狗",
      breed: "拉布拉多",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/pets">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回宠物列表
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src={pet.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${pet.name} - 图片 ${currentImageIndex + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Camera className="h-4 w-4 mr-1" />
                    {pet.images.length}
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {pet.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {pet.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${pet.name} 缩略图 ${index + 1}`}
                        width={80}
                        height={60}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Pet Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概况</TabsTrigger>
                <TabsTrigger value="personality">性格</TabsTrigger>
                <TabsTrigger value="medical">医疗</TabsTrigger>
                <TabsTrigger value="story">故事</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">品种</div>
                        <div className="font-medium">{pet.breed}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">年龄</div>
                        <div className="font-medium">{pet.age}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">性别</div>
                        <div className="font-medium">{pet.gender}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">体重</div>
                        <div className="font-medium">{pet.weight}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">所在地</div>
                        <div className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pet.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">到达日期</div>
                        <div className="font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {pet.arrivalDate}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>详细描述</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{pet.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>护理需求</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pet.careNeeds.map((need, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personality" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>性格特点</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pet.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-700">
                      {pet.name}是一只性格温和的{pet.breed}，它展现出了该品种典型的友好特质。特别适合有小孩的家庭，
                      也能很好地与其他宠物相处。它聪明易训练，是理想的家庭伴侣。
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>健康状况</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            pet.vaccinated ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          <Shield className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium">疫苗接种</div>
                        <div className="text-xs text-gray-500">{pet.vaccinated ? "已完成" : "未完成"}</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            pet.neutered ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          <Stethoscope className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium">绝育手术</div>
                        <div className="text-xs text-gray-500">{pet.neutered ? "已完成" : "未完成"}</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            pet.microchipped ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          <Shield className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium">芯片植入</div>
                        <div className="text-xs text-gray-500">{pet.microchipped ? "已完成" : "未完成"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>医疗记录</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pet.medicalHistory.map((record, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium text-sm">{record.type}</div>
                            <div className="text-xs text-gray-500">{record.date}</div>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{record.description}</div>
                          <div className="text-xs text-gray-500">医生：{record.vet}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="story" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>救助故事</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{pet.rescueStory}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pet Summary Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{pet.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsFavorited(!isFavorited)}>
                      <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {pet.breed} • {pet.age} • {pet.gender}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-blue-600">{pet.type}</Badge>
                  {pet.vaccinated && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      已疫苗
                    </Badge>
                  )}
                  {pet.microchipped && (
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      已植入芯片
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/adopt/${pet.id}`}>申请领养</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    预约见面
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    联系我们
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adoption Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>领养要求</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {pet.adoptionRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Similar Pets */}
            <Card>
              <CardHeader>
                <CardTitle>相似宠物</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {similarPets.map((similarPet) => (
                    <Link
                      key={similarPet.id}
                      href={`/pets/${similarPet.id}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={similarPet.image || "/placeholder.svg"}
                        alt={similarPet.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{similarPet.name}</div>
                        <div className="text-xs text-gray-500">{similarPet.breed}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">救助中心</div>
                  <div className="text-gray-600">爱宠之家</div>
                </div>
                <div>
                  <div className="font-medium">电话</div>
                  <div className="text-gray-600">400-123-4567</div>
                </div>
                <div>
                  <div className="font-medium">地址</div>
                  <div className="text-gray-600">{pet.location}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
