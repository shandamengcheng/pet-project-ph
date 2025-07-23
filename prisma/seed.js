const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Clear existing data
  await prisma.comment.deleteMany({})
  await prisma.blogLike.deleteMany({})
  await prisma.petLike.deleteMany({})
  await prisma.donation.deleteMany({})
  await prisma.volunteer.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.adoption.deleteMany({})
  await prisma.petImage.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.pet.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("🗑️ Cleared existing data")

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@petlove.com" },
    update: {},
    create: {
      email: "admin@petlove.com",
      name: "管理员",
      phone: "13800138000",
      role: "ADMIN",
      city: "北京",
      address: "北京市朝阳区宠物大街123号",
    },
  })

  console.log("✅ Admin user created")

  // Create sample users
  const sampleUsers = await Promise.all([
    prisma.user.create({
      data: {
        fullName: "张小明",
        email: "zhang@example.com",
        password: await bcrypt.hash("password123", 12),
        role: "USER",
        phone: "13800138001",
        age: "28",
        occupation: "软件工程师",
        emailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "李小红",
        email: "li@example.com",
        password: await bcrypt.hash("password123", 12),
        role: "VOLUNTEER",
        phone: "13800138002",
        age: "25",
        occupation: "设计师",
        emailVerified: true,
      },
    }),
  ])

  console.log("✅ Sample users created")

  // Create sample pets
  const samplePets = await Promise.all([
    prisma.pet.create({
      data: {
        name: "小白",
        type: "DOG",
        breed: "金毛寻回犬",
        age: "2岁",
        gender: "MALE",
        weight: "25kg",
        color: "金黄色",
        description:
          "温顺友好的金毛犬，特别喜欢和小朋友玩耍。性格开朗活泼，对人类非常友善。已经完成基础训练，会坐下、握手等基本指令。",
        personality: JSON.stringify(["友善", "活泼", "聪明", "忠诚"]),
        vaccinated: true,
        neutered: false,
        microchipped: true,
        medicalHistory: "已完成狂犬疫苗、六联疫苗接种，身体健康无疾病",
        specialNeeds: "需要每天至少1小时的户外运动，喜欢游泳",
        adoptionFee: 500.0,
        adoptionStatus: "AVAILABLE",
        idealFamily: "适合有孩子的家庭，需要有院子或经常带它外出运动的家庭",
        requirements: JSON.stringify(["有养狗经验", "有固定住所", "有时间陪伴"]),
        rescueStory:
          "小白是从一个繁殖场救助出来的，当时营养不良，经过几个月的悉心照料，现在已经完全恢复健康，变成了一只活泼可爱的狗狗。",
        createdById: admin.id,
        featured: true,
        views: 156,
        images: {
          create: [
            {
              url: "/placeholder.svg?height=400&width=400&text=小白",
              alt: "小白的照片",
              isPrimary: true,
            },
            {
              url: "/placeholder.svg?height=400&width=400&text=小白玩耍",
              alt: "小白在玩耍",
              isPrimary: false,
            },
          ],
        },
      },
    }),
    prisma.pet.create({
      data: {
        name: "咪咪",
        type: "CAT",
        breed: "英短",
        age: "1岁",
        gender: "FEMALE",
        weight: "4kg",
        size: "MEDIUM",
        color: "银渐层",
        location: "上海",
        description: "安静可爱的英短猫，适合公寓饲养，性格温和。喜欢晒太阳，会用猫砂，不抓家具。",
        personality: JSON.stringify(["安静", "温和", "独立", "可爱"]),
        vaccinated: true,
        neutered: true,
        microchipped: true,
        medicalHistory: "已完成疫苗接种和绝育手术，健康状况良好",
        adoptionFee: 300.0,
        adoptionStatus: "AVAILABLE",
        idealFamily: "适合公寓居住的家庭，喜欢安静环境的人",
        requirements: JSON.stringify(["有养猫经验", "室内饲养", "定期体检"]),
        createdById: admin.id,
        featured: false,
        views: 89,
        images: {
          create: [
            {
              url: "/placeholder.svg?height=400&width=400&text=咪咪",
              alt: "咪咪的照片",
              isPrimary: true,
            },
          ],
        },
      },
    }),
    prisma.pet.create({
      data: {
        name: "跳跳",
        type: "RABBIT",
        breed: "垂耳兔",
        age: "6个月",
        gender: "MALE",
        weight: "1.5kg",
        size: "SMALL",
        color: "棕白色",
        location: "广州",
        description: "活泼可爱的垂耳兔，喜欢吃胡萝卜和青菜。性格温顺，适合小朋友饲养。",
        personality: JSON.stringify(["活泼", "温顺", "好奇", "可爱"]),
        vaccinated: true,
        neutered: false,
        microchipped: false,
        medicalHistory: "健康状况良好，已接种兔瘟疫苗",
        adoptionFee: 150.0,
        adoptionStatus: "AVAILABLE",
        idealFamily: "适合有耐心的家庭，需要准备专门的兔笼和兔粮",
        requirements: JSON.stringify(["了解兔子习性", "准备合适环境", "定期清理"]),
        createdById: admin.id,
        featured: false,
        views: 45,
        images: {
          create: [
            {
              url: "/placeholder.svg?height=400&width=400&text=跳跳",
              alt: "跳跳的照片",
              isPrimary: true,
            },
          ],
        },
      },
    }),
  ])

  console.log("✅ Sample pets created")

  // Create sample services
  const sampleServices = await Promise.all([
    prisma.service.create({
      data: {
        name: "宠物美容",
        category: "GROOMING",
        description:
          "专业的宠物美容服务，包括洗澡、修剪、造型等。我们使用进口的宠物专用洗护用品，确保您的宠物在美容过程中的舒适和安全。经验丰富的美容师会根据宠物的品种和特点，为它们设计最适合的造型。",
        shortDescription: "让您的宠物更加美丽健康",
        features: JSON.stringify(["洗澡护理", "毛发修剪", "指甲修剪", "耳朵清洁", "造型设计", "香水喷洒"]),
        basePrice: 80.0,
        currency: "CNY",
        unit: "PER_SESSION",
        packages: JSON.stringify([
          { name: "基础套餐", price: 80, features: ["洗澡", "吹干", "指甲修剪"] },
          { name: "标准套餐", price: 120, features: ["洗澡", "吹干", "指甲修剪", "耳朵清洁", "简单修剪"] },
          { name: "豪华套餐", price: 180, features: ["洗澡", "吹干", "指甲修剪", "耳朵清洁", "造型设计", "香水"] },
        ]),
        estimatedDuration: "1-3小时",
        minimumDuration: "1小时",
        maximumDuration: "3小时",
        availableDays: JSON.stringify(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
        availableHours: "09:00-18:00",
        bookingAdvance: 24,
        requirements: JSON.stringify(["宠物需要接种疫苗", "提前预约", "如有皮肤病请提前告知"]),
        images: JSON.stringify([{ url: "/placeholder.svg?height=300&width=400&text=宠物美容", alt: "宠物美容服务" }]),
        staff: JSON.stringify([
          { name: "王师傅", role: "高级美容师", qualifications: ["宠物美容师资格证", "5年经验"] },
          { name: "李师傅", role: "美容师", qualifications: ["宠物美容师资格证", "3年经验"] },
        ]),
        address: "北京市朝阳区宠物街123号",
        city: "北京",
        coordinates: "39.9042,116.4074",
        isActive: true,
        popular: true,
        ratingAverage: 4.8,
        ratingCount: 156,
      },
    }),
    prisma.service.create({
      data: {
        name: "宠物医疗",
        category: "MEDICAL",
        description:
          "24小时专业宠物医疗服务，包括健康检查、疫苗接种、疾病治疗等。我们拥有先进的医疗设备和经验丰富的兽医团队，为您的宠物提供全方位的医疗保障。",
        shortDescription: "守护宠物健康",
        features: JSON.stringify(["健康检查", "疫苗接种", "疾病治疗", "手术服务", "急诊服务", "住院护理"]),
        basePrice: 150.0,
        currency: "CNY",
        unit: "PER_SESSION",
        packages: JSON.stringify([
          { name: "基础体检", price: 150, features: ["基础检查", "体温测量", "听诊"] },
          { name: "全面体检", price: 300, features: ["血常规", "X光检查", "超声检查"] },
          { name: "疫苗套餐", price: 200, features: ["狂犬疫苗", "六联疫苗", "健康证明"] },
        ]),
        estimatedDuration: "30分钟-2小时",
        minimumDuration: "30分钟",
        maximumDuration: "4小时",
        availableDays: JSON.stringify(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
        availableHours: "00:00-23:59",
        bookingAdvance: 2,
        requirements: JSON.stringify(["携带宠物病历", "空腹检查需提前8小时禁食", "急诊随时接诊"]),
        images: JSON.stringify([{ url: "/placeholder.svg?height=300&width=400&text=宠物医疗", alt: "宠物医疗服务" }]),
        staff: JSON.stringify([
          { name: "张医生", role: "主治兽医", qualifications: ["兽医师执业证", "10年临床经验"] },
          { name: "刘医生", role: "兽医师", qualifications: ["兽医师执业证", "5年临床经验"] },
        ]),
        address: "北京市朝阳区动物医院路456号",
        city: "北京",
        coordinates: "39.9142,116.4174",
        isActive: true,
        popular: false,
        ratingAverage: 4.9,
        ratingCount: 203,
      },
    }),
    prisma.service.create({
      data: {
        name: "宠物寄养",
        category: "BOARDING",
        description:
          "安全舒适的宠物寄养服务，为您出行期间的宠物提供专业照护。我们有独立的寄养区域，24小时监控，专业护理人员照料，让您的宠物在您不在的时候也能得到最好的照顾。",
        shortDescription: "出行无忧，宠物有家",
        features: JSON.stringify(["24小时监控", "专业护理", "定时喂食", "运动陪伴", "医疗保障", "每日报告"]),
        basePrice: 50.0,
        currency: "CNY",
        unit: "PER_DAY",
        packages: JSON.stringify([
          { name: "标准寄养", price: 50, features: ["基础照料", "定时喂食", "清洁护理"] },
          { name: "豪华寄养", price: 80, features: ["独立房间", "专人照料", "运动陪伴", "每日视频"] },
          { name: "VIP寄养", price: 120, features: ["豪华套房", "一对一照料", "美容服务", "接送服务"] },
        ]),
        estimatedDuration: "1天起",
        minimumDuration: "1天",
        maximumDuration: "30天",
        availableDays: JSON.stringify(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
        availableHours: "08:00-20:00",
        bookingAdvance: 48,
        requirements: JSON.stringify(["疫苗齐全", "健康证明", "提前预约", "携带常用物品"]),
        images: JSON.stringify([{ url: "/placeholder.svg?height=300&width=400&text=宠物寄养", alt: "宠物寄养服务" }]),
        staff: JSON.stringify([
          { name: "陈护士", role: "护理主管", qualifications: ["宠物护理证", "8年护理经验"] },
          { name: "赵护士", role: "护理员", qualifications: ["宠物护理证", "3年护理经验"] },
        ]),
        address: "北京市朝阳区宠物寄养中心789号",
        city: "北京",
        coordinates: "39.9242,116.4274",
        isActive: true,
        popular: true,
        ratingAverage: 4.7,
        ratingCount: 89,
      },
    }),
  ])

  console.log("✅ Sample services created")

  // Create sample blog posts
  const sampleBlogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: "新手养狗完全指南：从选择到日常护理",
        slug: "beginner-dog-care-guide",
        excerpt: "准备迎接一只新的狗狗家庭成员？这份详细指南将帮助您了解从选择合适的品种到日常护理的所有要点。",
        content: `
# 新手养狗完全指南

## 选择合适的狗狗

选择狗狗时需要考虑以下因素：

### 1. 生活空间
- **公寓居住**：选择小型或中型犬，如贵宾犬、比熊犬
- **有院子的房屋**：可以选择大型犬，如金毛、拉布拉多

### 2. 时间安排
- **工作繁忙**：选择相对独立的品种
- **时间充裕**：可以选择需要更多陪伴的品种

### 3. 经验水平
- **新手**：建议选择性格温顺、易训练的品种
- **有经验**：可以考虑更有挑战性的品种

## 日常护理要点

### 饮食管理
1. **选择优质狗粮**：根据年龄、体重选择合适的狗粮
2. **定时定量**：建立规律的喂食时间
3. **充足饮水**：确保随时有清洁的饮用水

### 运动需求
1. **每日散步**：至少30分钟的户外活动
2. **游戏时间**：室内外游戏相结合
3. **社交训练**：让狗狗接触其他狗狗和人类

### 健康护理
1. **定期体检**：每年至少一次全面体检
2. **疫苗接种**：按时接种必要疫苗
3. **驱虫防护**：定期进行体内外驱虫

## 训练要点

### 基础训练
- 如厕训练
- 基本指令（坐、卧、来）
- 牵绳训练

### 行为纠正
- 不乱咬东西
- 不乱叫
- 不扑人

## 常见问题解答

**Q: 狗狗多大开始训练最好？**
A: 8-16周是最佳训练时期，但任何年龄的狗狗都可以学习新技能。

**Q: 如何处理狗狗的分离焦虑？**
A: 逐步增加独处时间，提供玩具分散注意力，建立离开和回来的固定仪式。

养狗是一个长期的承诺，需要耐心、爱心和责任心。希望这份指南能帮助您和您的狗狗建立美好的关系！
        `,
        authorId: admin.id,
        category: "CARE_GUIDE",
        tags: JSON.stringify(["狗狗护理", "新手指南", "宠物选择", "日常护理"]),
        featuredImage: "/placeholder.svg?height=400&width=600&text=养狗指南",
        status: "PUBLISHED",
        featured: true,
        readTime: "8分钟",
        views: 1250,
        publishedAt: new Date("2024-01-15"),
        metaTitle: "新手养狗完全指南 - 从选择到护理的全面教程",
        metaDescription: "详细的新手养狗指南，包括品种选择、日常护理、训练技巧等实用内容，帮助您成为合格的狗主人。",
        keywords: JSON.stringify(["养狗指南", "宠物护理", "狗狗训练", "新手养宠"]),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "猫咪行为解读：理解您的猫咪在想什么",
        slug: "understanding-cat-behavior",
        excerpt: "猫咪的行为往往充满神秘色彩，了解这些行为背后的含义能帮助您更好地与猫咪沟通。",
        content: `
# 猫咪行为解读指南

## 常见行为及其含义

### 1. 尾巴语言
- **竖直摆动**：兴奋、开心
- **炸毛**：害怕、愤怒
- **缓慢摆动**：思考、观察
- **夹在腿间**：恐惧、不安

### 2. 声音表达
- **呼噜声**：满足、舒适
- **喵叫**：需求、问候
- **嘶嘶声**：警告、威胁
- **颤音**：兴奋、狩猎本能

### 3. 身体姿态
- **拱背**：威胁或伸展
- **露肚子**：信任、放松
- **蹲伏**：准备攻击或玩耍
- **侧躺**：完全放松

## 问题行为及解决方案

### 抓挠家具
**原因**：标记领域、磨爪需求
**解决方案**：
- 提供专用抓板
- 使用猫薄荷吸引
- 定期修剪指甲

### 乱排泄
**原因**：猫砂盒问题、健康问题、压力
**解决方案**：
- 保持猫砂盒清洁
- 检查健康状况
- 减少环境压力

### 过度叫唤
**原因**：需求未满足、焦虑、疾病
**解决方案**：
- 满足基本需求
- 提供足够关注
- 必要时就医检查

## 增进感情的方法

### 1. 尊重猫咪的空间
- 不强迫互动
- 让猫咪主动接近
- 提供安全的躲藏空间

### 2. 建立日常规律
- 固定的喂食时间
- 规律的游戏时间
- 一致的作息安排

### 3. 正确的互动方式
- 轻柔的抚摸
- 适当的游戏
- 语言交流

理解猫咪的行为是建立良好关系的基础。每只猫咪都有独特的性格，需要耐心观察和了解。
        `,
        authorId: admin.id,
        category: "TRAINING",
        tags: JSON.stringify(["猫咪行为", "宠物心理", "沟通技巧", "行为训练"]),
        featuredImage: "/placeholder.svg?height=400&width=600&text=猫咪行为",
        status: "PUBLISHED",
        featured: true,
        readTime: "6分钟",
        views: 890,
        publishedAt: new Date("2024-01-20"),
        metaTitle: "猫咪行为解读 - 理解您的猫咪心理",
        metaDescription: "详细解读猫咪的各种行为含义，帮助主人更好地理解和沟通，建立和谐的人宠关系。",
        keywords: JSON.stringify(["猫咪行为", "宠物心理", "猫咪沟通", "行为解读"]),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "宠物营养指南：如何为您的宠物选择合适的食物",
        slug: "pet-nutrition-guide",
        excerpt: "正确的营养是宠物健康的基础。了解如何为不同年龄、品种的宠物选择最适合的食物。",
        content: `
# 宠物营养完全指南

## 基础营养需求

### 蛋白质
- **作用**：肌肉发育、免疫系统
- **来源**：肉类、鱼类、蛋类
- **需求量**：成犬18%，成猫26%

### 脂肪
- **作用**：能量供应、皮毛健康
- **来源**：动物脂肪、植物油
- **需求量**：成犬5%，成猫9%

### 碳水化合物
- **作用**：快速能量、肠道健康
- **来源**：谷物、蔬菜
- **注意**：猫咪需求较低

## 不同生命阶段的营养需求

### 幼犬/幼猫（0-12个月）
- 高蛋白、高脂肪
- 频繁喂食（3-4次/天）
- 专用幼犬/幼猫粮

### 成年期（1-7岁）
- 均衡营养
- 规律喂食（2次/天）
- 根据活动量调整

### 老年期（7岁以上）
- 易消化食物
- 关节保健成分
- 控制热量摄入

## 食物选择指南

### 干粮 vs 湿粮
**干粮优点**：
- 方便储存
- 清洁牙齿
- 经济实惠

**湿粮优点**：
- 水分充足
- 适口性好
- 易消化

### 如何阅读食物标签
1. **成分列表**：按重量排序
2. **营养分析**：蛋白质、脂肪含量
3. **AAFCO认证**：营养完整性保证

## 特殊饮食需求

### 过敏体质
- 选择单一蛋白源
- 避免常见过敏原
- 逐步换粮

### 肥胖宠物
- 低脂肪配方
- 增加纤维含量
- 控制食量

### 疾病宠物
- 遵医嘱选择处方粮
- 定期监测指标
- 配合治疗

## 喂食注意事项

### 换粮方法
1. 第1-2天：75%旧粮 + 25%新粮
2. 第3-4天：50%旧粮 + 50%新粮
3. 第5-6天：25%旧粮 + 75%新粮
4. 第7天：100%新粮

### 禁忌食物
**狗狗禁忌**：
- 巧克力、洋葱、葡萄
- 木糖醇、酒精
- 生鸡蛋、生鱼

**猫咪禁忌**：
- 洋葱、大蒜
- 生鱼、生肉
- 牛奶（乳糖不耐受）

正确的营养管理是宠物健康长寿的关键。建议定期咨询兽医，制定个性化的营养方案。
        `,
        authorId: admin.id,
        category: "NUTRITION",
        tags: JSON.stringify(["宠物营养", "食物选择", "健康饮食", "营养指南"]),
        featuredImage: "/placeholder.svg?height=400&width=600&text=宠物营养",
        status: "PUBLISHED",
        featured: false,
        readTime: "10分钟",
        views: 567,
        publishedAt: new Date("2024-01-25"),
        metaTitle: "宠物营养指南 - 科学喂养健康成长",
        metaDescription: "全面的宠物营养指南，包括基础营养需求、食物选择、特殊饮食等专业知识，助您科学喂养宠物。",
        keywords: JSON.stringify(["宠物营养", "科学喂养", "宠物食品", "健康饮食"]),
      },
    }),
  ])

  console.log("✅ Sample blog posts created")

  // Create some sample bookings
  const sampleBookings = await Promise.all([
    prisma.booking.create({
      data: {
        serviceId: sampleServices[0].id, // 宠物美容
        userId: sampleUsers[0].id,
        petName: "小白",
        petType: "狗狗",
        petBreed: "金毛寻回犬",
        petAge: "2岁",
        petWeight: "25kg",
        bookingDate: new Date("2024-02-15T10:00:00Z"),
        bookingTime: "10:00",
        duration: "2小时",
        package: "标准套餐",
        contactName: "张小明",
        contactPhone: "13800138001",
        contactEmail: "zhang@example.com",
        contactAddress: "北京市朝阳区某某小区",
        basePrice: 120.0,
        totalAmount: 120.0,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        paymentMethod: "WECHAT",
      },
    }),
    prisma.booking.create({
      data: {
        serviceId: sampleServices[1].id, // 宠物医疗
        userId: sampleUsers[1].id,
        petName: "咪咪",
        petType: "猫咪",
        petBreed: "英短",
        petAge: "1岁",
        petWeight: "4kg",
        bookingDate: new Date("2024-02-20T14:00:00Z"),
        bookingTime: "14:00",
        duration: "1小时",
        package: "基础体检",
        contactName: "李小红",
        contactPhone: "13800138002",
        contactEmail: "li@example.com",
        basePrice: 150.0,
        totalAmount: 150.0,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
    }),
  ])

  console.log("✅ Sample bookings created")

  // Create sample adoptions
  const sampleAdoptions = await Promise.all([
    prisma.adoption.create({
      data: {
        petId: samplePets[0].id, // 小白
        applicantId: sampleUsers[0].id,
        applicationData: JSON.stringify({
          personalInfo: {
            fullName: "张小明",
            email: "zhang@example.com",
            phone: "13800138001",
            age: "28",
            occupation: "软件工程师",
          },
          livingSituation: {
            housingType: "公寓",
            ownRent: "自有",
            hasYard: "无",
            landlordPermission: true,
          },
          petExperience: {
            previousPets: "有",
            currentPets: "无",
            experience: "曾经养过一只拉布拉多3年",
          },
          lifestyle: {
            workSchedule: "朝九晚五",
            exerciseTime: "每天2小时",
            travelFrequency: "很少出差",
          },
          motivation: {
            adoptionReason: "希望有个伴侣，喜欢狗狗",
            expectations: "希望能给狗狗一个温暖的家",
          },
          agreements: ["同意定期体检", "同意家访", "承诺不遗弃"],
        }),
        status: "UNDER_REVIEW",
      },
    }),
  ])

  console.log("✅ Sample adoptions created")

  // Create sample volunteers
  const sampleVolunteers = await Promise.all([
    prisma.volunteer.create({
      data: {
        userId: sampleUsers[1].id,
        applicationData: JSON.stringify({
          personalInfo: {
            fullName: "李小红",
            email: "li@example.com",
            phone: "13800138002",
            age: "25",
            occupation: "设计师",
            address: "上海市浦东新区",
          },
          availability: {
            weekdays: ["saturday", "sunday"],
            timeSlots: ["morning", "afternoon"],
            hoursPerWeek: "8-12小时",
          },
          interests: ["宠物护理", "活动组织", "摄影"],
          experience: "有2年宠物护理经验",
          motivation: "希望帮助更多需要帮助的小动物",
        }),
        status: "APPROVED",
        approvedAt: new Date("2024-01-10"),
        totalHours: 45,
        activities: JSON.stringify([
          { date: "2024-01-15", activity: "宠物护理", hours: 4 },
          { date: "2024-01-22", activity: "领养活动", hours: 6 },
          { date: "2024-01-29", activity: "宠物摄影", hours: 3 },
        ]),
      },
    }),
  ])

  console.log("✅ Sample volunteers created")

  // Create sample donations
  const sampleDonations = await Promise.all([
    prisma.donation.create({
      data: {
        userId: sampleUsers[0].id,
        amount: 200.0,
        currency: "CNY",
        donationType: "ONE_TIME",
        project: "流浪动物救助",
        message: "希望能帮助到更多需要帮助的小动物",
        anonymous: false,
        paymentStatus: "PAID",
        paymentMethod: "WECHAT",
        transactionId: "wx_20240115_001",
      },
    }),
    prisma.donation.create({
      data: {
        amount: 100.0,
        currency: "CNY",
        donationType: "MONTHLY",
        project: "宠物医疗基金",
        message: "每月定期捐助，支持宠物医疗",
        anonymous: true,
        donorName: "爱心人士",
        donorEmail: "anonymous@example.com",
        paymentStatus: "PAID",
        paymentMethod: "ALIPAY",
        transactionId: "ali_20240120_001",
      },
    }),
  ])

  console.log("✅ Sample donations created")

  // Create some likes and comments
  await prisma.petLike.create({
    data: {
      userId: sampleUsers[0].id,
      petId: samplePets[1].id, // 咪咪
    },
  })

  await prisma.blogLike.create({
    data: {
      userId: sampleUsers[1].id,
      blogPostId: sampleBlogPosts[0].id,
    },
  })

  await prisma.comment.create({
    data: {
      userId: sampleUsers[0].id,
      blogPostId: sampleBlogPosts[0].id,
      content: "非常实用的指南，对新手养狗很有帮助！",
      approved: true,
    },
  })

  console.log("✅ Sample interactions created")

  // Additional updates
  const adminPasswordNew = await bcrypt.hash("admin123", 10)
  const adminNew = await prisma.user.create({
    data: {
      email: "admin@petrescue.com",
      username: "admin",
      password: adminPasswordNew,
      name: "系统管理员",
      role: "ADMIN",
    },
  })

  const userPasswordNew = await bcrypt.hash("user123", 10)
  const testUserNew = await prisma.user.create({
    data: {
      email: "user@example.com",
      username: "testuser",
      password: userPasswordNew,
      name: "测试用户",
      phone: "13800138000",
      address: "北京市朝阳区",
    },
  })

  const petsNew = await prisma.pet.createMany({
    data: [
      {
        name: "小白",
        species: "狗",
        breed: "金毛",
        age: 24,
        gender: "MALE",
        size: "LARGE",
        color: "金黄色",
        description: "非常友善的金毛犬，喜欢和人玩耍，适合家庭饲养。",
        healthInfo: "健康状况良好，已完成疫苗接种。",
        personality: "活泼、友善、聪明",
        location: "北京救助站",
        rescueDate: new Date("2024-01-15"),
      },
      {
        name: "小花",
        species: "猫",
        breed: "中华田园猫",
        age: 12,
        gender: "FEMALE",
        size: "MEDIUM",
        color: "三花",
        description: "温顺的小猫咪，喜欢安静的环境。",
        healthInfo: "健康，已绝育。",
        personality: "温顺、独立、爱干净",
        location: "上海救助站",
        rescueDate: new Date("2024-02-01"),
      },
      {
        name: "大黄",
        species: "狗",
        breed: "中华田园犬",
        age: 36,
        gender: "MALE",
        size: "MEDIUM",
        color: "黄色",
        description: "忠诚的看门犬，对主人非常忠诚。",
        healthInfo: "健康状况良好。",
        personality: "忠诚、警觉、护主",
        location: "广州救助站",
        rescueDate: new Date("2024-01-20"),
      },
    ],
  })

  const servicesNew = await prisma.service.createMany({
    data: [
      {
        name: "宠物体检",
        description: "全面的宠物健康检查，包括基础体检和疫苗接种建议。",
        price: 150.0,
        duration: 60,
        category: "医疗服务",
      },
      {
        name: "宠物美容",
        description: "专业的宠物美容服务，包括洗澡、修毛、指甲护理。",
        price: 80.0,
        duration: 90,
        category: "美容服务",
      },
      {
        name: "宠物寄养",
        description: "安全舒适的宠物寄养服务，24小时专人照料。",
        price: 50.0,
        duration: 1440, // 24小时
        category: "寄养服务",
      },
      {
        name: "宠物训练",
        description: "专业的宠物行为训练，帮助宠物养成良好习惯。",
        price: 200.0,
        duration: 120,
        category: "训练服务",
      },
    ],
  })

  const blogPostsNew = await prisma.blogPost.createMany({
    data: [
      {
        title: "如何选择适合的宠物",
        content: `选择宠物是一个重要的决定，需要考虑多个因素：

## 生活空间
- 公寓适合小型犬或猫咪
- 有院子的房子可以考虑大型犬

## 时间安排
- 狗狗需要每天遛弯和陪伴
- 猫咪相对独立，但也需要关爱

## 经济能力
- 考虑食物、医疗、用品等费用
- 紧急医疗费用的准备

## 家庭成员
- 是否有人对宠物过敏
- 家中是否有小孩或老人

选择宠物不仅是选择一个伴侣，更是承担一份责任。请确保您已经做好了长期照顾的准备。`,
        excerpt: "选择宠物需要考虑生活空间、时间安排、经济能力等多个因素...",
        authorId: adminNew.id,
        category: "养宠指南",
        tags: '["选择宠物", "养宠建议", "新手指南"]',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: "宠物急救知识大全",
        content: `宠物急救知识对每个宠物主人都很重要：

## 常见急救情况

### 中毒
- 立即联系兽医
- 不要催吐（除非兽医指导）
- 保留毒物样本

### 外伤
- 用干净布料压迫止血
- 避免使用酒精或双氧水
- 及时就医

### 呼吸困难
- 保持宠物冷静
- 检查口腔是否有异物
- 立即送医

### 中暑
- 移至阴凉处
- 用湿毛巾降温
- 提供少量水

## 急救包必备物品
- 纱布和绷带
- 体温计
- 生理盐水
- 兽医联系方式

记住：急救只是临时措施，任何严重情况都应立即就医。`,
        excerpt: "掌握基本的宠物急救知识，关键时刻能救命...",
        authorId: adminNew.id,
        category: "健康护理",
        tags: '["急救", "健康", "安全"]',
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
  })

  console.log("种子数据创建完成！")
  console.log(`创建了 ${sampleUsers.length + 2} 个用户`)
  console.log(`创建了 ${samplePets.length + petsNew.count} 只宠物`)
  console.log(`创建了 ${sampleServices.length + servicesNew.count} 个服务项目`)
  console.log(`创建了 ${sampleBlogPosts.length + blogPostsNew.count} 篇博客文章`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
