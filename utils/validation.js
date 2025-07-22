const Joi = require("joi")

const validateRegistration = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required().messages({
      "string.min": "姓名至少需要2个字符",
      "string.max": "姓名不能超过100个字符",
      "any.required": "姓名不能为空",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "请输入有效的邮箱地址",
      "any.required": "邮箱不能为空",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "密码至少需要6个字符",
      "any.required": "密码不能为空",
    }),
    phone: Joi.string().optional(),
  })

  return schema.validate(data)
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "请输入有效的邮箱地址",
      "any.required": "邮箱不能为空",
    }),
    password: Joi.string().required().messages({
      "any.required": "密码不能为空",
    }),
  })

  return schema.validate(data)
}

const validatePet = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    type: Joi.string().valid("狗狗", "猫咪", "兔子", "仓鼠", "鸟类", "其他").required(),
    breed: Joi.string().required(),
    age: Joi.string().required(),
    gender: Joi.string().valid("公", "母").required(),
    weight: Joi.string().optional(),
    size: Joi.string().valid("小型", "中型", "大型", "超大型").optional(),
    color: Joi.string().optional(),
    location: Joi.string().required(),
    description: Joi.string().max(1000).required(),
    personality: Joi.array().items(Joi.string()).optional(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
          alt: Joi.string().optional(),
          isPrimary: Joi.boolean().optional(),
        }),
      )
      .optional(),
    medicalInfo: Joi.object({
      vaccinated: Joi.boolean().optional(),
      neutered: Joi.boolean().optional(),
      microchipped: Joi.boolean().optional(),
      medicalHistory: Joi.string().optional(),
      specialNeeds: Joi.string().optional(),
      allergies: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    adoptionInfo: Joi.object({
      fee: Joi.number().min(0).required(),
      status: Joi.string().valid("available", "pending", "adopted", "unavailable").optional(),
      idealFamily: Joi.string().optional(),
      requirements: Joi.array().items(Joi.string()).optional(),
    }).required(),
    rescueStory: Joi.string().max(2000).optional(),
    featured: Joi.boolean().optional(),
  })

  return schema.validate(data)
}

module.exports = {
  validateRegistration,
  validateLogin,
  validatePet,
}
