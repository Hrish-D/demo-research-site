# AMS Lab Website

A modern, production-ready research lab website featuring portfolio-style design, academic structure, and an advanced research paper management system.

## Features

✨ **Modern Design**
- Portfolio-style layout inspired by leading design websites
- Minimalist, clean UI with professional aesthetics
- Smooth scroll animations and transitions
- Responsive mobile design
- Dark mode ready

🔬 **Academic Structure**
- Comprehensive research project showcase
- Publication management and filtering
- Team member profiles organized by role
- Rich lab information and statistics

📚 **Advanced Paper System**
- Public research paper library with search and filtering
- PDF viewer integration
- Researcher dashboard for paper uploads
- Local storage for paper management
- Tag-based organization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 10
- **Language**: TypeScript
- **Fonts**: EB Garamond (serif), Inter (sans-serif)

## Project Structure

```
├── app/
│   ├── layout.tsx              # Global layout
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Home page
│   ├── research/
│   │   └── page.tsx            # Research projects page
│   ├── publications/
│   │   └── page.tsx            # Publications page
│   ├── team/
│   │   └── page.tsx            # Team page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── library/
│   │   └── page.tsx            # Research paper library
│   └── dashboard/
│       └── page.tsx            # Researcher dashboard
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── HeroSection.tsx         # Hero section component
│   ├── ProjectCard.tsx         # Research project card
│   ├── PublicationCard.tsx     # Publication card
│   ├── TeamCard.tsx            # Team member card
│   ├── SearchBar.tsx           # Search input component
│   ├── FilterBar.tsx           # Filter component
│   ├── PaperUploadForm.tsx     # Paper upload form
│   └── PaperViewer.tsx         # Paper viewer component
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   └── data.ts                 # Lab data and sample content
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── next.config.js              # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 16+ (npm, yarn, or pnpm)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DemoResearchSite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Pages

### Home (`/`)
Landing page with hero section, lab statistics, featured research projects, and call-to-action.

### Research (`/research`)
Browse all research projects with filtering by research area and project status (Active, Completed, Planned).

### Publications (`/publications`)
View publications with search and filtering by tags. Publications are organized by year.

### Team (`/team`)
Team member profiles organized by role (PI, PhD Students, Undergraduates, Collaborators).

### Contact (`/contact`)
Contact information and contact form for inquiries and collaboration requests.

### Library (`/library`)
Research paper library with search, filtering, and paper previews. Features embedded PDF viewer.

### Dashboard (`/dashboard`)
Researcher-only dashboard for uploading and managing research papers. Uses localStorage for data persistence.

## Customization

### Update Lab Information

Edit `/lib/data.ts` to update:
- Lab name and description
- Team members
- Research projects
- Publications
- Statistics

### Modify Colors

Update color palette in `tailwind.config.ts`:
1. Modify the `theme.extend.colors` section
2. Update CSS variables in `app/globals.css` if needed

### Add Images

1. Create an `public/images/` directory
2. Organize images by category (team, projects, etc.)
3. Update image paths in data.ts and components

### Typography

The site uses EB Garamond for headings and Inter for body text. To change:
1. Edit font imports in `app/layout.tsx`
2. Update `tailwind.config.ts` fontFamily configuration

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation

### Animations
- Fade-in effects on scroll
- Card hover animations
- Smooth page transitions
- Navigation animations using Framer Motion

### Paper Management
- Upload papers with metadata (title, authors, abstract, tags, year)
- Local storage for persistence
- Search by title, authors, keywords
- Filter by research tags
- Download and view PDF

### Dark Mode Ready
Tailwind CSS configuration supports dark mode implementation.

## Performance

- Optimized images (consider using Next.js Image component)
- Code splitting with Next.js
- CSS minification with Tailwind
- Fast page transitions with App Router

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Building for Production

```bash
npm run build
npm start
```

The project will be optimized and ready for deployment.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically on git push

### Other Platforms
- Netlify
- AWS Amplify
- Docker containers
- Traditional servers (Node.js hosting)

## Contributing

This is a template/demo project. Feel free to customize and extend as needed.

## License

Feel free to use this template for your own research lab or academic website.

## Support

For questions about:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
- React: https://react.dev

## Future Enhancements

Potential features to add:
- [ ] Backend API integration
- [ ] Database (PostgreSQL, MongoDB)
- [ ] Authentication system (NextAuth.js)
- [ ] Blog/News section
- [ ] Seminars/Events calendar
- [ ] Funding information
- [ ] Student testimonials
- [ ] Image gallery
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Email notifications

---

**Built with ❤️ for research labs and academic groups**
