// Mock database system for deployment
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: Date
}

export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  gender: "MALE" | "FEMALE"
  size: "SMALL" | "MEDIUM" | "LARGE"
  color: string
  description: string
  healthStatus: string
  isVaccinated: boolean
  isNeutered: boolean
  status: "AVAILABLE" | "PENDING" | "ADOPTED"
  location: string
  images: string[]
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
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Adoption {
  id: string
  petId: string
  userId: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  reason: string
  experience: string
  livingSpace: string
  hasOtherPets: boolean
  createdAt: Date
}

export interface Booking {
  id: string
  serviceId: string
  userId: string
  petName: string
  petType: string
  scheduledDate: Date
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  notes?: string
  createdAt: Date
}

// Mock data
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "MALE",
    size: "LARGE",
    color: "Golden",
    description:
      "Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He is great with children and other dogs.",
    healthStatus: "Excellent",
    isVaccinated: true,
    isNeutered: true,
    status: "AVAILABLE",
    location: "New York",
    images: ["/placeholder.svg?height=400&width=600&text=Buddy"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Persian",
    age: 2,
    gender: "FEMALE",
    size: "MEDIUM",
    color: "White",
    description:
      "Luna is a gentle and affectionate Persian cat who enjoys quiet environments and gentle petting. She would do well in a calm household.",
    healthStatus: "Good",
    isVaccinated: true,
    isNeutered: true,
    status: "AVAILABLE",
    location: "Los Angeles",
    images: ["/placeholder.svg?height=400&width=600&text=Luna"],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Max",
    species: "Dog",
    breed: "German Shepherd",
    age: 5,
    gender: "MALE",
    size: "LARGE",
    color: "Brown and Black",
    description:
      "Max is a loyal and intelligent German Shepherd who would make an excellent guard dog. He is well-trained and responds to commands.",
    healthStatus: "Excellent",
    isVaccinated: true,
    isNeutered: true,
    status: "PENDING",
    location: "Chicago",
    images: ["/placeholder.svg?height=400&width=600&text=Max"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
  },
]

const mockServices: Service[] = [
  {
    id: "1",
    name: "Pet Grooming",
    description: "Complete grooming service including bath, nail trimming, and hair styling",
    price: 50,
    duration: 120,
    category: "Grooming",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Veterinary Checkup",
    description: "Comprehensive health examination by licensed veterinarians",
    price: 75,
    duration: 60,
    category: "Healthcare",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Pet Training",
    description: "Basic obedience training for dogs and behavioral consultation",
    price: 100,
    duration: 90,
    category: "Training",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Tips for First-Time Pet Owners",
    content:
      "Bringing home your first pet is an exciting experience, but it can also be overwhelming. Here are some essential tips to help you prepare for your new furry friend...",
    excerpt: "Essential tips and advice for new pet owners to ensure a smooth transition.",
    author: "Dr. Sarah Johnson",
    tags: ["pets", "advice", "first-time"],
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "The Importance of Pet Vaccination",
    content:
      "Vaccinations are crucial for maintaining your pet's health and preventing serious diseases. Learn about the vaccination schedule and why it matters...",
    excerpt: "Understanding the importance of keeping your pets up to date with vaccinations.",
    author: "Dr. Michael Chen",
    tags: ["health", "vaccination", "prevention"],
    published: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
]

// Mock database operations
export const db = {
  pet: {
    findMany: async (options?: {
      where?: Partial<Pet>
      skip?: number
      take?: number
    }) => {
      let pets = [...mockPets]

      if (options?.where) {
        pets = pets.filter((pet) => {
          return Object.entries(options.where!).every(([key, value]) => {
            if (!value) return true
            const petValue = pet[key as keyof Pet]
            if (typeof petValue === "string") {
              return petValue.toLowerCase().includes(value.toString().toLowerCase())
            }
            return petValue === value
          })
        })
      }

      if (options?.skip) {
        pets = pets.slice(options.skip)
      }

      if (options?.take) {
        pets = pets.slice(0, options.take)
      }

      return pets
    },

    findUnique: async (options: { where: { id: string } }) => {
      return mockPets.find((pet) => pet.id === options.where.id) || null
    },

    count: async (options?: { where?: Partial<Pet> }) => {
      if (!options?.where) return mockPets.length

      return mockPets.filter((pet) => {
        return Object.entries(options.where!).every(([key, value]) => {
          if (!value) return true
          const petValue = pet[key as keyof Pet]
          if (typeof petValue === "string") {
            return petValue.toLowerCase().includes(value.toString().toLowerCase())
          }
          return petValue === value
        })
      }).length
    },
  },

  service: {
    findMany: async () => mockServices,
    findUnique: async (options: { where: { id: string } }) => {
      return mockServices.find((service) => service.id === options.where.id) || null
    },
  },

  blogPost: {
    findMany: async (options?: { where?: { published: boolean } }) => {
      if (options?.where?.published !== undefined) {
        return mockBlogPosts.filter((post) => post.published === options.where!.published)
      }
      return mockBlogPosts
    },
    findUnique: async (options: { where: { id: string } }) => {
      return mockBlogPosts.find((post) => post.id === options.where.id) || null
    },
  },

  adoption: {
    create: async (data: Omit<Adoption, "id" | "createdAt">) => {
      const adoption: Adoption = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      }
      return adoption
    },
  },

  booking: {
    create: async (data: Omit<Booking, "id" | "createdAt">) => {
      const booking: Booking = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      }
      return booking
    },
  },
}
