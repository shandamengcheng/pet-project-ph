import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">爱宠之家</span>
            </div>
            <p className="text-gray-400 mb-4">
              致力于为流浪动物寻找温暖的家，提供专业的宠物服务，让每个小生命都能得到最好的照顾。
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pets" className="text-gray-400 hover:text-white">
                  宠物领养
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  服务项目
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  宠物博客
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-white">
                  志愿者招募
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white">
                  爱心捐助
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">服务项目</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/grooming" className="text-gray-400 hover:text-white">
                  宠物美容
                </Link>
              </li>
              <li>
                <Link href="/services/medical" className="text-gray-400 hover:text-white">
                  宠物医疗
                </Link>
              </li>
              <li>
                <Link href="/services/boarding" className="text-gray-400 hover:text-white">
                  宠物寄养
                </Link>
              </li>
              <li>
                <Link href="/services/training" className="text-gray-400 hover:text-white">
                  宠物训练
                </Link>
              </li>
              <li>
                <Link href="/services/insurance" className="text-gray-400 hover:text-white">
                  宠物保险
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">北京市朝阳区宠物大街123号</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">400-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@petlove.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 爱宠之家. 保留所有权利. |
            <Link href="/privacy" className="hover:text-white ml-2">
              隐私政策
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white ml-2">
              服务条款
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
