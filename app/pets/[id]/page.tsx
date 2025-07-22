import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, MapPin, Shield, Stethoscope, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// 模拟宠物数据
const pets = [
  {
    id: 1,
    name: "小白",
    type: "狗狗",
    breed: "金毛",
    age: "2岁",
    gender: "公",
    weight: "25kg",
    location: "北京",
    image: "/placeholder.svg?height=500&width=500",
    gallery: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    description:
      "小白是一只非常温顺友好的金毛犬，特别喜欢和小朋友玩耍。它性格开朗活泼，对人类非常友善，是理想的家庭伴侣。小白已经完成了所有必要的疫苗接种，身体健康状况良好。它喜欢户外活动，每天需要适量的运动来保持健康。",
    personality: ["友善", "活泼", "聪明", "忠诚"],
    medicalHistory: "已完成狂犬疫苗、六联疫苗接种，定期驱虫",
    specialNeeds: "需要每天至少1小时的户外运动",
    adoptionFee: "500元",
    vaccinated: true,
    neutered: false,
    microchipped: true,
    rescueStory:
      "小白是从一个繁殖场救助出来的，之前生活条件不太好。经过我们几个月的悉心照料，现在已经完全恢复健康，正在寻找一个永远的家。",
    idealFamily: "适合有孩子的家庭，需要有院子或经常带它外出运动的家庭",
  },
]

export default function PetDetailPage({ params }: { params: { id: string } }) {
  const pet = pets.find((p) => p.id === Number.parseInt(params.id))

  if (!pet) {
    notFound()
  }

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
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  width={500}
                  height={500}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-blue-600">{pet.type}</Badge>
                  <Badge variant="secondary">{pet.gender}</Badge>
                </div>
                <Button size="sm" variant="secondary" className="absolute top-4 right-4">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>更多照片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {pet.gallery.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${pet.name} photo ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>关于 {pet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{pet.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">性格特点</h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.personality.map((trait, index) => (
                      <Badge key={index} variant="outline">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">救助故事</h4>
                  <p className="text-gray-600 leading-relaxed">{pet.rescueStory}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">理想家庭</h4>
                  <p className="text-gray-600 leading-relaxed">{pet.idealFamily}</p>
                </div>
              </CardContent>
            </Card>

            {/* Medical & Care Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  健康与护理信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">医疗记录</h4>
                  <p className="text-gray-600">{pet.medicalHistory}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">特殊需求</h4>
                  <p className="text-gray-600">{pet.specialNeeds}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div
                    className={`p-3 rounded-lg ${pet.vaccinated ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    <Shield className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{pet.vaccinated ? "已疫苗" : "未疫苗"}</div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${pet.neutered ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    <div className="text-2xl mb-2">✂️</div>
                    <div className="text-sm font-medium">{pet.neutered ? "已绝育" : "未绝育"}</div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${pet.microchipped ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="text-sm font-medium">{pet.microchipped ? "已植入芯片" : "未植入芯片"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pet Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{pet.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {pet.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">品种</span>
                    <div className="font-medium">{pet.breed}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">年龄</span>
                    <div className="font-medium">{pet.age}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">性别</span>
                    <div className="font-medium">{pet.gender}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">体重</span>
                    <div className="font-medium">{pet.weight}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-gray-500 mb-1">领养费用</div>
                  <div className="text-2xl font-bold text-blue-600">{pet.adoptionFee}</div>
                  <div className="text-xs text-gray-500">包含疫苗和健康检查费用</div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/adopt/${pet.id}`}>
                      <Heart className="h-4 w-4 mr-2" />
                      申请领养
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享给朋友
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>联系我们</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="text-gray-500">电话</div>
                  <div className="font-medium">400-123-4567</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">邮箱</div>
                  <div className="font-medium">adopt@petlove.com</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">工作时间</div>
                  <div className="font-medium">周一至周日 9:00-18:00</div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  在线咨询
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>领养小贴士</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• 领养前请确保家人都同意</li>
                  <li>• 准备好宠物用品和生活空间</li>
                  <li>• 了解宠物的特殊需求</li>
                  <li>• 考虑长期的时间和经济投入</li>
                  <li>• 建立与兽医的联系</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
