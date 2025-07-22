# 宠物列表和搜索 API 接口文档

本文档详细描述了宠物列表展示和搜索功能的所有API接口。

## 页面功能概述

宠物列表和搜索系统是用户发现宠物的核心功能，包含以下主要功能：

- 宠物列表展示（分页、排序）
- 高级搜索和筛选
- 地理位置搜索
- 收藏和比较功能
- 推荐算法
- 统计和分析

---

## API 接口列表

### 1. 获取宠物列表

**GET** `/api/pets`

获取宠物列表，支持分页、排序和基础筛选。

#### 查询参数

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| page | number | 否 | 页码 | 1 |
| limit | number | 否 | 每页数量 | 12 |
| sort | string | 否 | 排序方式 | created_desc |
| type | string | 否 | 宠物类型 | - |
| breed | string | 否 | 品种 | - |
| age | string | 否 | 年龄范围 | - |
| gender | string | 否 | 性别 | - |
| size | string | 否 | 体型 | - |
| location | string | 否 | 地区 | - |
| status | string | 否 | 状态 | available |
| featured | boolean | 否 | 是否推荐 | - |
| urgent | boolean | 否 | 是否紧急 | - |

#### 排序选项

| 值 | 说明 |
|-----|------|
| created_desc | 最新发布 |
| created_asc | 最早发布 |
| updated_desc | 最近更新 |
| views_desc | 浏览量高 |
| likes_desc | 收藏量高 |
| age_asc | 年龄从小到大 |
| age_desc | 年龄从大到小 |

#### 请求示例

\`\`\`bash
GET /api/pets?page=1&limit=12&type=狗狗&sort=created_desc&location=北京
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "pets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "小白",
        "type": "狗狗",
        "breed": "金毛",
        "age": "2岁",
        "gender": "公",
        "size": "大型",
        "color": "金黄色",
        "location": "北京市朝阳区",
        "description": "温顺友好的金毛犬...",
        "primaryImage": {
          "url": "https://example.com/pets/xiaobai_1.jpg",
          "alt": "小白照片"
        },
        "images": [
          {
            "url": "https://example.com/pets/xiaobai_1.jpg",
            "alt": "小白正面照",
            "isPrimary": true
          }
        ],
        "adoptionInfo": {
          "fee": 500,
          "status": "available"
        },
        "medicalInfo": {
          "vaccinated": true,
          "neutered": false,
          "healthStatus": "excellent"
        },
        "stats": {
          "views": 1256,
          "likes": 89,
          "shares": 23
        },
        "featured": true,
        "urgent": false,
        "isLikedByUser": false,
        "distance": 5.2,
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-20T10:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalItems": 180,
      "itemsPerPage": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "appliedFilters": {
        "type": "狗狗",
        "location": "北京"
      },
      "availableFilters": {
        "types": [
          { "value": "狗狗", "count": 120 },
          { "value": "猫咪", "count": 45 },
          { "value": "兔子", "count": 15 }
        ],
        "breeds": [
          { "value": "金毛", "count": 25 },
          { "value": "拉布拉多", "count": 20 }
        ],
        "locations": [
          { "value": "北京市朝阳区", "count": 30 },
          { "value": "北京市海淀区", "count": 25 }
        ]
      }
    }
  }
}
\`\`\`

---

### 2. 高级搜索

**POST** `/api/pets/search`

高级搜索接口，支持复杂的搜索条件组合。

#### 请求体

\`\`\`json
{
  "query": {
    "keyword": "金毛 温顺",
    "filters": {
      "type": ["狗狗"],
      "breed": ["金毛", "拉布拉多"],
      "age": {
        "min": 1,
        "max": 5
      },
      "gender": ["公", "母"],
      "size": ["中型", "大型"],
      "location": {
        "city": "北京市",
        "districts": ["朝阳区", "海淀区"],
        "radius": 10
      },
      "adoptionFee": {
        "min": 0,
        "max": 1000
      },
      "medicalInfo": {
        "vaccinated": true,
        "neutered": null,
        "healthStatus": ["excellent", "good"]
      },
      "personality": ["友善", "活泼"],
      "goodWith": {
        "children": true,
        "pets": null,
        "seniors": null
      }
    },
    "sort": {
      "field": "relevance",
      "order": "desc"
    },
    "pagination": {
      "page": 1,
      "limit": 20
    }
  },
  "preferences": {
    "includeDistance": true,
    "userLocation": {
      "latitude": 39.9042,
      "longitude": 116.4074
    }
  }
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "pets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "小白",
        "relevanceScore": 0.95,
        "matchReasons": [
          "品种匹配：金毛",
          "性格匹配：友善、活泼",
          "地理位置：距离5.2公里"
        ],
        "highlights": {
          "description": "温顺<em>友好</em>的<em>金毛</em>犬...",
          "personality": ["<em>友善</em>", "<em>活泼</em>"]
        }
      }
    ],
    "searchMeta": {
      "totalResults": 45,
      "searchTime": 0.12,
      "query": "金毛 温顺",
      "suggestions": [
        "金毛犬",
        "温顺狗狗",
        "大型犬"
      ]
    },
    "aggregations": {
      "byType": {
        "狗狗": 40,
        "猫咪": 5
      },
      "byLocation": {
        "朝阳区": 25,
        "海淀区": 20
      },
      "byAge": {
        "1-2岁": 15,
        "2-3岁": 20,
        "3-5岁": 10
      }
    }
  }
}
\`\`\`

---

### 3. 地理位置搜索

**GET** `/api/pets/nearby`

基于地理位置的宠物搜索。

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |
| radius | number | 否 | 搜索半径（公里） |
| limit | number | 否 | 返回数量 |

#### 请求示例

\`\`\`bash
GET /api/pets/nearby?lat=39.9042&lng=116.4074&radius=10&limit=20
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "pets": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "小白",
        "distance": 2.5,
        "shelter": {
          "name": "爱心动物救助中心",
          "address": "北京市朝阳区宠物大街123号",
          "coordinates": {
            "latitude": 39.9142,
            "longitude": 116.4174
          }
        }
      }
    ],
    "searchCenter": {
      "latitude": 39.9042,
      "longitude": 116.4074
    },
    "searchRadius": 10
  }
}
\`\`\`

---

### 4. 搜索建议

**GET** `/api/pets/search/suggestions`

获取搜索建议和自动补全。

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词 |
| type | string | 否 | 建议类型 |
| limit | number | 否 | 返回数量 |

#### 请求示例

\`\`\`bash
GET /api/pets/search/suggestions?q=金毛&limit=10
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "text": "金毛犬",
        "type": "breed",
        "count": 25,
        "category": "品种"
      },
      {
        "text": "金毛寻回犬",
        "type": "breed",
        "count": 20,
        "category": "品种"
      },
      {
        "text": "金毛幼犬",
        "type": "keyword",
        "count": 15,
        "category": "关键词"
      }
    ],
    "popularSearches": [
      "拉布拉多",
      "英短猫",
      "边牧",
      "柯基"
    ],
    "recentSearches": [
      "金毛 北京",
      "小型犬 已绝育",
      "猫咪 朝阳区"
    ]
  }
}
\`\`\`

---

### 5. 保存搜索条件

**POST** `/api/pets/search/save`

🔒 **需要用户认证**

保存用户的搜索条件，用于后续快速搜索和推送通知。

#### 请求体

\`\`\`json
{
  "name": "我的理想宠物",
  "searchCriteria": {
    "type": ["狗狗"],
    "breed": ["金毛", "拉布拉多"],
    "age": { "min": 1, "max": 3 },
    "location": {
      "city": "北京市",
      "radius": 15
    }
  },
  "notifications": {
    "email": true,
    "push": true,
    "frequency": "daily"
  }
}
\`\`\`

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "savedSearch": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "我的理想宠物",
      "searchCriteria": {
        "type": ["狗狗"],
        "breed": ["金毛", "拉布拉多"]
      },
      "notifications": {
        "email": true,
        "push": true,
        "frequency": "daily"
      },
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  }
}
\`\`\`

---

### 6. 获取筛选选项

**GET** `/api/pets/filters`

获取所有可用的筛选选项和统计信息。

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "filters": {
      "types": [
        {
          "value": "狗狗",
          "label": "狗狗",
          "count": 120,
          "icon": "🐕"
        },
        {
          "value": "猫咪",
          "label": "猫咪",
          "count": 85,
          "icon": "🐱"
        },
        {
          "value": "兔子",
          "label": "兔子",
          "count": 15,
          "icon": "🐰"
        }
      ],
      "breeds": {
        "狗狗": [
          { "value": "金毛", "label": "金毛寻回犬", "count": 25 },
          { "value": "拉布拉多", "label": "拉布拉多", "count": 20 },
          { "value": "边牧", "label": "边境牧羊犬", "count": 15 }
        ],
        "猫咪": [
          { "value": "英短", "label": "英国短毛猫", "count": 30 },
          { "value": "美短", "label": "美国短毛猫", "count": 25 }
        ]
      },
      "ages": [
        { "value": "幼年", "label": "幼年 (0-1岁)", "count": 45 },
        { "value": "青年", "label": "青年 (1-3岁)", "count": 80 },
        { "value": "成年", "label": "成年 (3-7岁)", "count": 60 },
        { "value": "老年", "label": "老年 (7岁以上)", "count": 35 }
      ],
      "sizes": [
        { "value": "小型", "label": "小型 (<10kg)", "count": 90 },
        { "value": "中型", "label": "中型 (10-25kg)", "count": 70 },
        { "value": "大型", "label": "大型 (>25kg)", "count": 60 }
      ],
      "genders": [
        { "value": "公", "label": "公", "count": 110 },
        { "value": "母", "label": "母", "count": 110 }
      ],
      "locations": [
        {
          "value": "北京市",
          "label": "北京市",
          "count": 80,
          "children": [
            { "value": "朝阳区", "label": "朝阳区", "count": 30 },
            { "value": "海淀区", "label": "海淀区", "count": 25 },
            { "value": "西城区", "label": "西城区", "count": 25 }
          ]
        }
      ],
      "adoptionFees": [
        { "value": "0-200", "label": "200元以下", "count": 50 },
        { "value": "200-500", "label": "200-500元", "count": 80 },
        { "value": "500-1000", "label": "500-1000元", "count": 60 },
        { "value": "1000+", "label": "1000元以上", "count": 30 }
      ],
      "medicalStatus": [
        { "value": "vaccinated", "label": "已疫苗", "count": 180 },
        { "value": "neutered", "label": "已绝育", "count": 120 },
        { "value": "microchipped", "label": "已植入芯片", "count": 150 }
      ],
      "personality": [
        { "value": "友善", "label": "友善", "count": 150 },
        { "value": "活泼", "label": "活泼", "count": 120 },
        { "value": "温顺", "label": "温顺", "count": 100 },
        { "value": "聪明", "label": "聪明", "count": 90 },
        { "value": "独立", "label": "独立", "count": 70 }
      ]
    },
    "stats": {
      "totalPets": 220,
      "availablePets": 180,
      "adoptedThisMonth": 25,
      "newArrivals": 15
    }
  }
}
\`\`\`

---

### 7. 批量操作

**POST** `/api/pets/batch`

🔒 **需要用户认证**

批量操作宠物（收藏、比较等）。

#### 请求体

\`\`\`json
{
  "action": "add_to_favorites",
  "petIds": [
    "64f1a2b3c4d5e6f7g8h9i0j1",
    "64f1a2b3c4d5e6f7g8h9i0j2",
    "64f1a2b3c4d5e6f7g8h9i0j3"
  ]
}
\`\`\`

#### 支持的操作

| 操作 | 说明 |
|------|------|
| add_to_favorites | 添加到收藏 |
| remove_from_favorites | 从收藏移除 |
| add_to_comparison | 添加到比较 |
| remove_from_comparison | 从比较移除 |

#### 响应示例

\`\`\`json
{
  "success": true,
  "data": {
    "processed": 3,
    "successful": 2,
    "failed": 1,
    "results": [
      {
        "petId": "64f1a2b3c4d5e6f7g8h9i0j1",
        "success": true
      },
      {
        "petId": "64f1a2b3c4d5e6f7g8h9i0j2",
        "success": true
      },
      {
        "petId": "64f1a2b3c4d5e6f7g8h9i0j3",
        "success": false,
        "error": "宠物不存在"
      }
    ]
  }
}
\`\`\`

---

## 前端集成示例

### React Hook 实现

\`\`\`typescript
// hooks/usePetSearch.ts
import { useState, useEffect, useCallback } from 'react';

interface SearchFilters {
  type?: string[];
  breed?: string[];
  age?: { min?: number; max?: number };
  gender?: string[];
  size?: string[];
  location?: {
    city?: string;
    districts?: string[];
    radius?: number;
  };
  adoptionFee?: { min?: number; max?: number };
  medicalInfo?: {
    vaccinated?: boolean;
    neutered?: boolean;
    healthStatus?: string[];
  };
  personality?: string[];
}

interface SearchOptions {
  keyword?: string;
  filters?: SearchFilters;
  sort?: string;
  page?: number;
  limit?: number;
}

export const usePetSearch = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [searchMeta, setSearchMeta] = useState<any>(null);

  // 搜索宠物
  const searchPets = useCallback(async (options: SearchOptions) => {
    try {
      setLoading(true);
      setError(null);

      const isAdvancedSearch = options.keyword || Object.keys(options.filters || {}).length > 0;
      
      let response;
      if (isAdvancedSearch) {
        response = await fetch('/api/pets/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: {
              keyword: options.keyword,
              filters: options.filters,
              sort: {
                field: options.sort?.split('_')[0] || 'created',
                order: options.sort?.split('_')[1] || 'desc',
              },
              pagination: {
                page: options.page || 1,
                limit: options.limit || 12,
              },
            },
          }),
        });
      } else {
        const params = new URLSearchParams();
        if (options.page) params.append('page', options.page.toString());
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.sort) params.append('sort', options.sort);

        response = await fetch(`/api/pets?${params.toString()}`);
      }

      if (!response.ok) {
        throw new Error('搜索失败');
      }

      const data = await response.json();
      setPets(data.data.pets);
      setPagination(data.data.pagination);
      setFilters(data.data.filters || data.data.availableFilters);
      setSearchMeta(data.data.searchMeta);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取附近的宠物
  const searchNearby = useCallback(async (lat: number, lng: number, radius = 10) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/pets/nearby?lat=${lat}&lng=${lng}&radius=${radius}&limit=20`
      );

      if (!response.ok) {
        throw new Error('获取附近宠物失败');
      }

      const data = await response.json();
      setPets(data.data.pets);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取搜索建议
  const getSuggestions = useCallback(async (query: string) => {
    try {
      const response = await fetch(
        `/api/pets/search/suggestions?q=${encodeURIComponent(query)}&limit=10`
      );

      if (!response.ok) {
        throw new Error('获取建议失败');
      }

      const data = await response.json();
      return data.data.suggestions;
    } catch (err) {
      console.error('获取搜索建议失败:', err);
      return [];
    }
  }, []);

  // 保存搜索条件
  const saveSearch = useCallback(async (name: string, criteria: SearchFilters) => {
    try {
      const response = await fetch('/api/pets/search/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          name,
          searchCriteria: criteria,
          notifications: {
            email: true,
            push: true,
            frequency: 'daily',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('保存搜索条件失败');
      }

      const data = await response.json();
      return data.data.savedSearch;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    pets,
    loading,
    error,
    pagination,
    filters,
    searchMeta,
    searchPets,
    searchNearby,
    getSuggestions,
    saveSearch,
  };
};
\`\`\`

### 搜索组件示例

\`\`\`tsx
// components/PetSearch.tsx
import React, { useState, useEffect } from 'react';
import { usePetSearch } from '../hooks/usePetSearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, MapPin } from 'lucide-react';

export const PetSearch: React.FC = () => {
  const {
    pets,
    loading,
    error,
    pagination,
    filters,
    searchPets,
    searchNearby,
    getSuggestions,
  } = usePetSearch();

  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('created_desc');

  // 获取搜索建议
  useEffect(() => {
    if (keyword.length > 1) {
      const timer = setTimeout(async () => {
        const results = await getSuggestions(keyword);
        setSuggestions(results);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [keyword, getSuggestions]);

  // 执行搜索
  const handleSearch = () => {
    searchPets({
      keyword,
      filters: selectedFilters,
      sort: sortBy,
      page: 1,
      limit: 12,
    });
  };

  // 地理位置搜索
  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          searchNearby(
            position.coords.latitude,
            position.coords.longitude,
            10
          );
        },
        (error) => {
          console.error('获取位置失败:', error);
        }
      );
    }
  };

  // 更新筛选条件
  const updateFilter = (key: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="pet-search">
      {/* 搜索栏 */}
      <div className="search-bar flex gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="搜索宠物品种、特征..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          
          {/* 搜索建议 */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 mt-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setKeyword(suggestion.text);
                    setSuggestions([]);
                  }}
                >
                  <span className="font-medium">{suggestion.text}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({suggestion.count})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="h-4 w-4 mr-2" />
          搜索
        </Button>
        
        <Button variant="outline" onClick={handleLocationSearch}>
          <MapPin className="h-4 w-4 mr-2" />
          附近
        </Button>
      </div>

      {/* 筛选器 */}
      <div className="filters grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Select onValueChange={(value) => updateFilter('type', [value])}>
          <SelectTrigger>
            <SelectValue placeholder="宠物类型" />
          </SelectTrigger>
          <SelectContent>
            {filters?.types?.map((type: any) => (
              <SelectItem key={type.value} value={type.value}>
                {type.icon} {type.label} ({type.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => updateFilter('age', value)}>
          <SelectTrigger>
            <SelectValue placeholder="年龄" />
          </SelectTrigger>
          <SelectContent>
            {filters?.ages?.map((age: any) => (
              <SelectItem key={age.value} value={age.value}>
                {age.label} ({age.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => updateFilter('size', [value])}>
          <SelectTrigger>
            <SelectValue placeholder="体型" />
          </SelectTrigger>
          <SelectContent>
            {filters?.sizes?.map((size: any) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label} ({size.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="排序方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_desc">最新发布</SelectItem>
            <SelectItem value="views_desc">浏览量高</SelectItem>
            <SelectItem value="likes_desc">收藏量高</SelectItem>
            <SelectItem value="age_asc">年龄从小到大</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 搜索结果 */}
      <div className="search-results">
        {loading && <div className="text-center py-8">搜索中...</div>}
        
        {error && (
          <div className="text-center py-8 text-red-500">
            搜索失败: {error}
          </div>
        )}

        {pets.length > 0 && (
          <>
            <div className="results-header flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                找到 {pagination?.totalItems} 只宠物
              </span>
            </div>

            <div className="pets-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pets.map((pet) => (
                <div key={pet.id} className="pet-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={pet.primaryImage?.url || '/placeholder.svg?height=200&width=300'}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{pet.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pet.breed} • {pet.age} • {pet.gender}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      📍 {pet.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-orange-600">
                        ¥{pet.adoptionInfo.fee}
                      </span>
                      <Button size="sm">查看详情</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            {pagination && pagination.totalPages > 1 && (
              <div className="pagination flex justify-center mt-8">
                <Button
                  variant="outline"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => handleSearch()}
                >
                  上一页
                </Button>
                <span className="mx-4 py-2">
                  第 {pagination.currentPage} 页，共 {pagination.totalPages} 页
                </span>
                <Button
                  variant="outline"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handleSearch()}
                >
                  下一页
                </Button>
              </div>
            )}
          </>
        )}

        {!loading && !error && pets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              没有找到匹配的宠物
            </h3>
            <p className="text-gray-500">
              尝试调整搜索条件或浏览所有宠物
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
\`\`\`

---

## 性能优化

### 1. 搜索优化

- 使用Elasticsearch进行全文搜索
- 实现搜索结果缓存
- 支持搜索建议预加载

### 2. 分页优化

- 使用游标分页提高性能
- 实现虚拟滚动
- 预加载下一页数据

### 3. 图片优化

- 使用CDN加速图片加载
- 实现图片懒加载
- 提供多种尺寸的图片

### 4. 缓存策略

- Redis缓存热门搜索结果
- 浏览器缓存筛选选项
- CDN缓存静态资源
\`\`\`

创建预约和服务API文档：
