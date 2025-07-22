import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle, Share2, Eye, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // 模拟文章数据
  const article = {
    id: Number.parseInt(params.id),
    title: "新手养狗完全指南：从选择到日常护理",
    content: `
      <p>欢迎来到养狗的美妙世界！作为新手铲屎官，选择合适的狗狗品种并了解基本的护理知识是非常重要的。本指南将为您提供从选择狗狗到日常护理的全面信息。</p>
      
      <h2>选择合适的狗狗品种</h2>
      <p>选择狗狗品种时需要考虑以下几个因素：</p>
      <ul>
        <li><strong>居住环境：</strong>公寓适合小型犬，有院子的房屋可以考虑大型犬</li>
        <li><strong>运动需求：</strong>高能量品种需要更多运动时间</li>
        <li><strong>性格匹配：</strong>选择性格与您生活方式相符的品种</li>
        <li><strong>护理需求：</strong>长毛犬需要更多的梳理时间</li>
      </ul>
      
      <h2>基本用品准备</h2>
      <p>在迎接新狗狗之前，您需要准备以下基本用品：</p>
      <ul>
        <li>狗粮和食盆、水盆</li>
        <li>狗床和毯子</li>
        <li>项圈和牵引绳</li>
        <li>玩具和咀嚼用品</li>
        <li>清洁用品</li>
      </ul>
      
      <h2>日常护理要点</h2>
      <p>良好的日常护理是保持狗狗健康的关键：</p>
      <ul>
        <li><strong>饮食管理：</strong>定时定量喂食，选择优质狗粮</li>
        <li><strong>运动锻炼：</strong>每天至少30分钟的运动时间</li>
        <li><strong>清洁护理：</strong>定期洗澡、梳毛、剪指甲</li>
        <li><strong>健康监测：</strong>观察狗狗的精神状态和食欲</li>
        <li><strong>定期体检：</strong>每年至少一次兽医检查</li>
      </ul>
      
      <h2>训练基础</h2>
      <p>基本的训练对于狗狗的社会化非常重要：</p>
      <ul>
        <li>如厕训练</li>
        <li>基本指令（坐、留、来）</li>
        <li>社交训练</li>
        <li>咀嚼行为管理</li>
      </ul>
      
      <h2>常见问题解答</h2>
      <p><strong>Q: 幼犬多久洗一次澡？</strong></p>
      <p>A: 一般建议每2-4周洗一次澡，具体频率取决于狗狗的活动量和毛发类型。</p>
      
      <p><strong>Q: 如何处理狗狗的分离焦虑？</strong></p>
      <p>A: 逐步训练狗狗独处，提供足够的精神刺激，创造积极的独处体验。</p>
      
      <p>养狗是一个长期的承诺，需要耐心和爱心。随着时间的推移，您会发现养狗带来的快乐远远超过付出的努力。记住，每只狗狗都是独特的个体，需要根据具体情况调整护理方式。</p>
    `,
    excerpt: "准备迎接一只新的狗狗家庭成员？这份详细指南将帮助您了解从选择合适的品种到日常护理的所有要点。",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "李医生",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "资深宠物医师，从事宠物医疗工作15年",
      articles: 42,
    },
    date: "2024-01-15",
    category: "养护指南",
    readTime: "8分钟",
    views: 1234,
    likes: 128,
    comments: 24,
    tags: ["新手指南", "狗狗护理", "宠物健康", "训练技巧"],
  }

  const relatedArticles = [
    {
      id: 2,
      title: "猫咪行为解读：理解您的猫咪在想什么",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-01-12",
      readTime: "6分钟",
    },
    {
      id: 3,
      title: "宠物营养搭配：如何为您的宠物制定健康饮食",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-01-10",
      readTime: "5分钟",
    },
    {
      id: 4,
      title: "宠物急救知识：关键时刻能救命的技能",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-01-08",
      readTime: "10分钟",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回博客列表
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-600">{article.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views} 阅读
                      </div>
                    </div>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

                  <p className="text-xl text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between py-4 border-t border-b">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{article.author.name}</div>
                        <div className="text-sm text-gray-500">{article.author.bio}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {article.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="font-semibold mb-4">文章标签</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">评论 ({article.comments})</h3>
                </div>

                <div className="text-center py-12 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>评论功能开发中...</p>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{article.author.name}</CardTitle>
                <CardDescription>{article.author.bio}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center gap-4 text-sm">
                  <div>
                    <div className="font-semibold">{article.author.articles}</div>
                    <div className="text-gray-500">文章</div>
                  </div>
                  <div>
                    <div className="font-semibold">2.1k</div>
                    <div className="text-gray-500">关注者</div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  关注作者
                </Button>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  目录
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2 text-sm">
                  <a href="#选择合适的狗狗品种" className="block hover:text-blue-600 transition-colors">
                    选择合适的狗狗品种
                  </a>
                  <a href="#基本用品准备" className="block hover:text-blue-600 transition-colors">
                    基本用品准备
                  </a>
                  <a href="#日常护理要点" className="block hover:text-blue-600 transition-colors">
                    日常护理要点
                  </a>
                  <a href="#训练基础" className="block hover:text-blue-600 transition-colors">
                    训练基础
                  </a>
                  <a href="#常见问题解答" className="block hover:text-blue-600 transition-colors">
                    常见问题解答
                  </a>
                </nav>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>相关文章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/blog/${related.id}`} className="block group">
                      <div className="flex gap-3">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          width={80}
                          height={60}
                          className="rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {related.date}
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {related.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>订阅更新</CardTitle>
                <CardDescription>获取最新的宠物护理知识</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="输入您的邮箱"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Button className="w-full">订阅</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
