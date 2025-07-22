# 预约和服务 API 接口文档

本文档详细描述了宠物服务预约系统的所有API接口，包括服务展示、预约管理、支付处理等功能。

## 页面功能概述

预约和服务系统是平台的核心商业功能，包含以下主要功能：

- 服务项目展示和详情
- 在线预约和时间管理
- 支付处理和订单管理
- 服务评价和反馈
- 服务提供商管理
- 预约提醒和通知

---

## API 接口列表

### 1. 获取服务列表

**GET** `/api/services`

获取所有可用的宠物服务列表。

#### 查询参数

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| category | string | 否 | 服务分类 | - |
| location | string | 否 | 服务地区 | - |
| priceRange | string | 否 | 价格范围 | - |
| rating | number | 否 | 最低评分 | - |
| available | boolean | 否 | 是否可预约 | true |
| page | number | 否 | 页码 | 1 |
| limit | number | 否 | 每页数量 | 12 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "宠物美容护理",
        "category": "美容护理",
        "description": "专业的宠物美容服务，包括洗澡、修毛、指甲护理等",
        "provider": {
          "id": "provider_001",
          "name": "爱宠美容中心",
          "avatar": "https://example.com/providers/provider1.jpg",
          "rating": 4.8,
          "reviewCount": 156,
          "verified": true,
          "location": "北京市朝阳区"
        },
        "pricing": {
          "basePrice": 80,
          "currency": "CNY",
          "priceRange": "80-200",
          "pricingType": "per_service",
          "packages": [
            {
              "name": "基础套餐",
              "price": 80,
              "duration": 60,
              "services": ["洗澡", "吹干", "基础修毛"]
            },
            {
              "name": "豪华套餐",
              "price": 150,
              "duration": 120,
              "services": ["洗澡", "吹干", "精细修毛", "指甲护理", "耳部清洁"]
            }
          ]
        },
        "availability": {
          "isAvailable": true,
          "nextAvailableSlot": "2024-01-22T10:00:00.000Z",
          "bookingAdvance": 7,
          "workingHours": {
            "monday": { "start": "09:00", "end": "18:00" },
            "tuesday": { "start": "09:00", "end": "18:00" },
            "wednesday": { "start": "09:00", "end": "18:00" },
            "thursday": { "start": "09:00", "end": "18:00" },
            "friday": { "start": "09:00", "end": "18:00" },
            "saturday": { "start": "10:00", "end": "17:00" },
            "sunday": { "start": "10:00", "end": "17:00" }
          }
        },
        "features": [
          "专业设备",
          "经验丰富",
          "温和护理",
          "上门服务"
        ],
        "images": [
          {
            "url": "https://example.com/services/grooming1.jpg",
            "alt": "美容环境",
            "isPrimary": true
          }
        ],
        "stats": {
          "totalBookings": 1250,
          "rating": 4.8,
          "reviewCount": 156,
          "completionRate": 98.5
        },
        "policies": {
          "cancellationPolicy": "24小时前可免费取消",
          "reschedulePolicy": "可免费改期一次",
          "refundPolicy": "服务开始前24小时可全额退款"
        },
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-20T10:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 95,
      "itemsPerPage": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "categories": [
      { "name": "美容护理", "count": 25 },
      { "name": "医疗保健", "count": 20 },
      { "name": "训练教育", "count": 15 },
      { "name": "寄养服务", "count": 18 },
      { "name": "上门服务", "count": 17 }
    ]
  }
}
\`\`\`

---

### 2. 获取服务详情

**GET** `/api/services/:id`

获取特定服务的详细信息。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 服务ID |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "service": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "宠物美容护理",
      "category": "美容护理",
      "description": "我们提供专业的宠物美容服务，拥有10年以上经验的美容师团队...",
      "detailedDescription": "详细的服务描述，包括服务流程、注意事项等...",
      "provider": {
        "id": "provider_001",
        "name": "爱宠美容中心",
        "description": "专业宠物美容连锁机构，服务超过10000只宠物",
        "avatar": "https://example.com/providers/provider1.jpg",
        "coverImage": "https://example.com/providers/provider1_cover.jpg",
        "rating": 4.8,
        "reviewCount": 156,
        "verified": true,
        "establishedYear": 2018,
        "location": {
          "address": "北京市朝阳区宠物大街123号",
          "city": "北京市",
          "district": "朝阳区",
          "coordinates": {
            "latitude": 39.9042,
            "longitude": 116.4074
          }
        },
        "contact": {
          "phone": "400-123-4567",
          "email": "contact@petgrooming.com",
          "website": "https://petgrooming.com"
        },
        "certifications": [
          {
            "name": "宠物美容师资格证",
            "issuer": "中国宠物美容协会",
            "validUntil": "2025-12-31"
          }
        ],
        "facilities": [
          "专业美容设备",
          "独立美容间",
          "消毒设施",
          "休息区域"
        ]
      },
      "pricing": {
        "basePrice": 80,
        "currency": "CNY",
        "priceRange": "80-200",
        "pricingType": "per_service",
        "packages": [
          {
            "id": "package_basic",
            "name": "基础套餐",
            "price": 80,
            "originalPrice": 100,
            "discount": 20,
            "duration": 60,
            "services": ["洗澡", "吹干", "基础修毛"],
            "description": "适合日常护理的基础套餐",
            "popular": false
          },
          {
            "id": "package_premium",
            "name": "豪华套餐",
            "price": 150,
            "originalPrice": 180,
            "discount": 30,
            "duration": 120,
            "services": ["洗澡", "吹干", "精细修毛", "指甲护理", "耳部清洁", "香水喷洒"],
            "description": "全方位的美容护理服务",
            "popular": true
          },
          {
            "id": "package_deluxe",
            "name": "至尊套餐",
            "price": 200,
            "originalPrice": 250,
            "discount": 50,
            "duration": 180,
            "services": ["洗澡", "吹干", "造型设计", "指甲护理", "耳部清洁", "牙齿清洁", "香水喷洒", "拍照留念"],
            "description": "最高级的美容护理体验",
            "popular": false
          }
        ],
        "additionalServices": [
          {
            "name": "上门接送",
            "price": 30,
            "description": "提供宠物接送服务"
          },
          {
            "name": "加急服务",
            "price": 50,
            "description": "2小时内完成服务"
          }
        ]
      },
      "availability": {
        "isAvailable": true,
        "nextAvailableSlot": "2024-01-22T10:00:00.000Z",
        "bookingAdvance": 7,
        "maxBookingAdvance": 30,
        "workingHours": {
          "monday": { "start": "09:00", "end": "18:00", "available": true },
          "tuesday": { "start": "09:00", "end": "18:00", "available": true },
          "wednesday": { "start": "09:00", "end": "18:00", "available": true },
          "thursday": { "start": "09:00", "end": "18:00", "available": true },
          "friday": { "start": "09:00", "end": "18:00", "available": true },
          "saturday": { "start": "10:00", "end": "17:00", "available": true },
          "sunday": { "start": "10:00", "end": "17:00", "available": true }
        },
        "holidays": [
          {
            "date": "2024-02-10",
            "name": "春节",
            "available": false
          }
        ],
        "timeSlots": [
          { "time": "09:00", "available": true },
          { "time": "10:00", "available": false },
          { "time": "11:00", "available": true },
          { "time": "14:00", "available": true },
          { "time": "15:00", "available": true },
          { "time": "16:00", "available": true }
        ]
      },
      "features": [
        {
          "name": "专业设备",
          "description": "使用进口专业美容设备",
          "icon": "🔧"
        },
        {
          "name": "经验丰富",
          "description": "10年以上美容经验",
          "icon": "⭐"
        },
        {
          "name": "温和护理",
          "description": "温和无刺激的护理方式",
          "icon": "💝"
        },
        {
          "name": "上门服务",
          "description": "可提供上门美容服务",
          "icon": "🚗"
        }
      ],
      "images": [
        {
          "url": "https://example.com/services/grooming1.jpg",
          "alt": "美容环境",
          "isPrimary": true,
          "category": "environment"
        },
        {
          "url": "https://example.com/services/grooming2.jpg",
          "alt": "美容过程",
          "isPrimary": false,
          "category": "process"
        },
        {
          "url": "https://example.com/services/grooming3.jpg",
          "alt": "美容效果",
          "isPrimary": false,
          "category": "result"
        }
      ],
      "reviews": {
        "summary": {
          "averageRating": 4.8,
          "totalReviews": 156,
          "ratingDistribution": {
            "5": 120,
            "4": 25,
            "3": 8,
            "2": 2,
            "1": 1
          }
        },
        "recent": [
          {
            "id": "review_001",
            "user": {
              "name": "张女士",
              "avatar": "https://example.com/users/user1.jpg"
            },
            "rating": 5,
            "comment": "服务非常专业，我家金毛洗完后特别漂亮！",
            "images": [
              "https://example.com/reviews/review1_1.jpg"
            ],
            "servicePackage": "豪华套餐",
            "createdAt": "2024-01-18T14:30:00.000Z",
            "helpful": 12
          }
        ]
      },
      "faqs": [
        {
          "question": "需要提前多久预约？",
          "answer": "建议提前1-3天预约，节假日建议提前一周预约。"
        },
        {
          "question": "可以取消预约吗？",
          "answer": "可以，服务开始前24小时可免费取消，24小时内取消需支付30%的费用。"
        },
        {
          "question": "宠物需要打疫苗吗？",
          "answer": "是的，为了所有宠物的健康，我们要求宠物必须完成基础疫苗接种。"
        }
      ],
      "policies": {
        "cancellationPolicy": {
          "title": "取消政策",
          "description": "服务开始前24小时可免费取消",
          "details": [
            "24小时前取消：全额退款",
            "24小时内取消：收取30%费用",
            "服务开始后取消：不予退款"
          ]
        },
        "reschedulePolicy": {
          "title": "改期政策",
          "description": "可免费改期一次",
          "details": [
            "每次预约可免费改期一次",
            "改期需提前12小时通知",
            "第二次改期需支付20元手续费"
          ]
        },
        "refundPolicy": {
          "title": "退款政策",
          "description": "服务开始前24小时可全额退款",
          "details": [
            "服务质量不满意可申请退款",
            "退款将在3-5个工作日内到账",
            "特殊情况可协商处理"
          ]
        }
      },
      "stats": {
        "totalBookings": 1250,
        "rating": 4.8,
        "reviewCount": 156,
        "completionRate": 98.5,
        "responseTime": "2小时内",
        "repeatCustomerRate": 85
      },
      "relatedServices": [
        {
          "id": "service_002",
          "name": "宠物医疗检查",
          "category": "医疗保健",
          "price": 120,
          "rating": 4.7,
          "image": "https://example.com/services/medical1.jpg"
        }
      ]
    }
  }
}
\`\`\`

---

### 3. 获取可用时间段

**GET** `/api/services/:id/availability`

获取特定服务在指定日期的可用时间段。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 服务ID |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 查询日期 (YYYY-MM-DD) |
| duration | number | 否 | 服务时长（分钟） |

#### 请求示例

\`\`\`bash
GET /api/services/64f1a2b3c4d5e6f7g8h9i0j1/availability?date=2024-01-22&duration=120
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "date": "2024-01-22",
    "isAvailable": true,
    "workingHours": {
      "start": "09:00",
      "end": "18:00"
    },
    "timeSlots": [
      {
        "startTime": "09:00",
        "endTime": "11:00",
        "available": true,
        "duration": 120,
        "price": 150
      },
      {
        "startTime": "10:00",
        "endTime": "12:00",
        "available": false,
        "duration": 120,
        "price": 150,
        "reason": "已被预约"
      },
      {
        "startTime": "11:00",
        "endTime": "13:00",
        "available": true,
        "duration": 120,
        "price": 150
      },
      {
        "startTime": "14:00",
        "endTime": "16:00",
        "available": true,
        "duration": 120,
        "price": 150
      },
      {
        "startTime": "15:00",
        "endTime": "17:00",
        "available": true,
        "duration": 120,
        "price": 150
      },
      {
        "startTime": "16:00",
        "endTime": "18:00",
        "available": true,
        "duration": 120,
        "price": 150
      }
    ],
    "nextAvailableDate": "2024-01-23",
    "fullyBookedDates": [
      "2024-01-21",
      "2024-01-25"
    ]
  }
}
\`\`\`

---

### 4. 创建预约

**POST** `/api/bookings`

🔒 **需要用户认证**

创建新的服务预约。

#### 请求体

\`\`\`json
{
  "serviceId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "packageId": "package_premium",
  "appointmentDate": "2024-01-22",
  "appointmentTime": "14:00",
  "duration": 120,
  "petInfo": {
    "petId": "pet_001",
    "name": "小白",
    "type": "狗狗",
    "breed": "金毛",
    "age": "2岁",
    "weight": 25,
    "gender": "公",
    "specialNeeds": "对噪音敏感，需要温和处理",
    "medicalHistory": "无特殊病史",
    "lastGrooming": "2024-01-01"
  },
  "additionalServices": [
    {
      "id": "pickup_service",
      "name": "上门接送",
      "price": 30
    }
  ],
  "contactInfo": {
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "address": "北京市朝阳区某某小区123号"
  },
  "specialRequests": "希望美容师温柔一些，宠物比较胆小",
  "paymentMethod": "wechat_pay",
  "couponCode": "FIRST20"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_001",
      "bookingNumber": "BK20240120001",
      "status": "pending_payment",
      "service": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "宠物美容护理",
        "provider": {
          "name": "爱宠美容中心",
          "phone": "400-123-4567"
        }
      },
      "package": {
        "id": "package_premium",
        "name": "豪华套餐",
        "price": 150,
        "duration": 120
      },
      "appointment": {
        "date": "2024-01-22",
        "time": "14:00",
        "endTime": "16:00",
        "duration": 120
      },
      "petInfo": {
        "name": "小白",
        "type": "狗狗",
        "breed": "金毛"
      },
      "pricing": {
        "servicePrice": 150,
        "additionalServices": 30,
        "subtotal": 180,
        "discount": 36,
        "couponDiscount": 20,
        "total": 124,
        "currency": "CNY"
      },
      "paymentInfo": {
        "method": "wechat_pay",
        "status": "pending",
        "paymentUrl": "https://pay.example.com/booking_001",
        "expiresAt": "2024-01-20T11:00:00.000Z"
      },
      "contactInfo": {
        "name": "张三",
        "phone": "13800138000",
        "email": "zhangsan@example.com"
      },
      "policies": {
        "cancellationDeadline": "2024-01-21T14:00:00.000Z",
        "rescheduleDeadline": "2024-01-22T02:00:00.000Z"
      },
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    },
    "message": "预约创建成功，请在30分钟内完成支付"
  }
}
\`\`\`

---

### 5. 获取预约列表

**GET** `/api/bookings`

🔒 **需要用户认证**

获取用户的预约列表。

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | 预约状态 |
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |

#### 预约状态

| 状态 | 说明 |
|------|------|
| pending_payment | 待支付 |
| confirmed | 已确认 |
| in_progress | 进行中 |
| completed | 已完成 |
| cancelled | 已取消 |
| refunded | 已退款 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking_001",
        "bookingNumber": "BK20240120001",
        "status": "confirmed",
        "statusText": "已确认",
        "service": {
          "id": "64f1a2b3c4d5e6f7g8h9i0j1",
          "name": "宠物美容护理",
          "category": "美容护理",
          "image": "https://example.com/services/grooming1.jpg",
          "provider": {
            "name": "爱宠美容中心",
            "phone": "400-123-4567",
            "address": "北京市朝阳区宠物大街123号"
          }
        },
        "package": {
          "name": "豪华套餐",
          "price": 150
        },
        "appointment": {
          "date": "2024-01-22",
          "time": "14:00",
          "endTime": "16:00",
          "duration": 120,
          "countdown": 172800
        },
        "petInfo": {
          "name": "小白",
          "type": "狗狗",
          "breed": "金毛",
          "image": "https://example.com/pets/xiaobai.jpg"
        },
        "pricing": {
          "total": 124,
          "currency": "CNY"
        },
        "actions": {
          "canCancel": true,
          "canReschedule": true,
          "canReview": false,
          "canRepeat": false
        },
        "createdAt": "2024-01-20T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10
    },
    "summary": {
      "totalBookings": 25,
      "upcomingBookings": 3,
      "completedBookings": 20,
      "cancelledBookings": 2
    }
  }
}
\`\`\`

---

### 6. 获取预约详情

**GET** `/api/bookings/:id`

🔒 **需要用户认证**

获取特定预约的详细信息。

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_001",
      "bookingNumber": "BK20240120001",
      "status": "confirmed",
      "statusText": "已确认",
      "statusHistory": [
        {
          "status": "pending_payment",
          "statusText": "待支付",
          "timestamp": "2024-01-20T10:30:00.000Z",
          "note": "预约创建"
        },
        {
          "status": "confirmed",
          "statusText": "已确认",
          "timestamp": "2024-01-20T10:45:00.000Z",
          "note": "支付成功，预约确认"
        }
      ],
      "service": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "宠物美容护理",
        "category": "美容护理",
        "description": "专业的宠物美容服务",
        "image": "https://example.com/services/grooming1.jpg",
        "provider": {
          "id": "provider_001",
          "name": "爱宠美容中心",
          "phone": "400-123-4567",
          "email": "contact@petgrooming.com",
          "address": "北京市朝阳区宠物大街123号",
          "coordinates": {
            "latitude": 39.9042,
            "longitude": 116.4074
          },
          "workingHours": {
            "monday": { "start": "09:00", "end": "18:00" }
          }
        }
      },
      "package": {
        "id": "package_premium",
        "name": "豪华套餐",
        "price": 150,
        "duration": 120,
        "services": ["洗澡", "吹干", "精细修毛", "指甲护理", "耳部清洁", "香水喷洒"],
        "description": "全方位的美容护理服务"
      },
      "additionalServices": [
        {
          "id": "pickup_service",
          "name": "上门接送",
          "price": 30,
          "description": "提供宠物接送服务"
        }
      ],
      "appointment": {
        "date": "2024-01-22",
        "time": "14:00",
        "endTime": "16:00",
        "duration": 120,
        "timezone": "Asia/Shanghai",
        "countdown": 172800,
        "reminderSent": false
      },
      "petInfo": {
        "petId": "pet_001",
        "name": "小白",
        "type": "狗狗",
        "breed": "金毛",
        "age": "2岁",
        "weight": 25,
        "gender": "公",
        "image": "https://example.com/pets/xiaobai.jpg",
        "specialNeeds": "对噪音敏感，需要温和处理",
        "medicalHistory": "无特殊病史",
        "lastGrooming": "2024-01-01"
      },
      "contactInfo": {
        "name": "张三",
        "phone": "13800138000",
        "email": "zhangsan@example.com",
        "address": "北京市朝阳区某某小区123号"
      },
      "specialRequests": "希望美容师温柔一些，宠物比较胆小",
      "pricing": {
        "servicePrice": 150,
        "additionalServices": 30,
        "subtotal": 180,
        "discount": 36,
        "couponDiscount": 20,
        "total": 124,
        "currency": "CNY",
        "breakdown": [
          { "item": "豪华套餐", "price": 150 },
          { "item": "上门接送", "price": 30 },
          { "item": "优惠券折扣", "price": -20 },
          { "item": "会员折扣", "price": -36 }
        ]
      },
      "paymentInfo": {
        "method": "wechat_pay",
        "methodText": "微信支付",
        "status": "paid",
        "statusText": "已支付",
        "transactionId": "wx_20240120_001",
        "paidAt": "2024-01-20T10:45:00.000Z",
        "amount": 124
      },
      "policies": {
        "cancellationDeadline": "2024-01-21T14:00:00.000Z",
        "rescheduleDeadline": "2024-01-22T02:00:00.000Z",
        "cancellationPolicy": "服务开始前24小时可免费取消",
        "reschedulePolicy": "可免费改期一次"
      },
      "actions": {
        "canCancel": true,
        "canReschedule": true,
        "canReview": false,
        "canRepeat": true,
        "canContact": true
      },
      "notifications": {
        "reminderSent": false,
        "confirmationSent": true,
        "emailNotifications": true,
        "smsNotifications": true
      },
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:45:00.000Z"
    }
  }
}
\`\`\`

---

### 7. 取消预约

**POST** `/api/bookings/:id/cancel`

🔒 **需要用户认证**

取消预约。

#### 请求体

\`\`\`json
{
  "reason": "时间冲突",
  "details": "临时有事无法按时到达",
  "requestRefund": true
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_001",
      "status": "cancelled",
      "statusText": "已取消",
      "cancelledAt": "2024-01-20T15:30:00.000Z",
      "cancellationReason": "时间冲突"
    },
    "refund": {
      "eligible": true,
      "amount": 124,
      "fee": 0,
      "refundAmount": 124,
      "processingTime": "3-5个工作日",
      "refundMethod": "原支付方式"
    },
    "message": "预约已成功取消，退款将在3-5个工作日内到账"
  }
}
\`\`\`

---

### 8. 改期预约

**POST** `/api/bookings/:id/reschedule`

🔒 **需要用户认证**

改期预约。

#### 请求体

\`\`\`json
{
  "newDate": "2024-01-25",
  "newTime": "10:00",
  "reason": "时间调整"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_001",
      "appointment": {
        "date": "2024-01-25",
        "time": "10:00",
        "endTime": "12:00",
        "duration": 120
      },
      "rescheduleHistory": [
        {
          "originalDate": "2024-01-22",
          "originalTime": "14:00",
          "newDate": "2024-01-25",
          "newTime": "10:00",
          "reason": "时间调整",
          "rescheduledAt": "2024-01-20T15:45:00.000Z"
        }
      ]
    },
    "message": "预约改期成功"
  }
}
\`\`\`

---

### 9. 服务评价

**POST** `/api/bookings/:id/review`

🔒 **需要用户认证**

对已完成的服务进行评价。

#### 请求体

\`\`\`json
{
  "rating": 5,
  "comment": "服务非常专业，我家金毛洗完后特别漂亮！美容师很有耐心，强烈推荐！",
  "serviceRating": {
    "quality": 5,
    "professionalism": 5,
    "timeliness": 4,
    "communication": 5,
    "value": 4
  },
  "images": [
    "https://example.com/reviews/before.jpg",
    "https://example.com/reviews/after.jpg"
  ],
  "tags": ["专业", "耐心", "效果好"],
  "wouldRecommend": true,
  "anonymous": false
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "review": {
      "id": "review_001",
      "bookingId": "booking_001",
      "rating": 5,
      "comment": "服务非常专业，我家金毛洗完后特别漂亮！美容师很有耐心，强烈推荐！",
      "serviceRating": {
        "quality": 5,
        "professionalism": 5,
        "timeliness": 4,
        "communication": 5,
        "value": 4,
        "average": 4.6
      },
      "images": [
        "https://example.com/reviews/before.jpg",
        "https://example.com/reviews/after.jpg"
      ],
      "tags": ["专业", "耐心", "效果好"],
      "wouldRecommend": true,
      "helpful": 0,
      "createdAt": "2024-01-23T16:30:00.000Z"
    },
    "rewards": {
      "points": 50,
      "coupon": {
        "code": "REVIEW20",
        "discount": 20,
        "validUntil": "2024-02-23T23:59:59.000Z"
      }
    },
    "message": "感谢您的评价！已获得50积分和20元优惠券"
  }
}
\`\`\`

---

### 10. 重复预约

**POST** `/api/bookings/:id/repeat`

🔒 **需要用户认证**

基于已有预约创建重复预约。

#### 请求体

\`\`\`json
{
  "appointmentDate": "2024-02-22",
  "appointmentTime": "14:00",
  "samePackage": true,
  "sameAdditionalServices": true,
  "specialRequests": "继续保持上次的服务标准"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_002",
      "bookingNumber": "BK20240120002",
      "status": "pending_payment",
      "basedOnBooking": "booking_001",
      "service": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "宠物美容护理"
      },
      "appointment": {
        "date": "2024-02-22",
        "time": "14:00",
        "endTime": "16:00"
      },
      "pricing": {
        "total": 150,
        "currency": "CNY"
      },
      "paymentInfo": {
        "method": "wechat_pay",
        "status": "pending",
        "paymentUrl": "https://pay.example.com/booking_002",
        "expiresAt": "2024-01-20T16:30:00.000Z"
      }
    },
    "message": "重复预约创建成功，请完成支付"
  }
}
\`\`\`

---

## 前端集成示例

### React Hook 实现

\`\`\`typescript
// hooks/useBooking.ts
import { useState, useCallback } from 'react';

interface BookingData {
  serviceId: string;
  packageId: string;
  appointmentDate: string;
  appointmentTime: string;
  petInfo: any;
  contactInfo: any;
  additionalServices?: any[];
  specialRequests?: string;
  paymentMethod: string;
  couponCode?: string;
}

export const useBooking = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 创建预约
  const createBooking = useCallback(async (bookingData: BookingData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '预约创建失败');
      }

      const data = await response.json();
      setCurrentBooking(data.data.booking);
      return data.data.booking;
    } catch (err) {
      setError(err instanceof Error ? err.message : '预约创建失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取预约列表
  const fetchBookings = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(params);
      
      const response = await fetch(`/api/bookings?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('获取预约列表失败');
      }

      const data = await response.json();
      setBookings(data.data.bookings);
      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取预约详情
  const fetchBookingDetail = useCallback(async (bookingId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('获取预约详情失败');
      }

      const data = await response.json();
      setCurrentBooking(data.data.booking);
      return data.data.booking;
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 取消预约
  const cancelBooking = useCallback(async (bookingId: string, reason: string, details?: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          reason,
          details,
          requestRefund: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '取消预约失败');
      }

      const data = await response.json();
      
      // 更新本地状态
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled', statusText: '已取消' }
            : booking
        )
      );

      if (currentBooking?.id === bookingId) {
        setCurrentBooking(prev => ({ ...prev, status: 'cancelled', statusText: '已取消' }));
      }

      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '取消失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentBooking]);

  // 改期预约
  const rescheduleBooking = useCallback(async (
    bookingId: string, 
    newDate: string, 
    newTime: string, 
    reason?: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          newDate,
          newTime,
          reason,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '改期失败');
      }

      const data = await response.json();
      
      // 更新本地状态
      const updatedAppointment = data.data.booking.appointment;
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, appointment: updatedAppointment }
            : booking
        )
      );

      if (currentBooking?.id === bookingId) {
        setCurrentBooking(prev => ({ ...prev, appointment: updatedAppointment }));
      }

      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '改期失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentBooking]);

  // 提交评价
  const submitReview = useCallback(async (bookingId: string, reviewData: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '评价提交失败');
      }

      const data = await response.json();
      
      // 更新本地状态
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, actions: { ...booking.actions, canReview: false } }
            : booking
        )
      );

      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '评价失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 重复预约
  const repeatBooking = useCallback(async (
    bookingId: string, 
    appointmentDate: string, 
    appointmentTime: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}/repeat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          appointmentDate,
          appointmentTime,
          samePackage: true,
          sameAdditionalServices: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '重复预约失败');
      }

      const data = await response.json();
      return data.data.booking;
    } catch (err) {
      setError(err instanceof Error ? err.message : '重复预约失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    bookings,
    currentBooking,
    loading,
    error,
    createBooking,
    fetchBookings,
    fetchBookingDetail,
    cancelBooking,
    rescheduleBooking,
    submitReview,
    repeatBooking,
  };
};
\`\`\`

---

## 错误处理

### 常见错误码

| 错误码 | HTTP状态码 | 说明 | 处理建议 |
|--------|------------|------|----------|
| SERVICE_NOT_FOUND | 404 | 服务不存在 | 检查服务ID |
| TIME_SLOT_UNAVAILABLE | 409 | 时间段不可用 | 选择其他时间 |
| BOOKING_DEADLINE_PASSED | 422 | 超过预约时限 | 提示用户时限要求 |
| PAYMENT_FAILED | 402 | 支付失败 | 重新支付或更换支付方式 |
| CANCELLATION_DEADLINE_PASSED | 422 | 超过取消时限 | 联系客服处理 |
| INSUFFICIENT_BALANCE | 402 | 余额不足 | 充值或更换支付方式 |
| BOOKING_CONFLICT | 409 | 预约冲突 | 选择其他时间 |

---

## 通知和提醒

### 1. 预约确认

- 预约成功后立即发送确认通知
- 包含预约详情和联系方式
- 支持邮件和短信通知

### 2. 预约提醒

- 预约前24小时发送提醒
- 预约前2小时发送最终提醒
- 支持自定义提醒时间

### 3. 状态变更通知

- 预约状态变更时实时通知
- 包含变更原因和后续操作
- 支持推送通知

### 4. 评价邀请

- 服务完成后自动发送评价邀请
- 包含评价链接和奖励信息
- 支持延迟发送
