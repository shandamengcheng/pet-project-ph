const nodemailer = require("nodemailer")
const fs = require("fs").promises
const path = require("path")

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Load email template
const loadTemplate = async (templateName) => {
  try {
    const templatePath = path.join(__dirname, "../templates/email", `${templateName}.html`)
    return await fs.readFile(templatePath, "utf8")
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error)
    return null
  }
}

// Replace template variables
const replaceTemplateVariables = (template, data) => {
  let result = template
  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{${key}}}`, "g")
    result = result.replace(regex, value)
  }
  return result
}

// Send email
const sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    const transporter = createTransporter()

    let emailHtml = html
    const emailText = text

    // If template is provided, load and process it
    if (template) {
      const templateHtml = await loadTemplate(template)
      if (templateHtml) {
        emailHtml = replaceTemplateVariables(templateHtml, data || {})
      }
    }

    const mailOptions = {
      from: `"爱宠之家" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: emailHtml,
      text: emailText,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

// Send welcome email
const sendWelcomeEmail = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "欢迎加入爱宠之家！",
    template: "welcome",
    data: {
      name: user.fullName,
      email: user.email,
      loginUrl: `${process.env.FRONTEND_URL}/login`,
    },
  })
}

// Send adoption confirmation email
const sendAdoptionConfirmationEmail = async (adoption) => {
  return sendEmail({
    to: adoption.applicant.email,
    subject: "领养申请确认 - 爱宠之家",
    template: "adoptionConfirmation",
    data: {
      applicantName: adoption.applicant.fullName,
      petName: adoption.pet.name,
      applicationId: adoption._id,
      statusUrl: `${process.env.FRONTEND_URL}/adoption-status/${adoption._id}`,
    },
  })
}

// Send booking confirmation email
const sendBookingConfirmationEmail = async (booking) => {
  return sendEmail({
    to: booking.user.email,
    subject: "服务预约确认 - 爱宠之家",
    template: "bookingConfirmation",
    data: {
      userName: booking.user.fullName,
      serviceName: booking.service.name,
      bookingDate: booking.bookingDetails.date.toLocaleDateString("zh-CN"),
      bookingTime: booking.bookingDetails.time,
      totalAmount: booking.pricing.totalAmount,
      bookingId: booking._id,
    },
  })
}

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendAdoptionConfirmationEmail,
  sendBookingConfirmationEmail,
}
