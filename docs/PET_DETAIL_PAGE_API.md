# 宠物详情页面 API 接口文档

本文档详细描述了宠物详情页面（`/pets/[id]`）所需的所有API接口。

## 页面功能概述

宠物详情页面是用户了解特定宠物信息的核心页面，包含以下主要功能：

- 展示宠物的详细信息（基本信息、医疗记录、性格特点等）
- 图片轮播展示
- 收藏/取消收藏功能
- 分享功能
- 相关宠物推荐
- 领养申请入口
- 浏览量统计

---

## API 接口列表

### 1. 获取宠物详情

**GET** `/api/pets/:id`

获取指定宠物的完整详细信息。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| include_stats | boolean | 否 | 是否包含统计信息 | false |
| user_id | string | 否 | 当前用户ID（用于个性化数据） | - |

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1?include_stats=true&user_id=64f1a2b3c4d5e6f7g8h9i0j2
\`\`\`

#### 响应示例

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
      "location": "北京市朝阳区",
      "description": "温顺友好的金毛犬，特别喜欢和小朋友玩耍。已经完成基础训练，会坐下、握手等基本指令。性格活泼但不过分兴奋，是理想的家庭伴侣。",
      "personality": ["友善", "活泼", "聪明", "忠诚", "温顺"],
      "images": [
        {
          "id": "img_001",
          "url": "https://example.com/pets/xiaobai_1.jpg",
          "alt": "小白正面照",
          "isPrimary": true,
          "order": 1
        },
        {
          "id": "img_002", 
          "url": "https://example.com/pets/xiaobai_2.jpg",
          "alt": "小白侧面照",
          "isPrimary": false,
          "order": 2
        },
        {
          "id": "img_003",
          "url": "https://example.com/pets/xiaobai_3.jpg", 
          "alt": "小白玩耍照",
          "isPrimary": false,
          "order": 3
        }
      ],
      "medicalInfo": {
        "vaccinated": true,
        "vaccinationDate": "2024-01-10T00:00:00.000Z",
        "nextVaccinationDue": "2025-01-10T00:00:00.000Z",
        "neutered": false,
        "microchipped": true,
        "microchipId": "982000123456789",
        "medicalHistory": [
          {
            "date": "2024-01-10T00:00:00.000Z",
            "type": "疫苗接种",
            "description": "完成狂犬疫苗和六联疫苗接种",
            "veterinarian": "李医生"
          },
          {
            "date": "2023-12-15T00:00:00.000Z",
            "type": "健康检查",
            "description": "全面体检，各项指标正常",
            "veterinarian": "王医生"
          }
        ],
        "specialNeeds": "需要每天至少1小时的户外运动，建议早晚各一次散步",
        "allergies": [],
        "medications": [],
        "healthStatus": "excellent"
      },
      "adoptionInfo": {
        "fee": 500,
        "currency": "CNY",
        "status": "available",
        "idealFamily": "适合有孩子的家庭，最好有养狗经验。需要有足够的时间陪伴和运动。",
        "requirements": [
          "有固定住所",
          "有稳定收入来源", 
          "同意定期家访",
          "承诺不遗弃",
          "有时间每天遛狗"
        ],
        "adoptionProcess": [
          "填写领养申请表",
          "电话初步沟通",
          "安排见面",
          "家访评估",
          "签署领养协议",
          "办理领养手续"
        ]
      },
      "rescueStory": "小白是从一个非法繁殖场救助出来的。当时它营养不良，毛发暗淡，经过3个月的精心照料，现在已经完全恢复健康。它非常渴望有一个真正的家，能够给予它足够的爱和关怀。",
      "currentLocation": {
        "shelter": "爱心动物救助中心",
        "address": "北京市朝阳区宠物大街123号",
        "contact": {
          "phone": "010-12345678",
          "email": "contact@petlove.com"
        }
      },
      "caretaker": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "张志愿者",
        "role": "志愿者",
        "experience": "3年救助经验",
        "avatar": "https://example.com/avatars/volunteer1.jpg"
      },
      "featured": true,
      "urgent": false,
      "views": 1256,
      "likes": 89,
      "shares": 23,
      "isLikedByUser": false,
      "createdAt": "2024-01-15T08:30:00.000Z",
      "updatedAt": "2024-01-20T10:15:00.000Z"
    },
    "stats": {
      "totalViews": 1256,
      "todayViews": 45,
      "totalLikes": 89,
      "totalShares": 23,
      "inquiries": 12
    }
  }
}
\`\`\`

#### 错误响应

\`\`\`json
{
  "success": false,
  "error": {
    "code": "PET_NOT_FOUND",
    "message": "指定的宠物不存在",
    "details": {
      "petId": "64f1a2b3c4d5e6f7g8h9i0j1"
    }
  }
}
\`\`\`

---

### 2. 收藏/取消收藏宠物

**POST** `/api/pets/:id/like`

🔒 **需要用户认证**

收藏或取消收藏指定宠物。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 请求头

\`\`\`
Authorization: Bearer <jwt_token>
Content-Type: application/json
\`\`\`

#### 请求示例

\`\`\`bash
POST /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "liked": true,
    "likesCount": 90,
    "message": "收藏成功"
  }
}
\`\`\`

#### 取消收藏响应

\`\`\`json
{
  "success": true,
  "data": {
    "liked": false,
    "likesCount": 89,
    "message": "取消收藏成功"
  }
}
\`\`\`

---

### 3. 记录宠物浏览量

**POST** `/api/pets/:id/view`

记录用户浏览宠物详情的行为，用于统计和推荐算法。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 请求体

\`\`\`json
{
  "userId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "sessionId": "sess_123456789",
  "referrer": "search",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
\`\`\`

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| userId | string | 否 | 用户ID（未登录用户可为空） |
| sessionId | string | 是 | 会话ID |
| referrer | string | 否 | 来源页面类型 |
| userAgent | string | 否 | 用户代理信息 |
| timestamp | string | 是 | 访问时间戳 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "viewRecorded": true,
    "totalViews": 1257,
    "todayViews": 46
  }
}
\`\`\`

---

### 4. 获取相关推荐宠物

**GET** `/api/pets/:id/related`

根据当前宠物信息推荐相似或相关的宠物。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 当前宠物的唯一标识符 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| limit | number | 否 | 返回数量限制 | 6 |
| type | string | 否 | 推荐类型 | similar |
| exclude_adopted | boolean | 否 | 是否排除已领养 | true |

#### 推荐类型说明

| 类型 | 说明 |
|------|------|
| similar | 相似宠物（同品种、同类型） |
| same_location | 同地区宠物 |
| user_preference | 基于用户偏好 |
| popular | 热门宠物 |

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/related?limit=6&type=similar
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "relatedPets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j4",
        "name": "小黄",
        "type": "狗狗",
        "breed": "金毛",
        "age": "1岁",
        "gender": "母",
        "location": "北京市海淀区",
        "primaryImage": {
          "url": "https://example.com/pets/xiaohuang_1.jpg",
          "alt": "小黄照片"
        },
        "adoptionInfo": {
          "fee": 400,
          "status": "available"
        },
        "similarity": 0.95,
        "reason": "同品种，年龄相近"
      },
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j5",
        "name": "大金",
        "type": "狗狗", 
        "breed": "金毛",
        "age": "3岁",
        "gender": "公",
        "location": "北京市朝阳区",
        "primaryImage": {
          "url": "https://example.com/pets/dajin_1.jpg",
          "alt": "大金照片"
        },
        "adoptionInfo": {
          "fee": 600,
          "status": "available"
        },
        "similarity": 0.88,
        "reason": "同品种，同地区"
      }
    ],
    "recommendationMeta": {
      "algorithm": "collaborative_filtering",
      "confidence": 0.92,
      "totalCandidates": 45,
      "filterCriteria": ["same_breed", "available_status", "location_proximity"]
    }
  }
}
\`\`\`

---

### 5. 生成分享链接

**POST** `/api/pets/:id/share`

生成宠物分享链接，支持多种分享平台。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 请求体

\`\`\`json
{
  "platform": "wechat",
  "userId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "customMessage": "快来看看这只可爱的小白！"
}
\`\`\`

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| platform | string | 是 | 分享平台 |
| userId | string | 否 | 分享用户ID |
| customMessage | string | 否 | 自定义分享消息 |

#### 支持的分享平台

| 平台 | 值 | 说明 |
|------|-----|------|
| 微信 | wechat | 微信分享 |
| 微博 | weibo | 微博分享 |
| QQ | qq | QQ分享 |
| 链接 | link | 通用链接 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "shareUrl": "https://petlove.com/pets/64f1a2b3c4d5e6f7g8h9i0j1?ref=share_wechat_64f1a2b3c4d5e6f7g8h9i0j2",
    "shortUrl": "https://petlove.com/s/abc123",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?data=https://petlove.com/s/abc123",
    "shareContent": {
      "title": "领养小白 - 2岁金毛等待新家",
      "description": "温顺友好的金毛犬，特别喜欢和小朋友玩耍...",
      "image": "https://example.com/pets/xiaobai_share.jpg",
      "customMessage": "快来看看这只可爱的小白！"
    },
    "platformSpecific": {
      "wechat": {
        "miniProgramPath": "pages/pet-detail/index?id=64f1a2b3c4d5e6f7g8h9i0j1"
      }
    },
    "expiresAt": "2024-02-20T10:30:00.000Z"
  }
}
\`\`\`

---

### 6. 检查用户领养申请状态

**GET** `/api/pets/:id/adoption-status`

🔒 **需要用户认证**

检查当前用户对指定宠物的领养申请状态。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 请求头

\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

#### 请求示例

\`\`\`bash
GET /api/pets/64f1a2b3c4d5e6f7g8h9i0j1/adoption-status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### 响应示例（有申请）

\`\`\`json
{
  "success": true,
  "data": {
    "hasApplication": true,
    "application": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j6",
      "status": "under_review",
      "statusText": "审核中",
      "submittedAt": "2024-01-18T14:30:00.000Z",
      "lastUpdated": "2024-01-19T09:15:00.000Z",
      "nextStep": "等待工作人员联系安排家访",
      "estimatedResponseTime": "3-5个工作日",
      "canModify": false,
      "canCancel": true
    }
  }
}
\`\`\`

#### 响应示例（无申请）

\`\`\`json
{
  "success": true,
  "data": {
    "hasApplication": false,
    "canApply": true,
    "requirements": [
      "年满18岁",
      "有固定住所",
      "有稳定收入",
      "同意家访"
    ]
  }
}
\`\`\`

---

### 7. 举报宠物信息

**POST** `/api/pets/:id/report`

🔒 **需要用户认证**

举报不当的宠物信息。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 宠物的唯一标识符 |

#### 请求体

\`\`\`json
{
  "reason": "false_information",
  "description": "宠物信息与实际不符，疑似虚假信息",
  "evidence": [
    "https://example.com/evidence1.jpg",
    "https://example.com/evidence2.jpg"
  ]
}
\`\`\`

#### 举报原因类型

| 类型 | 说明 |
|------|------|
| false_information | 虚假信息 |
| inappropriate_content | 不当内容 |
| spam | 垃圾信息 |
| fraud | 诈骗行为 |
| animal_abuse | 动物虐待 |
| other | 其他原因 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "reportId": "64f1a2b3c4d5e6f7g8h9i0j7",
    "status": "submitted",
    "message": "举报已提交，我们会在24小时内处理",
    "referenceNumber": "RPT-2024-0120-001"
  }
}
\`\`\`

---

## 前端集成示例

### React Hook 实现

\`\`\`typescript
// hooks/usePetDetail.ts
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface PetDetailHook {
  pet: Pet | null;
  loading: boolean;
  error: string | null;
  isLiked: boolean;
  likesCount: number;
  relatedPets: Pet[];
  adoptionStatus: AdoptionStatus | null;
  toggleLike: () => Promise<void>;
  recordView: () => Promise<void>;
  generateShareLink: (platform: string) => Promise<ShareLink>;
  reportPet: (reason: string, description: string) => Promise<void>;
}

export const usePetDetail = (petId: string): PetDetailHook => {
  const { user, token } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [relatedPets, setRelatedPets] = useState<Pet[]>([]);
  const [adoptionStatus, setAdoptionStatus] = useState<AdoptionStatus | null>(null);

  // 获取宠物详情
  const fetchPetDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/pets/${petId}?include_stats=true&user_id=${user?.id || ''}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('获取宠物信息失败');
      }

      const data = await response.json();
      setPet(data.data.pet);
      setIsLiked(data.data.pet.isLikedByUser);
      setLikesCount(data.data.pet.likes);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 获取相关推荐
  const fetchRelatedPets = async () => {
    try {
      const response = await fetch(`/api/pets/${petId}/related?limit=6`);
      if (response.ok) {
        const data = await response.json();
        setRelatedPets(data.data.relatedPets);
      }
    } catch (err) {
      console.error('获取相关推荐失败:', err);
    }
  };

  // 获取领养申请状态
  const fetchAdoptionStatus = async () => {
    if (!user || !token) return;

    try {
      const response = await fetch(`/api/pets/${petId}/adoption-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdoptionStatus(data.data);
      }
    } catch (err) {
      console.error('获取申请状态失败:', err);
    }
  };

  // 切换收藏状态
  const toggleLike = async () => {
    if (!user || !token) {
      throw new Error('请先登录');
    }

    try {
      const response = await fetch(`/api/pets/${petId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('操作失败');
      }

      const data = await response.json();
      setIsLiked(data.data.liked);
      setLikesCount(data.data.likesCount);
    } catch (err) {
      throw err;
    }
  };

  // 记录浏览
  const recordView = async () => {
    try {
      await fetch(`/api/pets/${petId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          sessionId: sessionStorage.getItem('sessionId'),
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('记录浏览失败:', err);
    }
  };

  // 生成分享链接
  const generateShareLink = async (platform: string): Promise<ShareLink> => {
    try {
      const response = await fetch(`/api/pets/${petId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('生成分享链接失败');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  // 举报宠物
  const reportPet = async (reason: string, description: string) => {
    if (!user || !token) {
      throw new Error('请先登录');
    }

    try {
      const response = await fetch(`/api/pets/${petId}/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('举报提交失败');
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (petId) {
      fetchPetDetail();
      fetchRelatedPets();
      recordView();
      
      if (user) {
        fetchAdoptionStatus();
      }
    }
  }, [petId, user]);

  return {
    pet,
    loading,
    error,
    isLiked,
    likesCount,
    relatedPets,
    adoptionStatus,
    toggleLike,
    recordView,
    generateShareLink,
    reportPet,
  };
};
\`\`\`

### 组件使用示例

\`\`\`tsx
// components/PetDetailPage.tsx
import React from 'react';
import { usePetDetail } from '../hooks/usePetDetail';
import { Button } from '@/components/ui/button';
import { Heart, Share, Flag } from 'lucide-react';

interface PetDetailPageProps {
  petId: string;
}

export const PetDetailPage: React.FC<PetDetailPageProps> = ({ petId }) => {
  const {
    pet,
    loading,
    error,
    isLiked,
    likesCount,
    relatedPets,
    adoptionStatus,
    toggleLike,
    generateShareLink,
    reportPet,
  } = usePetDetail(petId);

  const handleLike = async () => {
    try {
      await toggleLike();
    } catch (err) {
      alert(err instanceof Error ? err.message : '操作失败');
    }
  };

  const handleShare = async (platform: string) => {
    try {
      const shareLink = await generateShareLink(platform);
      // 处理分享逻辑
      navigator.clipboard.writeText(shareLink.shareUrl);
      alert('分享链接已复制到剪贴板');
    } catch (err) {
      alert('生成分享链接失败');
    }
  };

  const handleReport = async () => {
    const reason = prompt('请选择举报原因');
    const description = prompt('请描述具体问题');
    
    if (reason && description) {
      try {
        await reportPet(reason, description);
        alert('举报已提交');
      } catch (err) {
        alert('举报提交失败');
      }
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!pet) return <div>宠物不存在</div>;

  return (
    <div className="pet-detail-page">
      {/* 宠物基本信息 */}
      <div className="pet-info">
        <h1>{pet.name}</h1>
        <p>{pet.breed} • {pet.age} • {pet.gender}</p>
        <p>{pet.description}</p>
      </div>

      {/* 操作按钮 */}
      <div className="actions">
        <Button onClick={handleLike} variant={isLiked ? "default" : "outline"}>
          <Heart className={isLiked ? "fill-current" : ""} />
          {isLiked ? '已收藏' : '收藏'} ({likesCount})
        </Button>
        
        <Button onClick={() => handleShare('link')} variant="outline">
          <Share />
          分享
        </Button>
        
        <Button onClick={handleReport} variant="outline" size="sm">
          <Flag />
          举报
        </Button>
      </div>

      {/* 领养状态 */}
      {adoptionStatus?.hasApplication && (
        <div className="adoption-status">
          <p>申请状态: {adoptionStatus.application.statusText}</p>
          <p>{adoptionStatus.application.nextStep}</p>
        </div>
      )}

      {/* 相关推荐 */}
      <div className="related-pets">
        <h3>相关推荐</h3>
        <div className="pets-grid">
          {relatedPets.map(relatedPet => (
            <div key={relatedPet.id} className="pet-card">
              <img src={relatedPet.primaryImage.url || "/placeholder.svg"} alt={relatedPet.name} />
              <h4>{relatedPet.name}</h4>
              <p>{relatedPet.breed} • {relatedPet.age}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
\`\`\`

---

## 错误处理

### 常见错误码

| 错误码 | HTTP状态码 | 说明 | 处理建议 |
|--------|------------|------|----------|
| PET_NOT_FOUND | 404 | 宠物不存在 | 跳转到404页面或宠物列表 |
| UNAUTHORIZED | 401 | 用户未认证 | 跳转到登录页面 |
| FORBIDDEN | 403 | 权限不足 | 显示权限不足提示 |
| RATE_LIMITED | 429 | 请求频率超限 | 显示稍后重试提示 |
| VALIDATION_ERROR | 422 | 参数验证失败 | 显示具体验证错误信息 |
| SERVER_ERROR | 500 | 服务器内部错误 | 显示通用错误提示 |

### 错误处理最佳实践

\`\`\`typescript
// utils/errorHandler.ts
export const handleApiError = (error: any, context: string) => {
  console.error(`${context} error:`, error);

  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 404:
        if (data.error?.code === 'PET_NOT_FOUND') {
          return '抱歉，您查看的宠物信息不存在或已被删除';
        }
        return '请求的资源不存在';
        
      case 401:
        return '请先登录后再进行此操作';
        
      case 403:
        return '您没有权限执行此操作';
        
      case 429:
        return '请求过于频繁，请稍后再试';
        
      case 422:
        return data.error?.message || '提交的数据格式不正确';
        
      case 500:
        return '服务器暂时出现问题，请稍后重试';
        
      default:
        return data.error?.message || '操作失败，请重试';
    }
  }
  
  if (error.request) {
    return '网络连接失败，请检查网络设置';
  }
  
  return '发生未知错误，请重试';
};
\`\`\`

---

## 性能优化建议

### 1. 缓存策略

\`\`\`typescript
// utils/cache.ts
class PetDetailCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5分钟

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const petDetailCache = new PetDetailCache();
\`\`\`

### 2. 图片懒加载

\`\`\`tsx
// components/LazyImage.tsx
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = '/placeholder.svg?height=300&width=300'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder}
      alt={alt}
      className={className}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};
\`\`\`

### 3. 请求去重

\`\`\`typescript
// utils/requestDeduplication.ts
class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>();

  async request<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>;
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const requestDeduplicator = new RequestDeduplicator();
\`\`\`

---

## 测试用例

### 单元测试示例

\`\`\`typescript
// __tests__/usePetDetail.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePetDetail } from '../hooks/usePetDetail';

// Mock fetch
global.fetch = jest.fn();

describe('usePetDetail', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch pet detail on mount', async () => {
    const mockPet = {
      id: '123',
      name: '小白',
      type: '狗狗',
      breed: '金毛',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: { pet: mockPet }
      }),
    });

    const { result } = renderHook(() => usePetDetail('123'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.pet).toEqual(mockPet);
  });

  it('should handle like toggle', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { pet: { id: '123', name: '小白', isLikedByUser: false, likes: 10 } }
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { liked: true, likesCount: 11 }
        }),
      });

    const { result } = renderHook(() => usePetDetail('123'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.toggleLike();
    });

    expect(result.current.isLiked).toBe(true);
    expect(result.current.likesCount).toBe(11);
  });
});
\`\`\`

---

## 监控和日志

### 性能监控

\`\`\`typescript
// utils/performance.ts
export const trackPagePerformance = (petId: string) => {
  // 页面加载时间
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    
    // 发送性能数据
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 'pet-detail',
        petId,
        loadTime,
        timestamp: Date.now(),
      }),
    }).catch(console.error);
  });
};

export const trackUserInteraction = (action: string, petId: string, metadata?: any) => {
  fetch('/api/analytics/interaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      petId,
      metadata,
      timestamp: Date.now(),
    }),
  }).catch(console.error);
};
\`\`\`

### 错误日志

\`\`\`typescript
// utils/errorLogger.ts
export const logError = (error: Error, context: string, metadata?: any) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    context,
    metadata,
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: Date.now(),
  };

  // 发送到日志服务
  fetch('/api/logs/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData),
  }).catch(console.error);

  // 开发环境下也输出到控制台
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData);
  }
};
\`\`\`

---

## 总结

本文档详细描述了宠物详情页面所需的所有API接口，包括：

1. **核心功能接口** - 宠物详情获取、收藏、浏览统计等
2. **用户交互接口** - 分享、举报、申请状态查询等  
3. **推荐系统接口** - 相关宠物推荐算法
4. **完整的前端集成方案** - React Hook和组件示例
5. **性能优化策略** - 缓存、懒加载、请求去重等
6. **测试和监控方案** - 单元测试和性能监控

这些接口设计遵循RESTful规范，提供了完整的错误处理机制，并考虑了性能优化和用户体验。开发者可以直接使用这些接口规范进行前端开发。
