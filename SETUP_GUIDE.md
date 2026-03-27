# Project Setup Guide

## ✅ Project Files Created Successfully!

Your modern research lab website is fully built and ready to run. Here's everything that was created:

### 📁 Directory Structure

```
DemoResearchSite/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Global layout with fonts & metadata
│   ├── globals.css              # Global Tailwind styles
│   ├── page.tsx                 # Home page ✨
│   ├── research/page.tsx        # Research projects with filtering
│   ├── publications/page.tsx    # Publications with search & filters
│   ├── team/page.tsx            # Team member profiles
│   ├── contact/page.tsx         # Contact form
│   ├── library/page.tsx         # Research paper library ⭐
│   └── dashboard/page.tsx       # Researcher upload dashboard
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx              # Sticky navigation bar
│   ├── Footer.tsx              # Footer with links
│   ├── HeroSection.tsx         # Hero banner component
│   ├── ProjectCard.tsx         # Research project card
│   ├── PublicationCard.tsx     # Publication display card
│   ├── TeamCard.tsx            # Team member profile card
│   ├── SearchBar.tsx           # Search input component
│   ├── FilterBar.tsx           # Tag filtering component
│   ├── PaperUploadForm.tsx     # Paper upload form
│   └── PaperViewer.tsx         # PDF viewer component
│
├── lib/                         # Data & utilities
│   ├── types.ts                # TypeScript type definitions
│   └── data.ts                 # Lab data (no changes needed)
│
├── public/                      # Static assets (create as needed)
│   └── images/                 # Images directory
│
├── Configuration Files          # Project setup
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── tailwind.config.ts      # Tailwind CSS config
│   ├── postcss.config.mjs      # PostCSS config
│   ├── next.config.js          # Next.js config
│   ├── .eslintrc.json          # ESLint config
│   ├── .gitignore              # Git ignore patterns
│   ├── .env.example            # Environment template
│   └── README.md               # Full documentation

```

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
Open a terminal in the project directory and run:
```bash
npm install
```

This will install:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- TypeScript

### Step 2: Run Development Server
```bash
npm run dev
```

You should see:
```
> ams-lab-website@1.0.0 dev
> next dev

  ▲ Next.js 14.2.3
  - Local:        http://localhost:3000
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000** ✨

## 📖 Available Pages

| URL | Description |
|-----|-------------|
| `/` | Home page with hero, stats, featured projects |
| `/research` | All research projects with filtering |
| `/publications` | Publications sorted by year with search |
| `/team` | Team members organized by role |
| `/contact` | Contact form and information |
| `/library` | Research paper library with PDF viewer |
| `/dashboard` | Researcher dashboard for uploading papers |

## ✨ Key Features

### 🎨 Design
- Minimalist, modern aesthetic
- Smooth scroll animations (Framer Motion)
- Responsive mobile design
- Professional typography (EB Garamond + Inter)
- Clean color scheme (blue/slate)

### 📚 Research Features
- **Project Showcase**: Browse research initiatives with filtering
- **Paper Library**: Search and view research papers
- **Publication List**: Academic formatting with filtering
- **Team Profiles**: Members organized by role

### 🔐 Advanced
- **Researcher Dashboard**: Mock-authenticated paper uploads
- **Local Storage**: Paper management persists in browser
- **PDF Viewer**: Embedded PDF preview
- **Search & Filter**: Find papers by keywords, tags, year

## 🎯 Customization

### Update Lab Information
Edit `/lib/data.ts`:
- LAB_NAME
- LAB_DESCRIPTION
- Team members
- Research projects
- Publications
- Lab statistics

### Add Images
1. Create: `public/images/team/`, `public/images/projects/`
2. Add image files (JPG, PNG)
3. Update paths in `lib/data.ts`

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  blue: { /* your colors */ },
  slate: { /* your colors */ }
}
```

### Update Navigation Links
Edit `components/Navbar.tsx` - `navItems` array

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

Deploy to other platforms:
- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Connect GitHub repo
- **Traditional Server**: Run `npm start`
- **Docker**: Use Node.js image

## 📝 Next Steps

### Essential:
- [ ] Replace placeholder images in `public/images/`
- [ ] Update lab data in `lib/data.ts`
- [ ] Update contact email in data
- [ ] Customize colors/fonts if desired

### Optional:
- [ ] Add your institution logo
- [ ] Update social links
- [ ] Add Google Analytics
- [ ] Set up email notifications
- [ ] Connect to a backend API
- [ ] Implement real authentication

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
npm run dev -- -p 3001
```

### TypeScript Errors?
Usually resolved after `npm install`. Rebuild:
```bash
npm run build
```

### CSS Not Loading?
Clear cache:
```bash
rm -rf .next
npm run dev
```

### Components Not Found?
Make sure path aliases in `tsconfig.json` match imports (using `@/` prefix)

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/

## 💡 Design Inspiration References

This project was inspired by:
- [oscardumlao.com](https://www.oscardumlao.com/) - Portfolio style
- [haleypark.design](https://haleypark.design/) - Modern aesthetics
- [abhijitrout.in](https://www.abhijitrout.in/) - Clean design
- [terrerlab.com](https://www.terrerlab.com/) - Lab structure
- [bhamla.gatech.edu](https://bhamla.gatech.edu/) - Academic layout

## 📞 Support

For help with:
- **Framework Issues**: Check Next.js docs
- **Styling Issues**: See Tailwind CSS docs
- **Animations**: Explore Framer Motion examples
- **TypeScript**: Reference TypeScript handbook

## ✅ Verification Checklist

After `npm install` and running `npm run dev`:

- [ ] Home page loads at localhost:3000
- [ ] All navigation links work
- [ ] Research page shows projects
- [ ] Publications page displays papers
- [ ] Team page shows members
- [ ] Contact form appears
- [ ] Library page allows searches
- [ ] Dashboard requires mock login
- [ ] No console errors
- [ ] Mobile responsive on small screens

## 🎉 You're Ready!

Your research lab website is production-ready and can be shown to professors and administrators to demonstrate your web development capabilities. The combination of:

✨ **Modern design** + 📚 **Academic content** + 🔧 **Advanced features** = **Impressive demo**

---

**Next Command:**
```bash
npm install && npm run dev
```

**Then open:** http://localhost:3000

Happy coding! 🚀
