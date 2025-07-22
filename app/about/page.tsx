import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Users, Award, Calendar, MapPin, Phone, Mail, Target, Eye, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "救助动物", value: "2,000+", icon: Heart },
    { label: "成功领养", value: "1,500+", icon: Users },
    { label: "志愿者", value: "300+", icon: Award },
    { label: "运营年限", value: "8年", icon: Calendar },
  ]

  const team = [
    {
      name: "张医生",
      role: "创始人 & 首席兽医",
      image: "/placeholder.svg?height=200&width=200",
      bio: "从事宠物医疗工作20年，致力于动物福利事业",
      specialties: ["外科手术", "内科诊疗", "动物行为"],
    },
    {
      name: "李护士长",
      role: "护理部主任",
      image: "/placeholder.svg?height=200&width=200",
      bio: "专业的动物护理专家，负责日常护理工作",
      specialties: ["护理管理", "康复护理", "营养调配"],
    },
    {
      name: "王训练师",
      role: "行为训练师",
      image: "/placeholder.svg?height=200&width=200",
      bio: "动物行为学专家，帮助宠物适应新环境",
      specialties: ["行为训练", "社会化训练", "问题行为矫正"],
    },
    {
      name: "陈志愿者",
      role: "志愿者协调员",
      image: "/placeholder.svg?height=200&width=200",
      bio: "组织和协调志愿者活动，推广动物保护理念",
      specialties: ["志愿者管理", "活动组织", "宣传推广"],
    },
  ]

  const milestones = [
    {
      year: "2016",
      title: "成立爱宠之家",
      description: "在北京成立第一个救助中心",
    },
    {
      year: "2018",
      title: "扩展服务范围",
      description: "增加宠物医疗和训练服务",
    },
    {
      year: "2020",
      title: "数字化转型",
      description: "推出线上平台，提升服务效率",
    },
    {
      year: "2022",
      title: "开设分中心",
      description: "在上海和广州开设分中心",
    },
    {
      year: "2024",
      title: "全面升级",
      description: "推出新网站和移动应用",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">关于爱宠之家</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我们是一个致力于动物救助、保护和福利的非营利组织。自2016年成立以来，
            我们已经成功救助了超过2000只动物，帮助1500多只宠物找到了温暖的家。
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <CardTitle>我们的使命</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                为无家可归的动物提供安全的避风港，帮助它们找到爱它们的家庭， 同时教育公众关于负责任的宠物饲养。
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8" />
              </div>
              <CardTitle>我们的愿景</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                创建一个没有流浪动物的世界，每只动物都能得到应有的关爱和尊重， 生活在安全、健康的环境中。
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <CardTitle>我们的价值观</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                以爱心、责任和专业为核心，倡导人与动物和谐共处， 通过教育和行动促进动物福利事业的发展。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的成就</h2>
            <p className="text-gray-600">用数字见证我们对动物福利事业的贡献</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的团队</h2>
            <p className="text-gray-600">专业、passionate的团队成员</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">发展历程</h2>
            <p className="text-gray-600">见证我们成长的重要时刻</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 ml-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>联系我们</CardTitle>
              <CardDescription>欢迎您联系我们了解更多信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">北京总部</div>
                  <div className="text-gray-600 text-sm">北京市朝阳区宠物大街123号</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">电话</div>
                  <div className="text-gray-600 text-sm">400-123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">邮箱</div>
                  <div className="text-gray-600 text-sm">info@petlove.com</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>参与方式</CardTitle>
              <CardDescription>有多种方式可以支持我们的事业</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/pets">领养宠物</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/volunteer">成为志愿者</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/donate">爱心捐助</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/contact">联系我们</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">加入我们的使命</h2>
          <p className="text-xl mb-8 opacity-90">每一个小小的行动都能为动物们带来巨大的改变</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/pets">开始领养</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/volunteer">志愿服务</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
