import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">有任何问题或需要帮助？我们随时为您服务</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>发送消息</CardTitle>
                <CardDescription>请填写以下表单，我们会尽快回复您</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名 *</Label>
                      <Input id="name" placeholder="请输入您的姓名" />
                    </div>
                    <div>
                      <Label htmlFor="email">邮箱 *</Label>
                      <Input id="email" type="email" placeholder="请输入您的邮箱" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">电话</Label>
                      <Input id="phone" placeholder="请输入您的电话号码" />
                    </div>
                    <div>
                      <Label htmlFor="subject">咨询类型 *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择咨询类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adoption">宠物领养</SelectItem>
                          <SelectItem value="services">服务咨询</SelectItem>
                          <SelectItem value="volunteer">志愿者申请</SelectItem>
                          <SelectItem value="donation">爱心捐助</SelectItem>
                          <SelectItem value="complaint">投诉建议</SelectItem>
                          <SelectItem value="other">其他问题</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">详细信息 *</Label>
                    <Textarea id="message" placeholder="请详细描述您的问题或需求..." rows={6} />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    发送消息
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">地址</div>
                    <div className="text-gray-600 text-sm">
                      北京市朝阳区宠物大街123号
                      <br />
                      爱宠之家救助中心
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium">电话</div>
                    <div className="text-gray-600 text-sm">
                      400-123-4567
                      <br />
                      010-12345678
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <div className="font-medium">邮箱</div>
                    <div className="text-gray-600 text-sm">
                      info@petlove.com
                      <br />
                      adopt@petlove.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-medium">工作时间</div>
                    <div className="text-gray-600 text-sm">
                      周一至周日
                      <br />
                      上午 9:00 - 下午 6:00
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">紧急联系</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">24小时急救热线</div>
                    <div className="text-lg font-bold text-red-600">400-999-8888</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    如果您发现受伤或需要紧急救助的动物，请立即拨打我们的24小时急救热线。
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <a href="tel:400-123-4567">
                    <Phone className="h-4 w-4 mr-2" />
                    立即致电
                  </a>
                </Button>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <a href="mailto:info@petlove.com">
                    <Mail className="h-4 w-4 mr-2" />
                    发送邮件
                  </a>
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  在线客服
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>常见问题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Q: 领养需要什么条件？</div>
                    <div className="text-gray-600">A: 需要填写申请表，通过家访审核。</div>
                  </div>
                  <div>
                    <div className="font-medium">Q: 领养是否收费？</div>
                    <div className="text-gray-600">A: 只收取疫苗和绝育等医疗费用。</div>
                  </div>
                  <div>
                    <div className="font-medium">Q: 可以退还宠物吗？</div>
                    <div className="text-gray-600">A: 如有特殊情况，请联系我们协商。</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>我们的位置</CardTitle>
              <CardDescription>欢迎您来我们的救助中心参观，了解更多关于我们的工作</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-lg font-medium">地图加载中...</div>
                  <div className="text-sm">北京市朝阳区宠物大街123号</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
