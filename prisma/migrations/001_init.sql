-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `role` ENUM('USER', 'ADMIN', 'VOLUNTEER') NOT NULL DEFAULT 'USER',
    `avatar` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `age` VARCHAR(10) NULL,
    `occupation` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `bio` TEXT NULL,
    `petTypes` TEXT NULL,
    `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
    `smsNotifications` BOOLEAN NOT NULL DEFAULT false,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailVerificationToken` VARCHAR(255) NULL,
    `passwordResetToken` VARCHAR(255) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `lastLogin` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `type` ENUM('DOG', 'CAT', 'RABBIT', 'HAMSTER', 'BIRD', 'OTHER') NOT NULL,
    `breed` VARCHAR(100) NOT NULL,
    `age` VARCHAR(20) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `weight` VARCHAR(20) NULL,
    `size` ENUM('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE') NULL,
    `color` VARCHAR(50) NULL,
    `location` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `vaccinated` BOOLEAN NOT NULL DEFAULT false,
    `neutered` BOOLEAN NOT NULL DEFAULT false,
    `microchipped` BOOLEAN NOT NULL DEFAULT false,
    `medicalHistory` TEXT NULL,
    `specialNeeds` TEXT NULL,
    `allergies` TEXT NULL,
    `adoptionFee` DECIMAL(10, 2) NOT NULL,
    `adoptionStatus` ENUM('AVAILABLE', 'PENDING', 'ADOPTED', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `idealFamily` TEXT NULL,
    `requirements` TEXT NULL,
    `personality` TEXT NULL,
    `rescueStory` TEXT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `views` INTEGER NOT NULL DEFAULT 0,
    `createdById` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pet_images` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` TEXT NOT NULL,
    `alt` VARCHAR(255) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `petId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `category` ENUM('GROOMING', 'MEDICAL', 'BOARDING', 'TRAINING', 'INSURANCE', 'DAYCARE') NOT NULL,
    `description` TEXT NOT NULL,
    `shortDescription` VARCHAR(200) NULL,
    `features` TEXT NULL,
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'CNY',
    `unit` ENUM('PER_SESSION', 'PER_HOUR', 'PER_DAY', 'PER_MONTH', 'PER_YEAR') NOT NULL DEFAULT 'PER_SESSION',
    `packages` TEXT NULL,
    `estimatedDuration` VARCHAR(50) NULL,
    `minimumDuration` VARCHAR(50) NULL,
    `maximumDuration` VARCHAR(50) NULL,
    `availableDays` TEXT NULL,
    `availableHours` VARCHAR(20) NULL,
    `bookingAdvance` INTEGER NOT NULL DEFAULT 24,
    `requirements` TEXT NULL,
    `images` TEXT NULL,
    `staff` TEXT NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(50) NULL,
    `coordinates` VARCHAR(50) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `ratingAverage` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `ratingCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `petName` VARCHAR(50) NOT NULL,
    `petType` VARCHAR(20) NOT NULL,
    `petBreed` VARCHAR(50) NULL,
    `petAge` VARCHAR(20) NULL,
    `petWeight` VARCHAR(20) NULL,
    `petSpecialNeeds` TEXT NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `bookingTime` VARCHAR(10) NOT NULL,
    `duration` VARCHAR(20) NULL,
    `package` VARCHAR(50) NULL,
    `specialRequests` TEXT NULL,
    `contactName` VARCHAR(100) NOT NULL,
    `contactPhone` VARCHAR(20) NOT NULL,
    `contactEmail` VARCHAR(255) NOT NULL,
    `contactAddress` TEXT NULL,
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `additionalFees` TEXT NULL,
    `discountAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `discountReason` VARCHAR(255) NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'PENDING',
    `paymentStatus` ENUM('PENDING', 'PAID', 'REFUNDED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `paymentMethod` ENUM('CASH', 'CARD', 'WECHAT', 'ALIPAY', 'BANK_TRANSFER') NULL,
    `notes` TEXT NULL,
    `reminderSent` BOOLEAN NOT NULL DEFAULT false,
    `reminderSentAt` DATETIME(3) NULL,
    `rating` TINYINT NULL,
    `feedbackComment` TEXT NULL,
    `feedbackDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `excerpt` VARCHAR(500) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `category` ENUM('CARE_GUIDE', 'HEALTH', 'TRAINING', 'NUTRITION', 'ADOPTION_STORY', 'OTHER') NOT NULL,
    `tags` TEXT NULL,
    `featuredImage` TEXT NULL,
    `images` TEXT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `readTime` VARCHAR(20) NOT NULL DEFAULT '5分钟',
    `views` INTEGER NOT NULL DEFAULT 0,
    `publishedAt` DATETIME(3) NULL,
    `metaTitle` VARCHAR(200) NULL,
    `metaDescription` VARCHAR(500) NULL,
    `keywords` TEXT NULL,

    UNIQUE INDEX `blog_posts_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add Foreign Key Constraints
ALTER TABLE `pets` ADD CONSTRAINT `pets_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `pet_images` ADD CONSTRAINT `pet_images_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `bookings` ADD CONSTRAINT `bookings_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
