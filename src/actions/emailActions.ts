'use server'

import { z } from 'zod'
import { verifyRecaptchaToken } from '@/lib/recaptcha'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
})

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const phone = formData.get('phone') as string
    const recaptchaToken = formData.get('recaptchaToken') as string

    const validatedData = contactSchema.parse({ name, email, message, phone })

    // Vérifier le token reCAPTCHA s'il est fourni
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptchaToken(recaptchaToken)
      if (!isValidRecaptcha) {
        return {
          success: false,
          message: 'reCAPTCHA verification failed',
        }
      }
    }

    // Send email via Brevo
    const emailResult = await sendContactEmail({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      phone: validatedData.phone || '',
    })

    if (!emailResult.success) {
      return {
        success: false,
        message: 'Failed to send message. Please try again.',
      }
    }

    return {
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      }
    }

    return {
      success: false,
      message: 'An error occurred while processing your request',
    }
  }
}

async function sendContactEmail(data: {
  name: string
  email: string
  message: string
  phone: string
}): Promise<{ success: boolean; message: string }> {
  try {
    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY || process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      console.error('❌ Brevo API key missing')
      return {
        success: false,
        message: 'Email service configuration error'
      }
    }

    // Send email to admin
    const adminEmailData = {
      sender: {
        name: "Artist Landing",
        email: "noreply@artistlanding.com"
      },
      to: [{ email: process.env.ADMIN_EMAIL || "admin@artistlanding.com" }],
      subject: `New Contact Form Submission from ${data.name}`,
      htmlContent: createAdminEmailTemplate(data)
    }

    const adminResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(adminEmailData)
    })

    if (!adminResponse.ok) {
      const errorData = await adminResponse.json()
      console.error('❌ Brevo API error:', errorData)
      return {
        success: false,
        message: 'Failed to send email'
      }
    }

    // Send confirmation email to user
    const userEmailData = {
      sender: {
        name: "Artist Landing",
        email: "noreply@artistlanding.com"
      },
      to: [{ email: data.email }],
      subject: "Thank you for your message!",
      htmlContent: createUserEmailTemplate(data)
    }

    const userResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(userEmailData)
    })

    if (!userResponse.ok) {
      console.error('❌ Failed to send confirmation email to user')
      // Don't fail the whole process if user email fails
    }

    return {
      success: true,
      message: 'Email sent successfully'
    }

  } catch (error) {
    console.error('❌ Error sending email:', error)
    return {
      success: false,
      message: 'Email service error'
    }
  }
}

function createAdminEmailTemplate(data: {
  name: string
  email: string
  message: string
  phone: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
        }
        .header {
            background: linear-gradient(135deg, #6052ff 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 30px 20px;
        }
        .info-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .footer {
            background-color: #1f2937;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 New Contact Form Submission</h1>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>Contact Information</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Artist Landing</strong> - Contact Form</p>
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
    </div>
</body>
</html>
  `
}

function createUserEmailTemplate(data: {
  name: string
  email: string
  message: string
  phone: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thank you for your message</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
        }
        .header {
            background: linear-gradient(135deg, #6052ff 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 30px 20px;
        }
        .footer {
            background-color: #1f2937;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Thank you for your message!</h1>
        </div>
        
        <div class="content">
            <p>Dear ${data.name},</p>
            
            <p>Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.</p>
            
            <p>We appreciate your interest and look forward to connecting with you.</p>
            
            <p>Best regards,<br>
            <strong>The Artist Team</strong></p>
        </div>
        
        <div class="footer">
            <p><strong>Artist Landing</strong></p>
            <p>This is an automated confirmation email.</p>
        </div>
    </div>
</body>
</html>
  `
}

// Export sendEmail function for catalog API
export async function sendEmail(emailData: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; path: string }>;
}): Promise<{ success: boolean; message: string; messageId?: string }> {
  try {
    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY || process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      console.error('❌ Brevo API key missing')
      console.error('❌ Available env vars:', Object.keys(process.env).filter(key => key.includes('BREVO')))
      return {
        success: false,
        message: 'Email service configuration error - API key missing'
      }
    }

    console.log('✅ Brevo API key found:', brevoApiKey.substring(0, 10) + '...')

    // Prepare email payload
    const emailPayload: {
      sender: { name: string; email: string };
      to: Array<{ email: string }>;
      subject: string;
      htmlContent: string;
      replyTo?: { email: string };
      attachment?: Array<{ content: string; name: string }>;
    } = {
      sender: {
        name: "InRealArt",
        email: "teaminrealart@gmail.com"
      },
      to: [{ email: emailData.to }],
      subject: emailData.subject,
      htmlContent: emailData.html,
      replyTo: {
        email: "teaminrealart@gmail.com"
      }
    }

    // Add attachments if provided
    if (emailData.attachments && emailData.attachments.length > 0) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        emailPayload.attachment = emailData.attachments.map(attachment => {
          const filePath = path.resolve(process.cwd(), attachment.path);
          const fileContent = fs.readFileSync(filePath, 'base64');
          return {
            content: fileContent,
            name: attachment.filename
          };
        });
      } catch (attachmentError) {
        console.error('❌ Error attaching files:', attachmentError);
        // Continue without attachments if file reading fails
      }
    }

    console.log('📧 Sending email to:', emailData.to)
    console.log('📧 Email subject:', emailData.subject)
    console.log('📧 Has attachments:', emailData.attachments ? emailData.attachments.length : 0)

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailPayload)
    })

    console.log('📧 Response status:', response.status)
    console.log('📧 Response ok:', response.ok)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Brevo API error:', errorData)
      console.error('❌ Email payload:', JSON.stringify(emailPayload, null, 2))
      return {
        success: false,
        message: `Failed to send email: ${errorData.message || 'Unknown error'}`
      }
    }

    const responseData = await response.json()
    console.log('✅ Email sent successfully:', responseData)
    console.log('📧 Message ID:', responseData.messageId)
    console.log('📧 Full response:', JSON.stringify(responseData, null, 2))

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: responseData.messageId
    }

  } catch (error) {
    console.error('❌ Error sending email:', error)
    return {
      success: false,
      message: 'Email service error'
    }
  }
}
