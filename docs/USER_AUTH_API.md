# 用户认证 API 接口文档

本文档详细描述了用户认证系统的所有API接口，包括注册、登录、密码重置等功能。

## 页面功能概述

用户认证系统是整个平台的基础，包含以下主要功能：

- 用户注册（邮箱验证）
- 用户登录（支持社交登录）
- 密码重置
- 用户信息管理
- 会话管理
- 权限验证

---

## API 接口列表

### 1. 用户注册

**POST** `/api/auth/register`

用户注册接口，支持邮箱注册和手机号注册。

#### 请求体

\`\`\`json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "name": "张三",
  "phone": "13800138000",
  "agreeToTerms": true,
  "subscribeNewsletter": false
}
\`\`\`

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | 是 | 用户邮箱地址 |
| password | string | 是 | 密码（8-20位，包含字母和数字） |
| confirmPassword | string | 是 | 确认密码 |
| name | string | 是 | 用户姓名 |
| phone | string | 否 | 手机号码 |
| agreeToTerms | boolean | 是 | 是否同意服务条款 |
| subscribeNewsletter | boolean | 否 | 是否订阅邮件通知 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "张三",
      "phone": "13800138000",
      "avatar": null,
      "emailVerified": false,
      "role": "user",
      "createdAt": "2024-01-20T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "message": "注册成功，请查收邮箱验证邮件"
  }
}
\`\`\`

#### 错误响应

\`\`\`json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "该邮箱已被注册",
    "details": {
      "field": "email",
      "value": "user@example.com"
    }
  }
}
\`\`\`

---

### 2. 用户登录

**POST** `/api/auth/login`

用户登录接口，支持邮箱/手机号登录。

#### 请求体

\`\`\`json
{
  "identifier": "user@example.com",
  "password": "securePassword123",
  "rememberMe": true,
  "captcha": "abc123"
}
\`\`\`

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| identifier | string | 是 | 邮箱或手机号 |
| password | string | 是 | 用户密码 |
| rememberMe | boolean | 否 | 是否记住登录状态 |
| captcha | string | 否 | 验证码（多次失败后需要） |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "张三",
      "phone": "13800138000",
      "avatar": "https://example.com/avatars/user1.jpg",
      "emailVerified": true,
      "role": "user",
      "preferences": {
        "language": "zh-CN",
        "notifications": {
          "email": true,
          "push": false
        }
      },
      "stats": {
        "adoptionApplications": 2,
        "favoritesPets": 5,
        "volunteerHours": 24
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "lastLoginAt": "2024-01-19T15:20:00.000Z"
  }
}
\`\`\`

---

### 3. 社交登录

**POST** `/api/auth/social/:provider`

支持第三方社交平台登录。

#### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| provider | string | 是 | 社交平台（wechat/qq/weibo） |

#### 请求体

\`\`\`json
{
  "code": "authorization_code_from_provider",
  "state": "random_state_string",
  "redirectUri": "https://petlove.com/auth/callback"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "张三",
      "avatar": "https://wx.qlogo.cn/mmopen/...",
      "socialAccounts": [
        {
          "provider": "wechat",
          "providerId": "wx_openid_123456",
          "connectedAt": "2024-01-20T10:30:00.000Z"
        }
      ]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isNewUser": false
  }
}
\`\`\`

---

### 4. 刷新令牌

**POST** `/api/auth/refresh`

使用刷新令牌获取新的访问令牌。

#### 请求体

\`\`\`json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
\`\`\`

---

### 5. 用户登出

**POST** `/api/auth/logout`

🔒 **需要用户认证**

用户登出接口。

#### 请求头

\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "登出成功"
  }
}
\`\`\`

---

### 6. 发送邮箱验证

**POST** `/api/auth/send-verification`

🔒 **需要用户认证**

发送邮箱验证邮件。

#### 请求体

\`\`\`json
{
  "email": "user@example.com"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "验证邮件已发送",
    "expiresIn": 1800,
    "canResendAt": "2024-01-20T10:35:00.000Z"
  }
}
\`\`\`

---

### 7. 验证邮箱

**POST** `/api/auth/verify-email`

验证邮箱地址。

#### 请求体

\`\`\`json
{
  "token": "email_verification_token",
  "email": "user@example.com"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "邮箱验证成功",
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "emailVerified": true,
      "verifiedAt": "2024-01-20T10:30:00.000Z"
    }
  }
}
\`\`\`

---

### 8. 忘记密码

**POST** `/api/auth/forgot-password`

发送密码重置邮件。

#### 请求体

\`\`\`json
{
  "email": "user@example.com",
  "captcha": "abc123"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "密码重置邮件已发送",
    "expiresIn": 1800
  }
}
\`\`\`

---

### 9. 重置密码

**POST** `/api/auth/reset-password`

使用重置令牌重置密码。

#### 请求体

\`\`\`json
{
  "token": "password_reset_token",
  "password": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "密码重置成功",
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "passwordChangedAt": "2024-01-20T10:30:00.000Z"
    }
  }
}
\`\`\`

---

### 10. 修改密码

**POST** `/api/auth/change-password`

🔒 **需要用户认证**

修改用户密码。

#### 请求体

\`\`\`json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "密码修改成功",
    "passwordChangedAt": "2024-01-20T10:30:00.000Z"
  }
}
\`\`\`

---

### 11. 获取用户信息

**GET** `/api/auth/me`

🔒 **需要用户认证**

获取当前用户详细信息。

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "张三",
      "phone": "13800138000",
      "avatar": "https://example.com/avatars/user1.jpg",
      "bio": "热爱动物的志愿者",
      "location": "北京市朝阳区",
      "emailVerified": true,
      "phoneVerified": false,
      "role": "user",
      "status": "active",
      "preferences": {
        "language": "zh-CN",
        "timezone": "Asia/Shanghai",
        "notifications": {
          "email": true,
          "push": false,
          "sms": false
        },
        "privacy": {
          "showEmail": false,
          "showPhone": false,
          "showLocation": true
        }
      },
      "stats": {
        "adoptionApplications": 2,
        "successfulAdoptions": 1,
        "favoritesPets": 5,
        "volunteerHours": 24,
        "donationAmount": 500,
        "blogPosts": 3,
        "reviews": 8
      },
      "socialAccounts": [
        {
          "provider": "wechat",
          "connected": true,
          "connectedAt": "2024-01-15T08:30:00.000Z"
        }
      ],
      "createdAt": "2024-01-15T08:30:00.000Z",
      "updatedAt": "2024-01-20T10:15:00.000Z",
      "lastLoginAt": "2024-01-20T09:45:00.000Z"
    }
  }
}
\`\`\`

---

### 12. 更新用户信息

**PUT** `/api/auth/profile`

🔒 **需要用户认证**

更新用户个人信息。

#### 请求体

\`\`\`json
{
  "name": "张三丰",
  "bio": "资深宠物救助志愿者，有10年经验",
  "location": "北京市海淀区",
  "phone": "13900139000",
  "preferences": {
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "showEmail": false,
      "showPhone": false,
      "showLocation": true
    }
  }
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "张三丰",
      "bio": "资深宠物救助志愿者，有10年经验",
      "location": "北京市海淀区",
      "phone": "13900139000",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    },
    "message": "个人信息更新成功"
  }
}
\`\`\`

---

### 13. 上传头像

**POST** `/api/auth/avatar`

🔒 **需要用户认证**

上传用户头像。

#### 请求体

使用 `multipart/form-data` 格式：

\`\`\`
Content-Type: multipart/form-data

avatar: [文件数据]
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "avatar": {
      "url": "https://example.com/avatars/user1_new.jpg",
      "thumbnailUrl": "https://example.com/avatars/user1_new_thumb.jpg",
      "uploadedAt": "2024-01-20T10:30:00.000Z"
    },
    "message": "头像上传成功"
  }
}
\`\`\`

---

### 14. 删除账户

**DELETE** `/api/auth/account`

🔒 **需要用户认证**

删除用户账户（软删除）。

#### 请求体

\`\`\`json
{
  "password": "userPassword123",
  "reason": "不再需要此服务",
  "feedback": "希望能增加更多宠物品种"
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "message": "账户删除成功",
    "deletedAt": "2024-01-20T10:30:00.000Z",
    "recoveryDeadline": "2024-02-19T10:30:00.000Z"
  }
}
\`\`\`

---

## 前端集成示例

### React Hook 实现

\`\`\`typescript
// hooks/useAuth.ts
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  emailVerified: boolean;
  preferences: any;
  stats: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (identifier: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化认证状态
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${savedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data.user);
            setToken(savedToken);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // 登录
  const login = async (identifier: string, password: string, rememberMe = false) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
          rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '登录失败');
      }

      const data = await response.json();
      setUser(data.data.user);
      setToken(data.data.token);
      
      if (rememberMe) {
        localStorage.setItem('auth_token', data.data.token);
      } else {
        sessionStorage.setItem('auth_token', data.data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  // 注册
  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '注册失败');
      }

      const data = await response.json();
      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem('auth_token', data.data.token);
    } catch (error) {
      throw error;
    }
  };

  // 登出
  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
    }
  };

  // 更新个人信息
  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '更新失败');
      }

      const responseData = await response.json();
      setUser(prev => prev ? { ...prev, ...responseData.data.user } : null);
    } catch (error) {
      throw error;
    }
  };

  // 修改密码
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '密码修改失败');
      }
    } catch (error) {
      throw error;
    }
  };

  // 发送验证邮件
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '发送失败');
      }
    } catch (error) {
      throw error;
    }
  };

  // 忘记密码
  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '发送失败');
      }
    } catch (error) {
      throw error;
    }
  };

  // 重置密码
  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '重置失败');
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    sendVerificationEmail,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

---

## 错误处理

### 常见错误码

| 错误码 | HTTP状态码 | 说明 | 处理建议 |
|--------|------------|------|----------|
| EMAIL_ALREADY_EXISTS | 409 | 邮箱已被注册 | 提示用户使用其他邮箱或登录 |
| INVALID_CREDENTIALS | 401 | 用户名或密码错误 | 提示用户检查登录信息 |
| EMAIL_NOT_VERIFIED | 403 | 邮箱未验证 | 引导用户验证邮箱 |
| ACCOUNT_LOCKED | 423 | 账户被锁定 | 提示联系客服 |
| TOKEN_EXPIRED | 401 | 令牌已过期 | 自动刷新令牌或重新登录 |
| WEAK_PASSWORD | 422 | 密码强度不足 | 提示密码要求 |
| RATE_LIMITED | 429 | 请求频率超限 | 提示稍后重试 |

---

## 安全考虑

### 1. 密码安全

- 最小长度8位，包含字母和数字
- 使用bcrypt进行哈希存储
- 支持密码强度检测

### 2. 令牌安全

- JWT令牌包含过期时间
- 支持令牌刷新机制
- 敏感操作需要重新验证

### 3. 防护措施

- 登录失败次数限制
- 验证码防护
- IP地址监控
- 异常登录通知

### 4. 数据保护

- 敏感信息加密存储
- 用户数据脱敏
- 审计日志记录
- GDPR合规支持
\`\`\`

创建宠物列表和搜索API文档：
