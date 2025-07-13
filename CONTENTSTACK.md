# Contentstack Content Management Guide

## Overview
This guide will help you add and manage content in Contentstack for your website. Each section below explains exactly what fields you need to fill and what type of content to enter.

## How to Add Content

1. Log in to your Contentstack account
2. Go to "Content" section
3. Click "Create New Entry"
4. Select "Portfolio" content type
5. Fill in the fields as described below

## Content Structure Guide

### 1. Hero Section
This section appears at the top of your website.

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `hero_text` | Text | Yes | "Welcome to Our Digital Solutions" |
| `banner_image` | Image | Yes | Upload a banner image (recommended size: 1920x1080px) |

### 2. About Section
This section contains your company's mission and story.

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `mission` | Text | Yes | "To provide innovative digital solutions" |
| `story` | Rich Text | Yes | "Our journey began in 2015..." |

### 3. Services Section
This section lists your services. You can add multiple services.

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `id` | Text | Yes | "web-development" (use lowercase, no spaces) |
| `title` | Text | Yes | "Web Development" |
| `description` | Rich Text | Yes | "We build modern web applications..." |
| `image` | Image | Yes | Upload service image (recommended size: 800x600px) |
| `tech_stack` | Array of Text | Yes | ["React", "Node.js", "TypeScript"] |
| `tech_details` | Array of Text | No | ["Frontend Development", "Backend Development"] |
| `use_cases` | Array of Text | No | ["E-commerce", "Social Media"] |
| `features` | Array of Text | Yes | ["Responsive Design", "SEO Friendly"] |
| `benefits` | Array of Text | Yes | ["Faster Loading", "Better Security"] |
| `clients` | Array of References | No | [Select existing client entries] |
| `major_companies` | Group | No | See table below |
| `process` | Group | Yes | See table below |
| `faqs` | Group | No | See table below |
| `market_stats` | Group | No | See table below |
| `checked` | Boolean | Yes | true/false (set to true to display) |

#### Major Companies Group
| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `name` | Text | Yes | "Netflix" |
| `logo` | Image | Yes | Upload company logo (recommended size: 200x200px) |
| `use_case` | Text | Yes | "Uses React for their platform" |
| `website` | URL | Yes | "https://netflix.com" |

#### Process Group
| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `title` | Text | Yes | "Discovery & Planning" |
| `description` | Text | Yes | "We work with you to understand requirements" |

#### FAQs Group
| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `question` | Text | Yes | "What is the typical timeline?" |
| `answer` | Text | Yes | "Projects typically take 2-6 months" |

#### Market Stats Group
| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `Market Size` | Text | No | "$10B+" |
| `Adoption Rate` | Text | No | "85%" |
| `Average ROI` | Text | No | "300%" |
| `Growth Rate` | Text | No | "15% YoY" |

### 4. Clients Section
This section displays your client logos.

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `image` | Image | Yes | Upload client logo (recommended size: 300x200px) |
| `client.url` | URL | No | "https://client-website.com" |

### 5. Contact Section
This section shows your contact information.

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `email` | Email | Yes | "contact@company.com" |
| `phone` | Text | Yes | "+1 234 567 890" |
| `address` | Text | Yes | "123 Business Street, City, Country" |
| `checked` | Boolean | Yes | true/false (set to true to display) |

## Important Notes

### Image Guidelines
- Use high-quality images
- Recommended formats: JPG, PNG, WebP
- Keep file sizes under 2MB
- Use consistent aspect ratios for similar content

### Text Guidelines
- Keep titles concise (under 60 characters)
- Use proper formatting in Rich Text fields
- Avoid special characters in IDs
- Use consistent capitalization in titles

### Publishing Process
1. Fill in all required fields
2. Preview your content
3. Click "Publish" to make it live
4. Verify the content on your website

### Common Issues and Solutions

1. **Content Not Showing**
   - Check if the `checked` field is set to true
   - Verify all required fields are filled
   - Ensure the content is published

2. **Images Not Displaying**
   - Check image dimensions
   - Verify image format
   - Ensure image is published

3. **Service Details Not Showing**
   - Verify service ID matches the URL
   - Check if all required fields are filled
   - Ensure the service is marked as checked

## Need Help?
- Contact your development team for technical support
- Refer to Contentstack's official documentation
- Check the preview before publishing

## Additional Resources
- [Contentstack Documentation](https://www.contentstack.com/docs)
- [Contentstack API Reference](https://www.contentstack.com/docs/developers/apis/content-delivery-api)
- [Image Optimization Guide](https://www.contentstack.com/docs/developers/apis/content-delivery-api) 