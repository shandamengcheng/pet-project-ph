# 宠物救助网站 API 文档

## 概述

本文档描述了宠物救助网站的所有API接口，基于MySQL数据库和Prisma ORM构建。

## 基础信息

- **基础URL**: `http://localhost:3000/api`
- **认证方式**: JWT Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 认证

大部分API需要在请求头中包含JWT token：

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## 用户认证 API

### 用户注册

**POST** `/api/auth/register`

\`\`\`json
{
  "email": "user@example.com",
  "username": "testuser",
  "password": "password123",
  "name": "用户姓名",
  "phone": "13800138000"
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "注册成功",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "testuser",
      "name": "用户姓名"
    },
    "token": "jwt_token"
  }
}
\`\`\`

### 用户登录

**POST** `/api/auth/login`

\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "testuser",
      "name": "用户姓名",
      "role": "USER"
    },
    "token": "jwt_token"
  }
}
\`\`\`

## 宠物管理 API

### 获取宠物列表

**GET** `/api/pets`

**查询参数**:
- `page`: 页码 (默认: 1)
- `limit`: 每页数量 (默认: 12)
- `species`: 物种筛选
- `size`: 体型筛选
- `status`: 状态筛选
- `search`: 搜索关键词

**响应**:
\`\`\`json
{
  "success": true,
  "data": {
    "pets": [
      {
        "id": "pet_id",
        "name": "小白",
        "species": "狗",
        "breed": "金毛",
        "age": 24,
        "gender": "MALE",
        "size": "LARGE",
        "color": "金黄色",
        "description": "非常友善的金毛犬...",
        "images": ["image1.jpg", "image2.jpg"],
        "status": "AVAILABLE",
        "location": "北京救助站",
        "createdAt": "2024-01-15T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "totalPages": 5
    }
  }
}
\`\`\`

### 获取宠物详情

**GET** `/api/pets/{id}`

**响应**:
\`\`\`json
{
  "success": true,
  "data": {
    "id": "pet_id",
    "name": "小白",
    "species": "狗",
    "breed": "金毛",
    "age": 24,
    "gender": "MALE",
    "size": "LARGE",
    "color": "金黄色",
    "description": "非常友善的金毛犬...",
    "healthInfo": "健康状况良好...",
    "personality": "活泼、友善、聪明",
    "images": ["image1.jpg", "image2.jpg"],
    "status": "AVAILABLE",
    "location": "北京救助站",
    "rescueDate": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
}
\`\`\`

## 领养申请 API

### 提交领养申请

**POST** `/api/adoptions`

**需要认证**: 是

\`\`\`json
{
  "petId": "pet_id",
  "reason": "我想给这只狗狗一个温暖的家...",
  "experience": "我之前养过狗狗，有丰富的经验...",
  "livingSpace": "三室一厅，有阳台",
  "hasOtherPets": false
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "领养申请提交成功",
  "data": {
    "id": "adoption_id",
    "status": "PENDING",
    "createdAt": "2024-01-15T00:00:00.000Z"
  }
}
\`\`\`

### 获取我的领养申请

**GET** `/api/adoptions/my`

**需要认证**: 是

**响应**:
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "adoption_id",
      "status": "PENDING",
      "reason": "我想给这只狗狗一个温暖的家...",
      "createdAt": "2024-01-15T00:00:00.000Z",
      "pet": {
        "id": "pet_id",
        "name": "小白",
        "species": "狗",
        "images": ["image1.jpg"]
      }
    }
  ]
}
\`\`\`

## 服务预约 API

### 获取服务列表

**GET** `/api/services`

**响应**:
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "service_id",
      "name": "宠物体检",
      "description": "全面的宠物健康检查...",
      "price": 150.00,
      "duration": 60,
      "category": "医疗服务"
    }
  ]
}
\`\`\`

### 预约服务

**POST** `/api/bookings`

**需要认证**: 是

\`\`\`json
{
  "serviceId": "service_id",
  "appointmentDate": "2024-02-01T10:00:00.000Z",
  "notes": "我的宠物需要体检..."
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "预约成功",
  "data": {
    "id": "booking_id",
    "status": "PENDING",
    "appointmentDate": "2024-02-01T10:00:00.000Z"
  }
}
\`\`\`

## 博客文章 API

### 获取文章列表

**GET** `/api/blog`

**查询参数**:
- `page`: 页码
- `limit`: 每页数量
- `category`: 分类筛选

**响应**:
\`\`\`json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_id",
        "title": "如何选择适合的宠物",
        "excerpt": "选择宠物需要考虑生活空间...",
        "coverImage": "cover.jpg",
        "category": "养宠指南",
        "publishedAt": "2024-01-15T00:00:00.000Z",
        "author": {
          "name": "系统管理员"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 20,
      "totalPages": 2
    }
  }
}
\`\`\`

### 获取文章详情

**GET** `/api/blog/{id}`

**响应**:
\`\`\`json
{
  "success": true,
  "data": {
    "id": "post_id",
    "title": "如何选择适合的宠物",
    "content": "选择宠物是一个重要的决定...",
    "coverImage": "cover.jpg",
    "category": "养宠指南",
    "tags": ["选择宠物", "养宠建议"],
    "publishedAt": "2024-01-15T00:00:00.000Z",
    "author": {
      "name": "系统管理员",
      "avatar": "avatar.jpg"
    },
    "comments": [
      {
        "id": "comment_id",
        "content": "很有用的文章！",
        "createdAt": "2024-01-16T00:00:00.000Z",
        "user": {
          "name": "用户名"
        }
      }
    ]
  }
}
\`\`\`

## 志愿者申请 API

### 提交志愿者申请

**POST** `/api/volunteer/apply`

**需要认证**: 是

\`\`\`json
{
  "name": "张三",
  "phone": "13800138000",
  "email": "volunteer@example.com",
  "age": 25,
  "occupation": "软件工程师",
  "experience": "我曾经在其他动物救助组织做过志愿者...",
  "motivation": "我热爱动物，希望能帮助更多需要帮助的小动物...",
  "availability": "周末和节假日有时间",
  "skills": "摄影、文案写作、网站维护"
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "志愿者申请提交成功",
  "data": {
    "id": "application_id",
    "status": "PENDING"
  }
}
\`\`\`

## 捐助 API

### 提交捐助

**POST** `/api/donations`

\`\`\`json
{
  "amount": 100.00,
  "type": "MONEY",
  "donorName": "爱心人士",
  "donorEmail": "donor@example.com",
  "message": "希望能帮助到更多的小动物",
  "isAnonymous": false
}
\`\`\`

**响应**:
\`\`\`json
{
  "success": true,
  "message": "捐助提交成功",
  "data": {
    "id": "donation_id",
    "paymentUrl": "https://payment.example.com/pay/xxx"
  }
}
\`\`\`

## 错误响应格式

所有API在出错时返回统一格式：

\`\`\`json
{
  "success": false,
  "message": "错误描述",
  "error": {
    "code": "ERROR_CODE",
    "details": "详细错误信息"
  }
}
\`\`\`

## 状态码说明

- `200`: 成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未认证
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

## 数据模型

### 用户角色 (UserRole)
- `USER`: 普通用户
- `ADMIN`: 管理员
- `VOLUNTEER`: 志愿者

### 宠物状态 (PetStatus)
- `AVAILABLE`: 可领养
- `ADOPTED`: 已领养
- `RESERVED`: 已预约
- `MEDICAL_CARE`: 医疗护理中
- `NOT_AVAILABLE`: 不可领养

### 领养状态 (AdoptionStatus)
- `PENDING`: 待审核
- `APPROVED`: 已通过
- `REJECTED`: 已拒绝
- `COMPLETED`: 已完成

### 预约状态 (BookingStatus)
- `PENDING`: 待确认
- `CONFIRMED`: 已确认
- `COMPLETED`: 已完成
- `CANCELLED`: 已取消
