"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Calendar, Clock, MapPin, Edit, Users, BookOpen, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user] = useState({
    name: "张小明",
    email: "zhangxiaoming@example.com",
    phone: "138****5678",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2023-06-15",
    city: "北京",
    memberLevel: "爱心会员",
    points: 1250,
    nextLevelPoints: 2000,
  })

  const [adoptionApplications] = useState([
    {
      id: 1,
      petName: "小白",
      petImage: "/placeholder.svg?height=60&width=60",
      status: "审核中",
      appliedDate: "2024-01-20",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 2,
      petName: "咪咪",
      petImage: "/placeholder.svg?height=60&width=60",
      status: "已通过",
      appliedDate: "2024-01-15",
      statusColor: "bg-green-100 text-green-800",
    },
  ])

  const [bookings] = useState([
    {
      id: 1,
      service: "宠物美容",
      petName: "小白",
      date: "2024-01-25",
      time: "14:00",
      status: "已确认",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      service: "健康检查",
      petName: "咪咪",
      date: "2024-01-30",
      time: "10:00",
      status: "待确认",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ])

  const [volunteerActivities] = useState([
    {
      id: 1,
      title: "周末救助活动",
      date: "2024-01-27",
      time: "09:00-17:00",
      location: "朝阳区救助中心",
      participants: 12,
      status: "已报名",
    },
    {
      id: 2,
      title: "宠物领养日",
      date: "2024-02-03",
      time: "10:00-16:00",
      location: "奥林匹克公园",
      participants: 25,
      status: "可报名",
    },
  ])

  const [favoriteArticles] = useState([
    {
      id: 1,
      title: "新手养狗完全指南",
      author: "李医生",
      readTime: "8分钟",
      date: "2024-01-15",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 2,
      title: "猫咪行为解读指南",
      author: "王医生",
      readTime: "6分钟",
      date: "2024-01-12",
      image: "/placeholder.svg?height=60&width=80",
    },
  ])

  const [stats] = useState({
    adoptionApplications: 2,
    completedBookings: 5,
    volunteerHours: 24,
    articlesRead: 15,
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
              <p className="text-gray-600">管理您的账户和活动</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              设置
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {user.memberLevel}
                  </Badge>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.city}
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      加入于 {user.joinDate}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑资料
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Points Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">爱心积分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{user.points}</div>
                  <div className="text-sm text-gray-600 mb-4">
                    距离下一级别还需 {user.nextLevelPoints - user.points} 积分
                  </div>
                  <Progress value={(user.points / user.nextLevelPoints) * 100} className="mb-4" />
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    积分商城
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">活动统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">领养申请</span>
                    </div>
                    <span className="font-semibold">{stats.adoptionApplications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">服务预约</span>
                    </div>
                    <span className="font-semibold">{stats.completedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">志愿时长</span>
                    </div>
                    <span className="font-semibold">{stats.volunteerHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm">阅读文章</span>
                    </div>
                    <span className="font-semibold">{stats.articlesRead}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="adoptions">领养</TabsTrigger>
                <TabsTrigger value="bookings">预约</TabsTrigger>
                <TabsTrigger value="volunteer">志愿</TabsTrigger>
                <TabsTrigger value="favorites">收藏</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>最近活动</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">提交了小白的领养申请</p>
                          <p className="text-xs text-gray-500">2024-01-20</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">完成了宠物美容服务</p>
                          <p className="text-xs text-gray-500">2024-01-18</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">参加了志愿者培训</p>
                          <p className="text-xs text-gray-500">2024-01-15</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>即将到来的活动</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium">宠物美容预约</h4>
                            <p className="text-sm text-gray-600">1月25日 14:00</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          查看详情
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium">周末救助活动</h4>
                            <p className="text-sm text-gray-600">1月27日 09:00</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="adoptions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>我的领养申请</CardTitle>
                      <Button asChild>
                        <Link href="/pets">浏览宠物</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adoptionApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <img
                              src={application.petImage || "/placeholder.svg"}
                              alt={application.petName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{application.petName}</h4>
                              <p className="text-sm text-gray-600">申请日期：{application.appliedDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={application.statusColor}>{application.status}</Badge>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              查看详情
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>我的预约</CardTitle>
                      <Button asChild>
                        <Link href="/booking">新建预约</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{booking.service}</h4>
                            <p className="text-sm text-gray-600">宠物：{booking.petName}</p>
                            <p className="text-sm text-gray-600">
                              时间：{booking.date} {booking.time}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={booking.statusColor}>{booking.status}</Badge>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              管理
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>志愿者活动</CardTitle>
                      <Button asChild>
                        <Link href="/volunteer">申请志愿者</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerActivities.map((activity) => (
                        <div key={activity.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{activity.title}</h4>
                            <Badge variant={activity.status === "已报名" ? "default" : "outline"}>
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {activity.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {activity.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {activity.participants} 人参与
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              {activity.status === "已报名" ? "查看详情" : "立即报名"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>收藏的文章</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {favoriteArticles.map((article) => (
                        <div
                          key={article.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{article.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>作者：{article.author}</span>
                              <span>阅读时长：{article.readTime}</span>
                              <span>{article.date}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            阅读
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
