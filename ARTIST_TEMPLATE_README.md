# Artist Landing Page Template

This is a reusable template for creating artist landing pages. The template is designed to be easily configurable for different artists by simply updating the data configuration.

## 🎨 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with excellent UX
- **Configurable**: Easy to customize for different artists
- **SEO Optimized**: Proper meta tags and structured data
- **Contact Form**: Integrated contact form with Brevo email service
- **Gallery**: Interactive artwork gallery with modal views
- **Typography**: Beautiful fonts (Bricolage Grotesque for headings, Montserrat for body text)

## 🚀 Quick Start

### 1. Configure Artist Data

Edit `/src/lib/artistData.ts` and update the `defaultArtistData` object with your artist's information:

```typescript
export const defaultArtistData: ArtistData = {
  name: "Artist Name",
  fullName: "Full Artist Name",
  title: "Artist Title",
  tagline: "Artist Tagline",
  bio: "Artist biography...",
  location: "Artist Location",
  
  profileImage: "/images/artist.png",
  backgroundImage: "/images/artist-background.png",
  
  email: "artist@email.com",
  phone: "+1234567890",
  website: "www.artist-website.com",
  socialMedia: {
    instagram: "@artist_handle",
    facebook: "ArtistPage",
  },
  
  artworks: [
    // Add artwork data here
  ],
  
  // ... rest of the configuration
};
```

### 2. Add Artist Images

Place your images in the `/public/images/` directory:
- `artist.png` - Artist profile photo
- `artist-background.png` - Hero section background image
- `artwork-1.webp`, `artwork-2.webp`, etc. - Artwork images

### 3. Update Artwork Data

Add your artwork information to the `artworks` array:

```typescript
artworks: [
  {
    id: "artwork-1",
    title: "Artwork Title",
    year: 2024,
    medium: "Oil on Canvas",
    dimensions: "60cm x 80cm",
    image: "/images/art3f/laville/artwork-1.webp",
    description: "Artwork description...",
    price: "€2,500",
    available: true,
  },
  // Add more artworks...
],
```

### 4. Configure Featured Artworks

Update the `featuredArtworks` array to specify which artworks should be displayed in the gallery:

```typescript
featuredArtworks: ["artwork-1", "artwork-2"],
```

### 5. Update SEO Information

Modify the SEO data for better search engine optimization:

```typescript
seo: {
  title: "Artist Name - Artist Title | Art Description",
  description: "Artist description for search engines...",
  keywords: ["artist", "art", "paintings", "location"],
}
```

### 6. Update Layout Metadata

Edit `/src/app/layout.tsx` to update the page metadata with your artist's information.

## 🎯 Sections

### Hero Section
- Full-screen background image
- Artist name and tagline
- Call-to-action buttons
- Artist profile card with photo

### Gallery Section
- Grid layout of featured artworks
- Click to view artwork details in modal
- Artwork information and pricing
- Availability status

### About Section
- Artist biography
- Contact information
- Artistic specialties
- Notable achievements
- Recent exhibitions

### Contact Section
- Contact form (integrated with Brevo)
- Contact details
- Social media links
- Quick information

## 🛠️ Customization

### Colors
The template uses a clean color scheme with purple accents. To change colors, update the Tailwind classes in the components.

### Typography
- **Headings**: Bricolage Grotesque (configured in globals.css)
- **Body Text**: Montserrat (configured in globals.css)

### Layout
Each section is a separate component, making it easy to:
- Reorder sections
- Add new sections
- Modify existing sections

## 📧 Contact Form Setup

The contact form is already configured to work with Brevo. Make sure your `.env` file contains:

```
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
```

## 🌐 Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred platform (Vercel, Netlify, etc.)
3. Update your domain settings

## 📱 Mobile Responsiveness

The template is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

This template is free to use for personal and commercial projects.

---

**Need help?** The template is designed to be self-explanatory, but feel free to customize it according to your needs!
