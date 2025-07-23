const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@petrescue.com",
        name: "Admin User",
        role: "ADMIN",
        phone: "+1234567890",
        address: "123 Main St, City, State 12345",
      },
    }),
    prisma.user.create({
      data: {
        email: "john@example.com",
        name: "John Doe",
        role: "USER",
        phone: "+1234567891",
        address: "456 Oak Ave, City, State 12345",
      },
    }),
    prisma.user.create({
      data: {
        email: "jane@example.com",
        name: "Jane Smith",
        role: "VOLUNTEER",
        phone: "+1234567892",
        address: "789 Pine St, City, State 12345",
      },
    }),
  ])

  // Create sample pets
  const pets = await Promise.all([
    prisma.pet.create({
      data: {
        name: "Buddy",
        species: "DOG",
        breed: "Golden Retriever",
        age: 3,
        gender: "MALE",
        size: "LARGE",
        color: "Golden",
        description:
          "Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He gets along well with children and other dogs.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Buddy",
          "/placeholder.svg?height=400&width=400&text=Buddy+Playing",
        ]),
        location: "New York, NY",
        status: "AVAILABLE",
        isVaccinated: true,
        isNeutered: true,
        healthInfo: "Up to date on all vaccinations. Recent health check shows excellent condition.",
        personality: "Friendly, energetic, loyal, good with kids",
        requirements: "Needs a yard for exercise, daily walks, and lots of attention.",
      },
    }),
    prisma.pet.create({
      data: {
        name: "Luna",
        species: "CAT",
        breed: "Siamese",
        age: 2,
        gender: "FEMALE",
        size: "MEDIUM",
        color: "Cream and Brown",
        description:
          "Luna is a beautiful Siamese cat with striking blue eyes. She is calm, affectionate, and loves to curl up in sunny spots.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Luna",
          "/placeholder.svg?height=400&width=400&text=Luna+Sleeping",
        ]),
        location: "Los Angeles, CA",
        status: "AVAILABLE",
        isVaccinated: true,
        isNeutered: true,
        healthInfo: "Healthy with no known medical issues. Spayed and vaccinated.",
        personality: "Calm, affectionate, independent, loves sunbathing",
        requirements: "Indoor cat, needs scratching posts and interactive toys.",
      },
    }),
    prisma.pet.create({
      data: {
        name: "Max",
        species: "DOG",
        breed: "German Shepherd",
        age: 5,
        gender: "MALE",
        size: "LARGE",
        color: "Black and Tan",
        description:
          "Max is a loyal and intelligent German Shepherd. He is well-trained and would make an excellent companion for an active family.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Max",
          "/placeholder.svg?height=400&width=400&text=Max+Training",
        ]),
        location: "Chicago, IL",
        status: "PENDING",
        isVaccinated: true,
        isNeutered: true,
        healthInfo: "Excellent health, regular vet checkups, no issues.",
        personality: "Loyal, intelligent, protective, well-trained",
        requirements: "Experienced dog owner preferred, needs regular exercise and mental stimulation.",
      },
    }),
    prisma.pet.create({
      data: {
        name: "Whiskers",
        species: "CAT",
        breed: "Maine Coon",
        age: 4,
        gender: "MALE",
        size: "LARGE",
        color: "Orange Tabby",
        description:
          "Whiskers is a gentle giant Maine Coon with a fluffy coat and sweet personality. He loves being brushed and enjoys quiet companionship.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Whiskers",
          "/placeholder.svg?height=400&width=400&text=Whiskers+Fluffy",
        ]),
        location: "Seattle, WA",
        status: "AVAILABLE",
        isVaccinated: true,
        isNeutered: true,
        healthInfo: "Healthy, requires regular grooming due to long coat.",
        personality: "Gentle, calm, loves being petted, quiet",
        requirements: "Regular grooming needed, indoor cat preferred.",
      },
    }),
    prisma.pet.create({
      data: {
        name: "Bella",
        species: "DOG",
        breed: "Labrador Mix",
        age: 1,
        gender: "FEMALE",
        size: "MEDIUM",
        color: "Chocolate Brown",
        description:
          "Bella is a young and playful Labrador mix puppy. She is full of energy and loves learning new tricks.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Bella",
          "/placeholder.svg?height=400&width=400&text=Bella+Puppy",
        ]),
        location: "Austin, TX",
        status: "AVAILABLE",
        isVaccinated: true,
        isNeutered: false,
        healthInfo: "Young and healthy, will need spaying when old enough.",
        personality: "Playful, energetic, smart, loves treats",
        requirements: "Puppy training needed, lots of exercise and socialization.",
      },
    }),
    prisma.pet.create({
      data: {
        name: "Shadow",
        species: "CAT",
        breed: "Black Domestic Shorthair",
        age: 6,
        gender: "MALE",
        size: "MEDIUM",
        color: "Black",
        description:
          "Shadow is a mature black cat with golden eyes. He is calm and prefers a quiet home where he can be the only pet.",
        images: JSON.stringify([
          "/placeholder.svg?height=400&width=400&text=Shadow",
          "/placeholder.svg?height=400&width=400&text=Shadow+Eyes",
        ]),
        location: "Denver, CO",
        status: "AVAILABLE",
        isVaccinated: true,
        isNeutered: true,
        healthInfo: "Healthy senior cat, regular vet checkups recommended.",
        personality: "Calm, independent, prefers being the only pet",
        requirements: "Quiet home, would do best as an only pet.",
      },
    }),
  ])

  // Create sample services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Pet Grooming",
        description: "Professional grooming services including bathing, brushing, nail trimming, and styling.",
        price: 45.0,
        duration: 90,
        category: "Grooming",
        image: "/placeholder.svg?height=300&width=300&text=Grooming",
      },
    }),
    prisma.service.create({
      data: {
        name: "Veterinary Checkup",
        description: "Comprehensive health examination by licensed veterinarians.",
        price: 75.0,
        duration: 60,
        category: "Healthcare",
        image: "/placeholder.svg?height=300&width=300&text=Vet+Checkup",
      },
    }),
    prisma.service.create({
      data: {
        name: "Pet Training Session",
        description: "One-on-one training sessions with certified pet trainers.",
        price: 60.0,
        duration: 60,
        category: "Training",
        image: "/placeholder.svg?height=300&width=300&text=Training",
      },
    }),
    prisma.service.create({
      data: {
        name: "Pet Boarding",
        description: "Safe and comfortable overnight boarding for your pets.",
        price: 35.0,
        duration: 1440, // 24 hours in minutes
        category: "Boarding",
        image: "/placeholder.svg?height=300&width=300&text=Boarding",
      },
    }),
  ])

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: "Tips for First-Time Pet Owners",
        slug: "tips-for-first-time-pet-owners",
        content: `# Tips for First-Time Pet Owners

Getting your first pet is an exciting milestone, but it can also feel overwhelming. Here are some essential tips to help you prepare for your new furry friend.

## Before You Adopt

### Research Different Breeds
Different breeds have different needs, temperaments, and care requirements. Make sure to choose a pet that fits your lifestyle.

### Prepare Your Home
Pet-proof your home by removing hazardous items and creating a safe space for your new companion.

## Essential Supplies

- Food and water bowls
- High-quality pet food
- Collar and leash (for dogs)
- Pet bed
- Toys for mental stimulation
- Grooming supplies

## Establishing Routines

Pets thrive on routine. Establish regular feeding times, exercise schedules, and bedtime routines.

## Finding a Veterinarian

Research local veterinarians and schedule an initial checkup within the first week of adoption.

Remember, patience is key when welcoming a new pet into your home. Give them time to adjust and don't hesitate to seek help from professionals when needed.`,
        excerpt: "Essential guidance for new pet owners on preparing for and caring for their first furry companion.",
        image: "/placeholder.svg?height=400&width=600&text=First+Time+Pet+Owner",
        status: "PUBLISHED",
        authorId: users[0].id,
        tags: JSON.stringify(["tips", "first-time", "pet-care", "adoption"]),
        publishedAt: new Date(),
        views: 245,
        likes: 18,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "The Benefits of Pet Adoption",
        slug: "benefits-of-pet-adoption",
        content: `# The Benefits of Pet Adoption

Adopting a pet from a shelter or rescue organization is one of the most rewarding decisions you can make. Here's why adoption is the best choice for both you and the animals in need.

## Saving Lives

When you adopt, you're literally saving a life. Shelters are often overcrowded, and adoption creates space for another animal in need.

## Health Benefits

Studies show that pet ownership can:
- Reduce stress and anxiety
- Lower blood pressure
- Increase physical activity
- Provide emotional support

## Cost-Effective

Adopted pets often come spayed/neutered and vaccinated, saving you hundreds of dollars in initial veterinary costs.

## Supporting Your Community

Adoption fees help shelters continue their important work of rescuing and caring for animals.

## Finding Your Perfect Match

Shelter staff know their animals well and can help match you with a pet that fits your lifestyle and preferences.

## Breaking the Cycle

By adopting instead of buying from pet stores or puppy mills, you're helping to reduce the demand for commercially bred animals.

Visit your local shelter today and discover the joy of giving a deserving animal a second chance at happiness.`,
        excerpt: "Discover why adopting a pet from a shelter is beneficial for both you and the animals in need.",
        image: "/placeholder.svg?height=400&width=600&text=Pet+Adoption+Benefits",
        status: "PUBLISHED",
        authorId: users[2].id,
        tags: JSON.stringify(["adoption", "benefits", "shelter", "rescue"]),
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        views: 189,
        likes: 24,
      },
    }),
  ])

  // Create sample adoptions
  await prisma.adoption.create({
    data: {
      userId: users[1].id,
      petId: pets[2].id, // Max (German Shepherd)
      status: "UNDER_REVIEW",
      reason:
        "I have experience with large dogs and would love to provide Max with a loving home. I have a large yard and am home most of the day.",
      experience:
        "I have owned German Shepherds before and understand their needs for exercise and mental stimulation.",
      livingSpace: "House with large fenced yard",
      hasOtherPets: false,
      workSchedule: "Work from home 4 days a week",
      references: "Dr. Smith - Previous Veterinarian: (555) 123-4567",
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  })

  // Create sample bookings
  await Promise.all([
    prisma.booking.create({
      data: {
        userId: users[1].id,
        serviceId: services[0].id, // Pet Grooming
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: "10:00 AM",
        status: "CONFIRMED",
        notes: "My dog needs a full grooming session including nail trimming.",
        totalPrice: 45.0,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[2].id,
        serviceId: services[1].id, // Veterinary Checkup
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        time: "2:00 PM",
        status: "PENDING",
        notes: "Annual checkup for my cat.",
        totalPrice: 75.0,
      },
    }),
  ])

  // Create sample volunteer application
  await prisma.volunteer.create({
    data: {
      userId: users[2].id,
      skills: JSON.stringify(["animal care", "dog walking", "event organization"]),
      availability: JSON.stringify({
        monday: ["9:00-17:00"],
        wednesday: ["9:00-17:00"],
        friday: ["9:00-17:00"],
        saturday: ["8:00-16:00"],
      }),
      experience: "I have volunteered at animal shelters for 3 years and have experience with both dogs and cats.",
      motivation: "I am passionate about animal welfare and want to help pets find loving homes.",
      status: "APPROVED",
      approvedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    },
  })

  // Create sample donations
  await Promise.all([
    prisma.donation.create({
      data: {
        userId: users[1].id,
        amount: 50.0,
        type: "ONE_TIME",
        status: "COMPLETED",
        message: "Happy to support the great work you do!",
        isAnonymous: false,
      },
    }),
    prisma.donation.create({
      data: {
        userId: users[2].id,
        amount: 25.0,
        type: "MONTHLY",
        status: "COMPLETED",
        message: "Monthly donation to help with ongoing expenses.",
        isAnonymous: false,
      },
    }),
    prisma.donation.create({
      data: {
        amount: 100.0,
        type: "ONE_TIME",
        status: "COMPLETED",
        message: "Thank you for all you do for these animals.",
        isAnonymous: true,
      },
    }),
  ])

  // Create sample favorites
  await Promise.all([
    prisma.favorite.create({
      data: {
        userId: users[1].id,
        petId: pets[0].id, // Buddy
      },
    }),
    prisma.favorite.create({
      data: {
        userId: users[1].id,
        petId: pets[1].id, // Luna
      },
    }),
    prisma.favorite.create({
      data: {
        userId: users[2].id,
        petId: pets[3].id, // Whiskers
      },
    }),
  ])

  console.log("Database seeded successfully!")
  console.log(`Created ${users.length} users`)
  console.log(`Created ${pets.length} pets`)
  console.log(`Created ${services.length} services`)
  console.log(`Created ${blogPosts.length} blog posts`)
  console.log("Created sample adoptions, bookings, volunteers, donations, and favorites")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
