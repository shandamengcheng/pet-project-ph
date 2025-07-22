import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <Card>
          <CardContent className="pt-12 pb-8">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">页面未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。</p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  返回首页
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/pets">
                  <Heart className="h-4 w-4 mr-2" />
                  浏览宠物
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/blog">
                  <Search className="h-4 w-4 mr-2" />
                  阅读博客
                </Link>
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t text-sm text-gray-500">
              <p>如果您认为这是一个错误，请</p>
              <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                联系我们
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <Link href="/services" className="p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors">
            <div className="font-medium">服务项目</div>
            <div className="text-gray-500">查看我们的服务</div>
          </Link>
          <Link href="/about" className="p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors">
            <div className="font-medium">关于我们</div>
            <div className="text-gray-500">了解我们的故事</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
