import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "新手养狗完全指南：从选择到日常护理",
    excerpt: "准备迎接一只新的狗狗家庭成员？这份详细指南将帮助您了解从选择合适的品种到日常护理的所有要点。",
    image: "/placeholder.svg?height=400&width=600",
    author: "李医生",
    date: "2024-01-15",
    category: "养护指南",
    readTime: "8分钟",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "猫咪行为解读：理解您的猫咪在想什么",
      excerpt: "猫咪的行为往往充满神秘色彩，了解这些行为背后的含义能帮助您更好地与猫咪沟通。",
      image: "/placeholder.svg?height=200&width=300",
      author: "张兽医",
      date: "2024-01-12",
      category: "行为训练",
      readTime: "6分钟",
    },
    {
      id: 3,
      title: "宠物营养搭配：如何为您的宠物制定健康饮食",
      excerpt: "正确的营养搭配是宠物健康的基础，了解不同年龄段宠物的营养需求。",
      image: "/placeholder.svg?height=200&width=300",
      author: "王营养师",
      date: "2024-01-10",
      category: "健康饮食",
      readTime: "5分钟",
    },
    {
      id: 4,
      title: "宠物急救知识：关键时刻能救命的技能",
      excerpt: "学习基本的宠物急救知识，在紧急情况下为您的宠物争取宝贵时间。",
      image: "/placeholder.svg?height=200&width=300",
      author: "陈医生",
      date: "2024-01-08",
      category: "医疗健康",
      readTime: "10分钟",
    },
    {
      id: 5,
      title: "季节性宠物护理：春夏秋冬的不同注意事项",
      excerpt: "不同季节对宠物护理有不同要求，了解季节性护理要点让宠物更健康。",
      image: "/placeholder.svg?height=200&width=300",
      author: "刘护理师",
      date: "2024-01-05",
      category: "养护指南",
      readTime: "7分钟",
    },
    {
      id: 6,
      title: "宠物社交训练：让您的宠物更好地适应社会",
      excerpt: "良好的社交能力对宠物的心理健康很重要，学习如何进行社交训练。",
      image: "/placeholder.svg?height=200&width=300",
      author: "赵训练师",
      date: "2024-01-03",
      category: "行为训练",
      readTime: "9分钟",
    },
    {
      id: 7,
      title: "老年宠物护理：给年迈宠物最好的关爱",
      excerpt: "随着宠物年龄增长，它们需要特殊的护理和关注，了解老年宠物的特殊需求。",
      image: "/placeholder.svg?height=200&width=300",
      author: "孙医生",
      date: "2024-01-01",
      category: "医疗健康",
      readTime: "8分钟",
    },
  ]

  const categories = [
    { name: "全部", count: 25 },
    { name: "养护指南", count: 8 },
    { name: "医疗健康", count: 6 },
    { name: "行为训练", count: 5 },
    { name: "健康饮食", count: 4 },
    { name: "领养故事", count: 2 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">宠物知识博客</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享专业的宠物护理知识，帮助您更好地照顾您的宠物伙伴
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="搜索文章..." className="pl-10 h-12 text-lg" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-12 overflow-hidden">
              <div className="relative">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-orange-500">精选文章</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Badge variant="outline">{featuredPost.category}</Badge>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <CardTitle className="text-2xl lg:text-3xl mb-3">{featuredPost.title}</CardTitle>
                <CardDescription className="text-lg">{featuredPost.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      阅读全文
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-4 text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                      <span>128</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500">
                      <MessageCircle className="h-4 w-4" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-500">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                        <span>•</span>
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>阅读更多</Link>
                      </Button>
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <button className="flex items-center gap-1 hover:text-red-500">
                          <Heart className="h-4 w-4" />
                          <span>45</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span>12</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                加载更多文章
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>文章分类</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>热门文章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">{post.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>订阅我们的博客</CardTitle>
                <CardDescription>获取最新的宠物护理知识和技巧</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="输入您的邮箱" />
                  <Button className="w-full">订阅更新</Button>
                  <p className="text-xs text-gray-500">我们承诺不会发送垃圾邮件，您可以随时取消订阅。</p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>热门标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["狗狗护理", "猫咪行为", "宠物营养", "疫苗接种", "训练技巧", "急救知识", "老年宠物", "幼宠护理"].map(
                    (tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
