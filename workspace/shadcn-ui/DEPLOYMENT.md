# 🚀 Deployment Guide - AyurVeda Diet Management System

This guide provides step-by-step instructions for deploying the AyurVeda Diet Management System to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Google AI API key obtained
- [ ] Project builds successfully locally (`pnpm run build`)
- [ ] All environment variables configured
- [ ] Testing completed
- [ ] Repository pushed to GitHub

## 🌐 Platform-Specific Deployment

### 1. Vercel (Recommended) ⚡

**Why Vercel?**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions support
- Perfect for React applications

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from project directory**
```bash
vercel --prod
```

4. **Configure environment variables**
```bash
vercel env add VITE_GOOGLE_AI_API_KEY
# Enter your Google AI API key when prompted
```

5. **Redeploy with environment variables**
```bash
vercel --prod
```

**Alternative: GitHub Integration**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in project settings
4. Deploy automatically on every push

### 2. Netlify 🌍

**Why Netlify?**
- Drag-and-drop deployment
- Form handling
- Split testing
- Edge functions

**Steps:**

1. **Build the project**
```bash
pnpm run build
```

2. **Method 1: Drag & Drop**
- Go to [netlify.com](https://netlify.com)
- Drag the `dist` folder to deploy

3. **Method 2: CLI Deployment**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

4. **Method 3: GitHub Integration**
- Connect your GitHub repository
- Set build command: `pnpm run build`
- Set publish directory: `dist`

5. **Configure environment variables**
- Go to Site settings > Environment variables
- Add `VITE_GOOGLE_AI_API_KEY`

### 3. AWS Amplify ☁️

**Why AWS Amplify?**
- Full-stack deployment
- Backend services
- Authentication
- Storage solutions

**Steps:**

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize project**
```bash
amplify init
```

3. **Add hosting**
```bash
amplify add hosting
# Choose "Amazon CloudFront and S3"
```

4. **Configure build settings**
Create `amplify.yml`:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

5. **Deploy**
```bash
amplify publish
```

### 4. GitHub Pages 📄

**Why GitHub Pages?**
- Free hosting
- Direct from repository
- Custom domains supported

**Steps:**

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "homepage": "https://yourusername.github.io/ayurveda-diet-management",
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
pnpm run deploy
```

4. **Configure repository settings**
- Go to repository Settings > Pages
- Select "gh-pages" branch as source

### 5. Firebase Hosting 🔥

**Why Firebase?**
- Google integration
- Real-time database
- Authentication services
- Analytics

**Steps:**

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login and initialize**
```bash
firebase login
firebase init hosting
```

3. **Configure firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. **Build and deploy**
```bash
pnpm run build
firebase deploy
```

## 🔧 Environment Variables Setup

### Required Variables
```env
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

### Platform-Specific Configuration

**Vercel:**
```bash
vercel env add VITE_GOOGLE_AI_API_KEY production
```

**Netlify:**
- Site settings > Environment variables > Add variable

**AWS Amplify:**
- App settings > Environment variables > Manage variables

**GitHub Actions:**
- Repository Settings > Secrets and variables > Actions

## 🏗️ Build Optimization

### Production Build Configuration

**Vite Configuration (vite.config.ts):**
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
          charts: ['recharts'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### Performance Optimizations
- Enable gzip compression
- Set proper cache headers
- Use CDN for static assets
- Implement service worker for caching

## 🔒 Security Configuration

### Headers Configuration

**Netlify (_headers file):**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
```

**Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📊 Monitoring & Analytics

### Performance Monitoring
- Set up Google Analytics
- Configure Lighthouse CI
- Monitor Core Web Vitals
- Set up error tracking (Sentry)

### Health Checks
```bash
# Check if deployment is successful
curl -I https://your-domain.com
```

## 🐛 Troubleshooting

### Common Deployment Issues

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist .next
pnpm install
pnpm run build
```

**Environment Variables Not Working:**
- Ensure variables start with `VITE_`
- Check variable names match exactly
- Restart build process after adding variables

**404 Errors on Refresh:**
- Configure SPA fallback to index.html
- Set up proper rewrites/redirects

**Large Bundle Size:**
- Implement code splitting
- Use dynamic imports
- Optimize images and assets

### Platform-Specific Issues

**Vercel:**
- Check function timeout limits
- Verify build output directory
- Review build logs in dashboard

**Netlify:**
- Check build settings match package.json
- Verify publish directory is correct
- Review deploy logs

**AWS Amplify:**
- Check IAM permissions
- Verify build specification
- Review CloudWatch logs

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      env:
        VITE_GOOGLE_AI_API_KEY: ${{ secrets.VITE_GOOGLE_AI_API_KEY }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📈 Post-Deployment

### Verification Checklist
- [ ] Site loads correctly
- [ ] All routes work
- [ ] Forms submit properly
- [ ] API calls succeed
- [ ] Mobile responsiveness
- [ ] Performance metrics
- [ ] SEO optimization

### Monitoring Setup
- Configure uptime monitoring
- Set up performance alerts
- Monitor error rates
- Track user analytics

---

**Need Help?** Create an issue in the GitHub repository or contact support@ayurvedadiet.com