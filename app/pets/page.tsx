"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")

  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  })

  useEffect(() => {
    fetchPets()
  }, [searchTerm, selectedType, selectedAge, pagination.page])

  const fetchPets = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "12",
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType !== "all" && { type: selectedType }),
        ...(selectedAge !== "all" && { age: selectedAge }),
      })

      const response = await fetch(`/api/pets?${params}`)
      const result = await response.json()

      if (result.success) {
        setPets(result.data.pets)
        setPagination(result.data.pagination)
      }
    } catch (error) {
      console.error("Error fetching pets:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || pet.type === selectedType
    const matchesAge =
      selectedAge === "all" ||
      (selectedAge === "young" && Number.parseInt(pet.age.replace("岁", "")) <= 1) ||
      (selectedAge === "adult" &&
        Number.parseInt(pet.age.replace("岁", "")) > 1 &&
        Number.parseInt(pet.age.replace("岁", "")) <= 5) ||
      (selectedAge === "senior" && Number.parseInt(pet.age.replace("岁", "")) > 5)

    return matchesSearch && matchesType && matchesAge
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">寻找您的完美伴侣</h1>
          <p className="text-xl text-gray-600">这些可爱的小生命正在等待一个温暖的家</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索宠物名称或品种..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类型</SelectItem>
                <SelectItem value="狗狗">狗狗</SelectItem>
                <SelectItem value="猫咪">猫咪</SelectItem>
                <SelectItem value="兔子">兔子</SelectItem>
                <SelectItem value="仓鼠">仓鼠</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="选择年龄" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有年龄</SelectItem>
                <SelectItem value="young">幼年 (&gt;=1岁)</SelectItem>
                <SelectItem value="adult">成年 (1-5岁)</SelectItem>
                <SelectItem value="senior">老年 (&gt;5岁)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-blue-600">{filteredPets.length}</span> 只宠物
          </p>
        </div>

        {/* Pet Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-64 bg-gray-200 animate-pulse" />
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600">{pet.type}</Badge>
                    <Badge variant="secondary">{pet.gender}</Badge>
                  </div>
                  <Button size="sm" variant="secondary" className="absolute top-4 right-4">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pet.name}
                    <span className="text-sm font-normal text-gray-500">{pet.age}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{pet.breed}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pet.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{pet.description}</p>
                  <div className="flex gap-2 mb-4">
                    {pet.vaccinated && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        已疫苗
                      </Badge>
                    )}
                    {pet.neutered && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        已绝育
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/pets/${pet.id}`}>了解更多</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/adopt/${pet.id}`}>申请领养</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到匹配的宠物</h3>
            <p className="text-gray-600 mb-4">请尝试调整搜索条件或筛选器</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
                setSelectedAge("all")
              }}
            >
              清除筛选条件
            </Button>
          </div>
        )}

        {/* 分页组件 */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              上一页
            </Button>

            <div className="flex gap-1">
              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: pageNum }))}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
            >
              下一页
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
