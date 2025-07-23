"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Filter, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  gender: string
  size: string
  color: string
  description: string
  images: string[]
  location: string
  status: string
  isVaccinated: boolean
  isNeutered: boolean
  createdAt: string
  _count: {
    adoptions: number
    favorites: number
  }
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    species: "ALL",
    gender: "ANY",
    size: "ANY",
    location: "",
    status: "AVAILABLE",
  })

  const fetchPets = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== "")),
      })

      const response = await fetch(`/api/pets?${params}`)
      const result = await response.json()

      if (result.success) {
        setPets(result.data.pets)
        setPagination(result.data.pagination)
      }
    } catch (error) {
      console.error("Failed to fetch pets:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const getSpeciesEmoji = (species: string) => {
    const emojis: Record<string, string> = {
      DOG: "🐕",
      CAT: "🐱",
      RABBIT: "🐰",
      BIRD: "🐦",
      HAMSTER: "🐹",
      GUINEA_PIG: "🐹",
      OTHER: "🐾",
    }
    return emojis[species] || "🐾"
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      AVAILABLE: "bg-green-100 text-green-800",
      PENDING: "bg-yellow-100 text-yellow-800",
      ADOPTED: "bg-gray-100 text-gray-800",
      UNAVAILABLE: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  if (loading && pets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our adorable pets looking for their forever homes. Each one has a unique personality and story.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search pets..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={filters.species} onValueChange={(value) => handleFilterChange("species", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Species</SelectItem>
              <SelectItem value="DOG">Dogs</SelectItem>
              <SelectItem value="CAT">Cats</SelectItem>
              <SelectItem value="RABBIT">Rabbits</SelectItem>
              <SelectItem value="BIRD">Birds</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ANY">Any Gender</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.size} onValueChange={(value) => handleFilterChange("size", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ANY">Any Size</SelectItem>
              <SelectItem value="SMALL">Small</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LARGE">Large</SelectItem>
              <SelectItem value="EXTRA_LARGE">Extra Large</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>
      </div>

      {/* Results Summary */}
      {pagination && (
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} pets
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {Object.values(filters).filter((v) => v !== "").length} filters applied
            </span>
          </div>
        </div>
      )}

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {pets.map((pet) => (
          <Card key={pet.id} className="group hover:shadow-lg transition-shadow duration-200">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={pet.images[0] || "/placeholder.svg?height=300&width=300"}
                alt={pet.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-2 left-2">
                <Badge className={getStatusColor(pet.status)}>{pet.status.toLowerCase()}</Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getSpeciesEmoji(pet.species)}</span>
                <h3 className="font-semibold text-lg">{pet.name}</h3>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <p>
                  {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} old
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {pet.location}
                </p>
              </div>

              <p className="text-sm line-clamp-2 mb-3">{pet.description}</p>

              <div className="flex gap-2 mb-3">
                {pet.isVaccinated && (
                  <Badge variant="outline" className="text-xs">
                    Vaccinated
                  </Badge>
                )}
                {pet.isNeutered && (
                  <Badge variant="outline" className="text-xs">
                    Neutered
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {pet._count.favorites} favorites
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(pet.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Link href={`/pets/${pet.id}`} className="w-full">
                <Button className="w-full">{pet.status === "AVAILABLE" ? "Learn More" : "View Details"}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button variant="outline" disabled={!pagination.hasPrev} onClick={() => fetchPets(pagination.page - 1)}>
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={page === pagination.page ? "default" : "outline"}
                  size="sm"
                  onClick={() => fetchPets(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button variant="outline" disabled={!pagination.hasNext} onClick={() => fetchPets(pagination.page + 1)}>
            Next
          </Button>
        </div>
      )}

      {/* Empty State */}
      {pets.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-semibold mb-2">No pets found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or check back later for new arrivals.
          </p>
          <Button
            onClick={() =>
              setFilters({
                search: "",
                species: "ALL",
                gender: "ANY",
                size: "ANY",
                location: "",
                status: "AVAILABLE",
              })
            }
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
