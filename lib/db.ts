// Mock database for deployment without Prisma
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  avatar?: string
  role: "USER" | "ADMIN" | "VOLUNTEER"
  createdAt: Date
  updatedAt: Date
}

export interface Pet {
  id: string
  name: string
  species: "DOG" | "CAT" | "RABBIT" | "BIRD" | "HAMSTER" | "GUINEA_PIG" | "OTHER"
  breed: string
  age: number
  gender: "MALE" | "FEMALE" | "UNKNOWN"
  size: "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE"
  color: string
  description: string
  images: string[]
  location: string
  status: "AVAILABLE" | "PENDING" | "ADOPTED" | "UNAVAILABLE"
  isVaccinated: boolean
  isNeutered: boolean
  healthInfo?: string
  personality?: string
  requirements?: string
  rescueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  isActive: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  authorId: string
  tags?: string[]
  views: number
  likes: number
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Mock data
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    species: "DOG",
    breed: "Golden Retriever",
    age: 3,
    gender: "MALE",
    size: "LARGE",
    color: "Golden",
    description:
      "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He is great with children and other dogs.",
    images: ["/placeholder.svg?height=400&width=400&text=Buddy"],
    location: "New York, NY",
    status: "AVAILABLE",
    isVaccinated: true,
    isNeutered: true,
    healthInfo: "Fully vaccinated, healthy",
    personality: "Friendly, energetic, loyal",
    requirements: "Needs daily exercise and a yard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Luna",
    species: "CAT",
    breed: "Persian",
    age: 2,
    gender: "FEMALE",
    size: "MEDIUM",
    color: "White",
    description:
      "Luna is a beautiful Persian cat with a calm and gentle personality. She loves to be petted and enjoys quiet environments.",
    images: ["/placeholder.svg?height=400&width=400&text=Luna"],
    location: "Los Angeles, CA",
    status: "AVAILABLE",
    isVaccinated: true,
    isNeutered: true,
    healthInfo: "Healthy, regular grooming needed",
    personality: "Calm, gentle, affectionate",
    requirements: "Indoor living, regular grooming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Max",
    species: "DOG",
    breed: "German Shepherd",
    age: 5,
    gender: "MALE",
    size: "LARGE",
    color: "Brown and Black",
    description:
      "Max is a loyal and intelligent German Shepherd. He is well-trained and would make an excellent guard dog and family companion.",
    images: ["/placeholder.svg?height=400&width=400&text=Max"],
    location: "Chicago, IL",
    status: "AVAILABLE",
    isVaccinated: true,
    isNeutered: true,
    healthInfo: "Excellent health, up to date on all shots",
    personality: "Loyal, intelligent, protective",
    requirements: "Experienced owner, large yard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockServices: Service[] = [
  {
    id: "1",
    name: "Pet Grooming",
    description: "Professional grooming services including bathing, brushing, nail trimming, and styling.",
    price: 50,
    duration: 90,
    category: "Grooming",
    isActive: true,
    image: "/placeholder.svg?height=300&width=400&text=Pet+Grooming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Veterinary Checkup",
    description: "Comprehensive health examination by licensed veterinarians.",
    price: 75,
    duration: 60,
    category: "Healthcare",
    isActive: true,
    image: "/placeholder.svg?height=300&width=400&text=Vet+Checkup",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Pet Training",
    description: "Basic obedience training and behavioral modification sessions.",
    price: 100,
    duration: 120,
    category: "Training",
    isActive: true,
    image: "/placeholder.svg?height=300&width=400&text=Pet+Training",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Prepare Your Home for a New Pet",
    slug: "prepare-home-new-pet",
    content: "Bringing a new pet home is exciting, but preparation is key to ensuring a smooth transition...",
    excerpt: "Essential tips for preparing your home before adopting a new pet.",
    image: "/placeholder.svg?height=300&width=500&text=Pet+Home+Prep",
    status: "PUBLISHED",
    authorId: "1",
    tags: ["adoption", "preparation", "tips"],
    views: 1250,
    likes: 89,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "The Benefits of Pet Adoption",
    slug: "benefits-pet-adoption",
    content: "Adopting a pet from a shelter not only saves a life but also brings numerous benefits to your family...",
    excerpt: "Discover why adopting from shelters is beneficial for both pets and families.",
    image: "/placeholder.svg?height=300&width=500&text=Pet+Adoption",
    status: "PUBLISHED",
    authorId: "1",
    tags: ["adoption", "benefits", "shelter"],
    views: 2100,
    likes: 156,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock database operations
export const db = {
  pet: {
    findMany: async (options?: any) => {
      let pets = [...mockPets]

      if (options?.where) {
        const { species, gender, status, location } = options.where
        if (species) pets = pets.filter((p) => p.species === species)
        if (gender) pets = pets.filter((p) => p.gender === gender)
        if (status) pets = pets.filter((p) => p.status === status)
        if (location) pets = pets.filter((p) => p.location.includes(location))
      }

      if (options?.skip) pets = pets.slice(options.skip)
      if (options?.take) pets = pets.slice(0, options.take)

      return pets
    },
    findUnique: async (options: { where: { id: string } }) => {
      return mockPets.find((p) => p.id === options.where.id) || null
    },
    count: async () => mockPets.length,
  },
  service: {
    findMany: async () => mockServices,
    findUnique: async (options: { where: { id: string } }) => {
      return mockServices.find((s) => s.id === options.where.id) || null
    },
  },
  blogPost: {
    findMany: async (options?: any) => {
      let posts = [...mockBlogPosts]
      if (options?.where?.status) {
        posts = posts.filter((p) => p.status === options.where.status)
      }
      if (options?.skip) posts = posts.slice(options.skip)
      if (options?.take) posts = posts.slice(0, options.take)
      return posts
    },
    findUnique: async (options: { where: { id?: string; slug?: string } }) => {
      if (options.where.id) {
        return mockBlogPosts.find((p) => p.id === options.where.id) || null
      }
      if (options.where.slug) {
        return mockBlogPosts.find((p) => p.slug === options.where.slug) || null
      }
      return null
    },
  },
}
