# 宠物详情页面 API 接口文档

## 概述

本文档详细描述了宠物详情页面（`/pets/[id]`）所需的所有API接口。该页面展示单个宠物的详细信息，包括基本信息、图片画廊、医疗记录、领养信息等，并提供收藏、分享、申请领养等功能。

**页面路径**: `/pets/[id]`  
**对应组件**: `app/pets/[id]/page.tsx`

---

## 接口列表

### 1. 获取宠物详情

**GET** `/api/pets/:id`

获取指定宠物的完整详细信息，包括所有相关数据。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**查询参数**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| include | string | 否 | all | 包含的关联数据，可选值：basic, medical, adoption, gallery, stats |

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1?include=all
\`\`\`

#### 响应数据

**成功响应 (200)**

\`\`\`json
{
  "success": true,
  "data": {
    "pet": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "小白",
      "type": "狗狗",
      "breed": "金毛",
      "age": "2岁",
      "gender": "公",
      "weight": "25kg",
      "size": "大型",
      "color": "金黄色",
      "location": "北京",
      "description": "小白是一只非常温顺友好的金毛犬，特别喜欢和小朋友玩耍。它性格开朗活泼，对人类非常友善，是理想的家庭伴侣。小白已经完成了所有必要的疫苗接种，身体健康状况良好。它喜欢户外活动，每天需要适量的运动来保持健康。",
      "personality": ["友善", "活泼", "聪明", "忠诚"],
      "images": {
        "primary": {
          "url": "https://example.com/pets/pet1-main.jpg",
          "alt": "小白的主要照片",
          "width": 800,
          "height": 600
        },
        "gallery": [
          {
            "id": "img1",
            "url": "https://example.com/pets/pet1-1.jpg",
            "alt": "小白在公园玩耍",
            "width": 400,
            "height": 300,
            "thumbnail": "https://example.com/pets/thumbs/pet1-1.jpg"
          },
          {
            "id": "img2",
            "url": "https://example.com/pets/pet1-2.jpg",
            "alt": "小白和小朋友互动",
            "width": 400,
            "height": 300,
            "thumbnail": "https://example.com/pets/thumbs/pet1-2.jpg"
          },
          {
            "id": "img3",
            "url": "https://example.com/pets/pet1-3.jpg",
            "alt": "小白在家中休息",
            "width": 400,
            "height": 300,
            "thumbnail": "https://example.com/pets/thumbs/pet1-3.jpg"
          }
        ]
      },
      "medicalInfo": {
        "vaccinated": true,
        "vaccinationDate": "2024-01-10T00:00:00.000Z",
        "vaccines": [
          {
            "name": "狂犬疫苗",
            "date": "2024-01-10T00:00:00.000Z",
            "nextDue": "2025-01-10T00:00:00.000Z"
          },
          {
            "name": "六联疫苗",
            "date": "2024-01-05T00:00:00.000Z",
            "nextDue": "2025-01-05T00:00:00.000Z"
          }
        ],
        "neutered": false,
        "microchipped": true,
        "microchipId": "123456789012345",
        "medicalHistory": "已完成狂犬疫苗、六联疫苗接种，定期驱虫",
        "specialNeeds": "需要每天至少1小时的户外运动",
        "allergies": [],
        "medications": [],
        "lastCheckup": "2024-01-15T00:00:00.000Z",
        "veterinarian": {
          "name": "李医生",
          "clinic": "爱宠动物医院",
          "phone": "010-12345678"
        }
      },
      "adoptionInfo": {
        "fee": 500,
        "currency": "CNY",
        "status": "available",
        "statusUpdatedAt": "2024-01-15T08:30:00.000Z",
        "idealFamily": "适合有孩子的家庭，需要有院子或经常带它外出运动的家庭",
        "requirements": [
          "有固定住所",
          "有稳定收入",
          "同意家访",
          "有养狗经验优先",
          "能提供充足的运动空间"
        ],
        "adoptionProcess": [
          "填写领养申请表",
          "等待初步审核",
          "安排家访",
          "签署领养协议",
          "办理领养手续"
        ],
        "estimatedProcessTime": "7-14天"
      },
      "rescueInfo": {
        "rescueDate": "2023-10-15T00:00:00.000Z",
        "rescueLocation": "北京市朝阳区某公园",
        "rescueStory": "小白是从一个繁殖场救助出来的，之前生活条件不太好。经过我们几个月的悉心照料，现在已经完全恢复健康，正在寻找一个永远的家。",
        "rescuer": {
          "name": "张志愿者",
          "organization": "爱宠救助中心"
        },
        "rehabilitationNotes": "经过3个月的康复治疗，小白已经完全恢复健康，性格也变得开朗活泼。"
      },
      "stats": {
        "views": 1256,
        "likes": 89,
        "shares": 23,
        "inquiries": 15,
        "applications": 3
      },
      "contact": {
        "organization": "爱宠之家救助中心",
        "phone": "400-123-4567",
        "email": "adopt@petlove.com",
        "address": "北京市朝阳区宠物大街123号",
        "workingHours": {
          "weekdays": "09:00-18:00",
          "weekends": "09:00-17:00"
        },
        "emergencyContact": "400-999-8888"
      },
      "featured": true,
      "priority": 1,
      "createdBy": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "管理员",
        "role": "admin"
      },
      "createdAt": "2024-01-15T08:30:00.000Z",
      "updatedAt": "2024-01-16T09:15:00.000Z",
      "publishedAt": "2024-01-15T10:00:00.000Z"
    },
    "userInteraction": {
      "isLiked": false,
      "isBookmarked": false,
      "hasApplied": false,
      "lastViewed": null
    },
    "relatedPets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "小黑",
        "type": "狗狗",
        "breed": "拉布拉多",
        "age": "1岁",
        "image": "https://example.com/pets/pet2-thumb.jpg",
        "adoptionFee": 400,
        "location": "北京"
      },
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "咪咪",
        "type": "猫咪",
        "breed": "英短",
        "age": "2岁",
        "image": "https://example.com/pets/pet3-thumb.jpg",
        "adoptionFee": 300,
        "location": "北京"
      }
    ]
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "version": "1.0"
  }
}
\`\`\`

**错误响应**

\`\`\`json
// 404 - 宠物不存在
{
  "success": false,
  "error": {
    "code": "PET_NOT_FOUND",
    "message": "指定的宠物不存在",
    "details": {
      "petId": "64f1a2b3c4d5e6f7g8h9i0j1"
    }
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}

// 500 - 服务器错误
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "服务器内部错误，请稍后重试"
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
\`\`\`

---

### 2. 收藏/取消收藏宠物

**POST** `/api/pets/:id/like`

🔒 **需要用户认证**

用户收藏或取消收藏指定宠物。如果用户已收藏该宠物，则取消收藏；如果未收藏，则添加收藏。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**请求头**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Authorization | string | 是 | Bearer token格式的用户认证令牌 |

#### 请求示例

\`\`\`bash
POST /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### 响应数据

**成功响应 (200)**

\`\`\`json
{
  "success": true,
  "data": {
    "action": "liked",
    "liked": true,
    "likesCount": 90,
    "message": "收藏成功"
  },
  "meta": {
    "requestId": "req_123456790",
    "timestamp": "2024-01-20T10:35:00.000Z"
  }
}
\`\`\`

**取消收藏响应**

\`\`\`json
{
  "success": true,
  "data": {
    "action": "unliked",
    "liked": false,
    "likesCount": 88,
    "message": "取消收藏成功"
  },
  "meta": {
    "requestId": "req_123456791",
    "timestamp": "2024-01-20T10:36:00.000Z"
  }
}
\`\`\`

**错误响应**

\`\`\`json
// 401 - 未认证
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "请先登录后再进行此操作"
  }
}

// 404 - 宠物不存在
{
  "success": false,
  "error": {
    "code": "PET_NOT_FOUND",
    "message": "指定的宠物不存在"
  }
}
\`\`\`

---

### 3. 增加宠物浏览量

**POST** `/api/pets/:id/view`

记录用户浏览宠物详情页面的行为，用于统计和推荐算法。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**请求体**

\`\`\`json
{
  "source": "direct",
  "referrer": "https://petlove.com/pets",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "sessionId": "sess_123456789"
}
\`\`\`

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| source | string | 否 | 访问来源：direct, search, recommendation, social |
| referrer | string | 否 | 来源页面URL |
| userAgent | string | 否 | 用户代理字符串 |
| sessionId | string | 否 | 会话标识符 |

#### 请求示例

\`\`\`bash
POST /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/view
Content-Type: application/json

{
  "source": "search",
  "referrer": "https://petlove.com/pets?type=狗狗",
  "sessionId": "sess_123456789"
}
\`\`\`

#### 响应数据

**成功响应 (200)**

\`\`\`json
{
  "success": true,
  "data": {
    "viewsCount": 1257,
    "message": "浏览记录已更新"
  },
  "meta": {
    "requestId": "req_123456792",
    "timestamp": "2024-01-20T10:37:00.000Z"
  }
}
\`\`\`

---

### 4. 获取相关推荐宠物

**GET** `/api/pets/:id/related`

根据当前宠物的特征，推荐相似或相关的其他宠物。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 当前宠物的唯一标识符 |

**查询参数**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 6 | 返回的推荐宠物数量，最大20 |
| algorithm | string | 否 | similarity | 推荐算法：similarity, location, type, random |
| excludeAdopted | boolean | 否 | true | 是否排除已被领养的宠物 |

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/related?limit=4&algorithm=similarity
\`\`\`

#### 响应数据

**成功响应 (200)**

\`\`\`json
{
  "success": true,
  "data": {
    "relatedPets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "小黑",
        "type": "狗狗",
        "breed": "拉布拉多",
        "age": "1岁",
        "gender": "母",
        "location": "北京",
        "image": {
          "url": "https://example.com/pets/pet2-thumb.jpg",
          "alt": "小黑的照片"
        },
        "adoptionInfo": {
          "fee": 400,
          "status": "available"
        },
        "personality": ["活泼", "聪明", "友善"],
        "similarity": 0.85,
        "reason": "同为大型犬，性格相似"
      },
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "大黄",
        "type": "狗狗",
        "breed": "金毛",
        "age": "3岁",
        "gender": "公",
        "location": "北京",
        "image": {
          "url": "https://example.com/pets/pet3-thumb.jpg",
          "alt": "大黄的照片"
        },
        "adoptionInfo": {
          "fee": 600,
          "status": "available"
        },
        "personality": ["温顺", "忠诚", "聪明"],
        "similarity": 0.92,
        "reason": "同品种，年龄相近"
      }
    ],
    "algorithm": "similarity",
    "total": 2
  },
  "meta": {
    "requestId": "req_123456793",
    "timestamp": "2024-01-20T10:38:00.000Z"
  }
}
\`\`\`

---

### 5. 分享宠物信息

**POST** `/api/pets/:id/share`

记录用户分享宠物信息的行为，并生成分享链接。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**请求体**

\`\`\`json
{
  "platform": "wechat",
  "message": "快来看看这只可爱的小白！",
  "includeContact": true
}
\`\`\`

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| platform | string | 是 | 分享平台：wechat, weibo, qq, link, email |
| message | string | 否 | 自定义分享消息 |
| includeContact | boolean | 否 | 是否包含联系方式 |

#### 请求示例

\`\`\`bash
POST /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/share
Content-Type: application/json

{
  "platform": "wechat",
  "message": "这只金毛太可爱了，有没有人想领养？",
  "includeContact": true
}
\`\`\`

#### 响应数据

**成功响应 (200)**

\`\`\`json
{
  "success": true,
  "data": {
    "shareUrl": "https://petlove.com/pets/64f1a2b3c4d5e6f7g8h9i0j1?ref=share_abc123",
    "shareId": "share_abc123",
    "shareContent": {
      "title": "领养小白 - 2岁金毛犬",
      "description": "小白是一只非常温顺友好的金毛犬，特别喜欢和小朋友玩耍...",
      "image": "https://example.com/pets/pet1-share.jpg",
      "url": "https://petlove.com/pets/64f1a2b3c4d5e6f7g8h9i0j1?ref=share_abc123"
    },
    "qrCode": "https://api.petlove.com/qr/share_abc123.png",
    "expiresAt": "2024-02-20T10:39:00.000Z",
    "sharesCount": 24,
    "message": "分享链接生成成功"
  },
  "meta": {
    "requestId": "req_123456794",
    "timestamp": "2024-01-20T10:39:00.000Z"
  }
}
\`\`\`

---

### 6. 获取宠物申请状态

**GET** `/api/pets/:id/adoption-status`

🔒 **需要用户认证**

获取当前用户对指定宠物的领养申请状态。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**请求头**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Authorization | string | 是 | Bearer token格式的用户认证令牌 |

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/adoption-status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### 响应数据

**成功响应 (200) - 有申请记录**

\`\`\`json
{
  "success": true,
  "data": {
    "hasApplication": true,
    "application": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j5",
      "status": "under_review",
      "statusText": "审核中",
      "submittedAt": "2024-01-18T14:30:00.000Z",
      "lastUpdated": "2024-01-19T09:15:00.000Z",
      "currentStep": 2,
      "totalSteps": 5,
      "steps": [
        {
          "step": 1,
          "name": "提交申请",
          "status": "completed",
          "completedAt": "2024-01-18T14:30:00.000Z"
        },
        {
          "step": 2,
          "name": "初步审核",
          "status": "in_progress",
          "estimatedCompletion": "2024-01-22T00:00:00.000Z"
        },
        {
          "step": 3,
          "name": "家访安排",
          "status": "pending"
        },
        {
          "step": 4,
          "name": "最终审核",
          "status": "pending"
        },
        {
          "step": 5,
          "name": "领养确认",
          "status": "pending"
        }
      ],
      "nextAction": {
        "type": "wait",
        "message": "请耐心等待审核结果，我们会在2-3个工作日内联系您"
      },
      "canModify": false,
      "canCancel": true
    }
  },
  "meta": {
    "requestId": "req_123456795",
    "timestamp": "2024-01-20T10:40:00.000Z"
  }
}
\`\`\`

**成功响应 (200) - 无申请记录**

\`\`\`json
{
  "success": true,
  "data": {
    "hasApplication": false,
    "canApply": true,
    "requirements": [
      "年满18周岁",
      "有固定住所",
      "有稳定收入来源",
      "同意接受家访"
    ],
    "estimatedProcessTime": "7-14天"
  },
  "meta": {
    "requestId": "req_123456796",
    "timestamp": "2024-01-20T10:41:00.000Z"
  }
}
\`\`\`

---

### 7. 举报宠物信息

**POST** `/api/pets/:id/report`

🔒 **需要用户认证**

用户举报宠物信息存在问题或违规内容。

#### 请求参数

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

**请求头**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Authorization | string | 是 | Bearer token格式的用户认证令牌 |

**请求体**

\`\`\`json
{
  "reason": "misleading_info",
  "category": "信息不实",
  "description": "宠物的年龄和实际不符，图片也不是同一只宠物",
  "evidence": [
    "https://example.com/evidence1.jpg",
    "https://example.com/evidence2.jpg"
  ],
  "contactInfo": {
    "phone": "13800138000",
    "email": "reporter@example.com"
  }
}
\`\`\`

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| reason | string | 是 | 举报原因代码 |
| category | string | 是 | 举报分类 |
| description | string | 是 | 详细描述 |
| evidence | array | 否 | 证据图片URL数组 |
| contactInfo | object | 否 | 举报人联系方式 |

**举报原因代码**

| 代码 | 说明 |
|------|------|
| misleading_info | 信息不实 |
| fake_photos | 虚假图片 |
| already_adopted | 已被领养但未更新 |
| inappropriate_content | 不当内容 |
| spam | 垃圾信息 |
| other | 其他原因 |

#### 请求示例

\`\`\`bash
POST /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/report
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "reason": "misleading_info",
  "category": "信息不实",
  "description": "宠物的年龄和实际不符，图片也不是同一只宠物",
  "evidence": [
    "https://example.com/evidence1.jpg"
  ]
}
\`\`\`

#### 响应数据

**成功响应 (201)**

\`\`\`json
{
  "success": true,
  "data": {
    "reportId": "report_123456789",
    "status": "submitted",
    "message": "举报已提交，我们会在24小时内处理",
    "trackingNumber": "RPT20240120001",
    "estimatedProcessTime": "1-3个工作日"
  },
  "meta": {
    "requestId": "req_123456797",
    "timestamp": "2024-01-20T10:42:00.000Z"
  }
}
\`\`\`

---

## 前端集成示例

### React Hook 实现

\`\`\`typescript
// hooks/usePetDetail.ts
import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

interface PetDetailData {
  pet: Pet
  userInteraction: UserInteraction
  relatedPets: Pet[]
}

export const usePetDetail = (petId: string) => {
  const [data, setData] = useState<PetDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  // 获取宠物详情
  const fetchPetDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/pets/${petId}?include=all`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      })
      
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        // 记录浏览行为
        recordView()
      } else {
        setError(result.error.message)
      }
    } catch (err) {
      setError('获取宠物信息失败')
    } finally {
      setLoading(false)
    }
  }

  // 记录浏览
  const recordView = async () => {
    try {
      await fetch(`/api/pets/${petId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'direct',
          referrer: document.referrer,
          sessionId: getSessionId()
        })
      })
    } catch (err) {
      console.warn('记录浏览失败:', err)
    }
  }

  // 收藏/取消收藏
  const toggleLike = async () => {
    if (!token) {
      throw new Error('请先登录')
    }

    try {
      const response = await fetch(`/api/pets/${petId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      
      const result = await response.json()
      
      if (result.success) {
        setData(prev => prev ? {
          ...prev,
          pet: {
            ...prev.pet,
            stats: {
              ...prev.pet.stats,
              likes: result.data.likesCount
            }
          },
          userInteraction: {
            ...prev.userInteraction,
            isLiked: result.data.liked
          }
        } : null)
        
        return result.data
      } else {
        throw new Error(result.error.message)
      }
    } catch (err) {
      throw err
    }
  }

  // 分享
  const sharePet = async (platform: string, message?: string) => {
    try {
      const response = await fetch(`/api/pets/${petId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          message,
          includeContact: true
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setData(prev => prev ? {
          ...prev,
          pet: {
            ...prev.pet,
            stats: {
              ...prev.pet.stats,
              shares: prev.pet.stats.shares + 1
            }
          }
        } : null)
        
        return result.data
      } else {
        throw new Error(result.error.message)
      }
    } catch (err) {
      throw err
    }
  }

  // 获取申请状态
  const getAdoptionStatus = async () => {
    if (!token) return null

    try {
      const response = await fetch(`/api/pets/${petId}/adoption-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      
      const result = await response.json()
      return result.success ? result.data : null
    } catch (err) {
      console.warn('获取申请状态失败:', err)
      return null
    }
  }

  // 举报
  const reportPet = async (reportData: ReportData) => {
    if (!token) {
      throw new Error('请先登录')
    }

    try {
      const response = await fetch(`/api/pets/${petId}/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error.message)
      }
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (petId) {
      fetchPetDetail()
    }
  }, [petId])

  return {
    data,
    loading,
    error,
    actions: {
      toggleLike,
      sharePet,
      getAdoptionStatus,
      reportPet,
      refresh: fetchPetDetail
    }
  }
}

// 辅助函数
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}
\`\`\`

### 组件使用示例

\`\`\`typescript
// components/PetDetailPage.tsx
import React, { useState } from 'react'
import { usePetDetail } from '../hooks/usePetDetail'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Flag } from 'lucide-react'

interface PetDetailPageProps {
  petId: string
}

export const PetDetailPage: React.FC<PetDetailPageProps> = ({ petId }) => {
  const { data, loading, error, actions } = usePetDetail(petId)
  const [likeLoading, setLikeLoading] = useState(false)
  const [shareLoading, setShareLoading] = useState(false)

  const handleLike = async () => {
    try {
      setLikeLoading(true)
      const result = await actions.toggleLike()
      // 显示成功消息
      console.log(result.message)
    } catch (err) {
      // 显示错误消息
      console.error(err)
    } finally {
      setLikeLoading(false)
    }
  }

  const handleShare = async (platform: string) => {
    try {
      setShareLoading(true)
      const result = await actions.sharePet(platform, '快来看看这只可爱的宠物！')
      
      // 复制分享链接到剪贴板
      await navigator.clipboard.writeText(result.shareUrl)
      console.log('分享链接已复制到剪贴板')
    } catch (err) {
      console.error('分享失败:', err)
    } finally {
      setShareLoading(false)
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error}</div>
  if (!data) return <div>未找到宠物信息</div>

  const { pet, userInteraction } = data

  return (
    <div className="pet-detail-page">
      {/* 宠物基本信息 */}
      <div className="pet-header">
        <h1>{pet.name}</h1>
        <div className="pet-stats">
          <span>浏览 {pet.stats.views}</span>
          <span>收藏 {pet.stats.likes}</span>
          <span>分享 {pet.stats.shares}</span>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="action-buttons">
        <Button
          onClick={handleLike}
          disabled={likeLoading}
          variant={userInteraction.isLiked ? "default" : "outline"}
        >
          <Heart className={`h-4 w-4 mr-2 ${userInteraction.isLiked ? 'fill-current' : ''}`} />
          {userInteraction.isLiked ? '已收藏' : '收藏'}
        </Button>

        <Button
          onClick={() => handleShare('link')}
          disabled={shareLoading}
          variant="outline"
        >
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>

        <Button
          onClick={() => {/* 打开举报对话框 */}}
          variant="ghost"
          size="sm"
        >
          <Flag className="h-4 w-4 mr-2" />
          举报
        </Button>
      </div>

      {/* 宠物详细信息 */}
      <div className="pet-content">
        {/* 图片画廊 */}
        <div className="pet-gallery">
          <img src={pet.images.primary.url || "/placeholder.svg"} alt={pet.images.primary.alt} />
          <div className="gallery-thumbnails">
            {pet.images.gallery.map((img, index) => (
              <img key={index} src={img.thumbnail || "/placeholder.svg"} alt={img.alt} />
            ))}
          </div>
        </div>

        {/* 基本信息 */}
        <div className="pet-info">
          <h2>基本信息</h2>
          <div className="info-grid">
            <div>品种: {pet.breed}</div>
            <div>年龄: {pet.age}</div>
            <div>性别: {pet.gender}</div>
            <div>体重: {pet.weight}</div>
            <div>位置: {pet.location}</div>
          </div>
        </div>

        {/* 性格特点 */}
        <div className="pet-personality">
          <h2>性格特点</h2>
          <div className="personality-tags">
            {pet.personality.map((trait, index) => (
              <span key={index} className="tag">{trait}</span>
            ))}
          </div>
        </div>

        {/* 详细描述 */}
        <div className="pet-description">
          <h2>详细介绍</h2>
          <p>{pet.description}</p>
        </div>

        {/* 医疗信息 */}
        <div className="pet-medical">
          <h2>健康状况</h2>
          <div className="medical-status">
            <div className={`status-item ${pet.medicalInfo.vaccinated ? 'positive' : 'negative'}`}>
              疫苗接种: {pet.medicalInfo.vaccinated ? '已完成' : '未完成'}
            </div>
            <div className={`status-item ${pet.medicalInfo.neutered ? 'positive' : 'negative'}`}>
              绝育状态: {pet.medicalInfo.neutered ? '已绝育' : '未绝育'}
            </div>
            <div className={`status-item ${pet.medicalInfo.microchipped ? 'positive' : 'negative'}`}>
              芯片植入: {pet.medicalInfo.microchipped ? '已植入' : '未植入'}
            </div>
          </div>
          {pet.medicalInfo.medicalHistory && (
            <div className="medical-history">
              <h3>医疗记录</h3>
              <p>{pet.medicalInfo.medicalHistory}</p>
            </div>
          )}
        </div>

        {/* 领养信息 */}
        <div className="adoption-info">
          <h2>领养信息</h2>
          <div className="adoption-fee">
            领养费用: ¥{pet.adoptionInfo.fee}
          </div>
          <div className="ideal-family">
            <h3>理想家庭</h3>
            <p>{pet.adoptionInfo.idealFamily}</p>
          </div>
          <div className="requirements">
            <h3>领养要求</h3>
            <ul>
              {pet.adoptionInfo.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 救助故事 */}
        {pet.rescueInfo && (
          <div className="rescue-story">
            <h2>救助故事</h2>
            <p>{pet.rescueInfo.rescueStory}</p>
            <div className="rescue-details">
              <div>救助时间: {new Date(pet.rescueInfo.rescueDate).toLocaleDateString()}</div>
              <div>救助地点: {pet.rescueInfo.rescueLocation}</div>
              {pet.rescueInfo.rescuer && (
                <div>救助人: {pet.rescueInfo.rescuer.name}</div>
              )}
            </div>
          </div>
        )}

        {/* 联系信息 */}
        <div className="contact-info">
          <h2>联系我们</h2>
          <div className="contact-details">
            <div>机构: {pet.contact.organization}</div>
            <div>电话: {pet.contact.phone}</div>
            <div>邮箱: {pet.contact.email}</div>
            <div>地址: {pet.contact.address}</div>
            <div>工作时间: 
              工作日 {pet.contact.workingHours.weekdays}，
              周末 {pet.contact.workingHours.weekends}
            </div>
          </div>
        </div>

        {/* 相关推荐 */}
        {data.relatedPets.length > 0 && (
          <div className="related-pets">
            <h2>相关推荐</h2>
            <div className="pets-grid">
              {data.relatedPets.map(relatedPet => (
                <div key={relatedPet.id} className="pet-card">
                  <img src={relatedPet.image || "/placeholder.svg"} alt={relatedPet.name} />
                  <h3>{relatedPet.name}</h3>
                  <p>{relatedPet.breed} • {relatedPet.age}</p>
                  <p>¥{relatedPet.adoptionFee}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
\`\`\`

---

## 错误处理

### 常见错误码

| 错误码 | HTTP状态码 | 说明 | 处理建议 |
|--------|------------|------|----------|
| PET_NOT_FOUND | 404 | 宠物不存在 | 显示404页面或重定向到宠物列表 |
| UNAUTHORIZED | 401 | 用户未认证 | 重定向到登录页面 |
| FORBIDDEN | 403 | 权限不足 | 显示权限不足提示 |
| VALIDATION_ERROR | 422 | 请求参数验证失败 | 显示具体的验证错误信息 |
| RATE_LIMIT_EXCEEDED | 429 | 请求频率超限 | 显示请求过于频繁的提示 |
| SERVER_ERROR | 500 | 服务器内部错误 | 显示通用错误页面，建议重试 |

### 错误处理最佳实践

\`\`\`typescript
// utils/errorHandler.ts
export const handleApiError = (error: any, response?: Response) => {
  if (response) {
    switch (response.status) {
      case 404:
        return {
          type: 'not_found',
          message: '宠物信息不存在',
          action: 'redirect_to_list'
        }
      case 401:
        return {
          type: 'unauthorized',
          message: '请先登录后再进行此操作',
          action: 'redirect_to_login'
        }
      case 403:
        return {
          type: 'forbidden',
          message: '您没有权限执行此操作',
          action: 'show_message'
        }
      case 429:
        return {
          type: 'rate_limit',
          message: '操作过于频繁，请稍后再试',
          action: 'show_message'
        }
      default:
        return {
          type: 'server_error',
          message: '服务器暂时无法响应，请稍后重试',
          action: 'show_retry'
        }
    }
  }
  
  return {
    type: 'network_error',
    message: '网络连接失败，请检查网络设置',
    action: 'show_retry'
  }
}
\`\`\`

---

## 性能优化建议

### 1. 数据缓存

\`\`\`typescript
// utils/cache.ts
class PetDetailCache {
  private cache = new Map<string, { data: any, timestamp: number }>()
  private readonly TTL = 5 * 60 * 1000 // 5分钟

  get(petId: string) {
    const cached = this.cache.get(petId)
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data
    }
    return null
  }

  set(petId: string, data: any) {
    this.cache.set(petId, {
      data,
      timestamp: Date.now()
    })
  }

  clear(petId?: string) {
    if (petId) {
      this.cache.delete(petId)
    } else {
      this.cache.clear()
    }
  }
}

export const petDetailCache = new PetDetailCache()
\`\`\`

### 2. 图片懒加载

\`\`\`typescript
// hooks/useImageLazyLoad.ts
import { useState, useEffect, useRef } from 'react'

export const useImageLazyLoad = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return { imageSrc, isLoaded, imgRef, handleLoad }
}
\`\`\`

### 3. 请求去重

\`\`\`typescript
// utils/requestDeduplication.ts
class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>()

  async request<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key)
    })

    this.pendingRequests.set(key, promise)
    return promise
  }
}

export const requestDeduplicator = new RequestDeduplicator()
\`\`\`

---

## 测试用例

### API接口测试

\`\`\`typescript
// tests/petDetail.test.ts
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { usePetDetail } from '../hooks/usePetDetail'
import { renderHook, waitFor } from '@testing-library/react'

// Mock fetch
global.fetch = jest.fn()

describe('Pet Detail API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchPetDetail', () => {
    it('should fetch pet detail successfully', async () => {
      const mockPetData = {
        success: true,
        data: {
          pet: {
            id: '123',
            name: '小白',
            type: '狗狗',
            breed: '金毛'
          }
        }
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPetData
      } as Response)

      const { result } = renderHook(() => usePetDetail('123'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data?.pet.name).toBe('小白')
      expect(fetch).toHaveBeenCalledWith('/api/pets/123?include=all', {
        headers: {
          'Authorization': ''
        }
      })
    })

    it('should handle pet not found error', async () => {
      const mockError = {
        success: false,
        error: {
          code: 'PET_NOT_FOUND',
          message: '指定的宠物不存在'
        }
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => mockError
      } as Response)

      const { result } = renderHook(() => usePetDetail('999'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('指定的宠物不存在')
      expect(result.current.data).toBeNull()
    })
  })

  describe('toggleLike', () => {
    it('should toggle like successfully', async () => {
      const mockLikeResponse = {
        success: true,
        data: {
          action: 'liked',
          liked: true,
          likesCount: 90,
          message: '收藏成功'
        }
      }

      ;(fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, data: { pet: { id: '123' } } })
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockLikeResponse
        } as Response)

      const { result } = renderHook(() => usePetDetail('123'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const likeResult = await result.current.actions.toggleLike()

      expect(likeResult.liked).toBe(true)
      expect(likeResult.likesCount).toBe(90)
      expect(fetch).toHaveBeenCalledWith('/api/pets/123/like', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer undefined'
        }
      })
    })
  })
})
\`\`\`

---

## 监控和日志

### 性能监控

\`\`\`typescript
// utils/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance() {
    if (!this.instance) {
      this.instance = new PerformanceMonitor()
    }
    return this.instance
  }

  startTiming(key: string) {
    performance.mark(`${key}-start`)
  }

  endTiming(key: string) {
    performance.mark(`${key}-end`)
    performance.measure(key, `${key}-start`, `${key}-end`)
    
    const measure = performance.getEntriesByName(key)[0]
    const duration = measure.duration

    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }
    this.metrics.get(key)!.push(duration)

    // 发送到监控服务
    this.sendMetric(key, duration)
  }

  private sendMetric(key: string, duration: number) {
    // 发送性能数据到监控服务
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: key,
        value: Math.round(duration)
      })
    }
  }

  getAverageTime(key: string): number {
    const times = this.metrics.get(key) || []
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()
\`\`\`

### 错误日志

\`\`\`typescript
// utils/logger.ts
export class Logger {
  private static instance: Logger
  private logs: Array<{ level: string, message: string, timestamp: Date, context?: any }> = []

  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger()
    }
    return this.instance
  }

  error(message: string, context?: any) {
    this.log('error', message, context)
    
    // 发送错误到监控服务
    if (typeof window !== 'undefined') {
      this.sendToErrorService('error', message, context)
    }
  }

  warn(message: string, context?: any) {
    this.log('warn', message, context)
  }

  info(message: string, context?: any) {
    this.log('info', message, context)
  }

  private log(level: string, message: string, context?: any) {
    const logEntry = {
      level,
      message,
      timestamp: new Date(),
      context
    }
    
    this.logs.push(logEntry)
    console[level as keyof Console](message, context)
    
    // 保持最近1000条日志
    if (this.logs.length > 1000) {
      this.logs.shift()
    }
  }

  private sendToErrorService(level: string, message: string, context?: any) {
    // 发送到错误监控服务（如 Sentry）
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        level,
        message,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(err => {
      console.error('Failed to send log to server:', err)
    })
  }

  getLogs(level?: string) {
    return level 
      ? this.logs.filter(log => log.level === level)
      : this.logs
  }
}

export const logger = Logger.getInstance()
\`\`\`

---

*最后更新时间: 2024-01-20*  
*文档版本: v1.0*  
*对应页面: `/pets/[id]` (宠物详情页)*
