# 🌿 AyurVeda Diet Management System

A comprehensive, AI-powered Ayurvedic diet management platform that combines ancient wisdom with modern technology to provide personalized nutrition recommendations.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Diet Plans**: Personalized recommendations using Google AI API
- **Multilingual Support**: 11 languages including Hindi, Sanskrit, Tamil, Telugu, Bengali, Gujarati, Marathi, Kannada, Malayalam, Punjabi, and English
- **Prakriti Assessment**: Scientific 10-question assessment to determine Ayurvedic constitution
- **Food Compatibility Scoring**: AI-based scoring system for 8,000+ foods
- **Symptom & Wellness Tracker**: Daily health monitoring with visual analytics
- **Custom Recipe Builder**: Create recipes with automatic Ayurvedic analysis
- **Role-Based Access**: Separate dashboards for patients and doctors

### 🔬 Advanced Features
- **Constitution Analysis**: Vata, Pitta, Kapha determination with detailed recommendations
- **Seasonal Adjustments**: Diet modifications based on current season and location
- **Health Goal Tracking**: Monitor weight, energy, sleep, digestion, and wellness metrics
- **Interactive Charts**: Beautiful data visualization with trend analysis
- **PDF Export**: Generate reports for diet plans, assessments, and tracking data
- **Dark/Light Theme**: User preference theme switching
- **Mobile Responsive**: Optimized for all device sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ayurveda-diet-management.git
cd ayurveda-diet-management
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

4. **Start development server**
```bash
pnpm run dev
# or
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 🌐 Live Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy the project**
```bash
vercel --prod
```

4. **Set environment variables in Vercel dashboard**
- Go to your project settings
- Add `VITE_GOOGLE_AI_API_KEY` with your Google AI API key

### Deploy to Netlify

1. **Build the project**
```bash
pnpm run build
```

2. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

3. **Deploy to Netlify**
```bash
netlify deploy --prod --dir=dist
```

4. **Set environment variables**
- Go to Site settings > Environment variables
- Add `VITE_GOOGLE_AI_API_KEY`

### Deploy to AWS Amplify

1. **Install AWS Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Initialize Amplify**
```bash
amplify init
```

3. **Add hosting**
```bash
amplify add hosting
```

4. **Deploy**
```bash
amplify publish
```

## 🔧 Configuration

### Google AI API Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your environment variables

### Build Optimization
The project includes several optimizations:
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Images and fonts are optimized
- **Caching**: Proper cache headers for static assets

## 📱 Usage

### For Patients
1. **Registration**: Complete the comprehensive 6-step registration form
2. **Prakriti Assessment**: Take the constitution assessment
3. **Daily Tracking**: Log symptoms, energy, and wellness metrics
4. **Food Compatibility**: Check compatibility scores for foods
5. **Recipe Creation**: Build custom recipes with Ayurvedic analysis
6. **Progress Monitoring**: View trends and analytics

### For Doctors
1. **Patient Management**: View and manage patient profiles
2. **Diet Plan Creation**: Generate AI-powered personalized diet plans
3. **Progress Tracking**: Monitor patient wellness trends
4. **Report Generation**: Create and export comprehensive reports

## 🎨 Customization

### Theming
The application supports both light and dark themes. Users can toggle between themes using the theme switcher in the navigation.

### Language Support
Add new languages by:
1. Extending the `translations` object in `src/contexts/LanguageContext.tsx`
2. Adding the language to the `languages` array
3. Translating food names in `src/lib/foodDatabase.ts`

### Adding New Features
The modular architecture makes it easy to add new features:
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Extend types in `src/types/index.ts`

## 🧪 Testing

### Run Tests
```bash
pnpm run test
# or
npm run test
```

### Build for Production
```bash
pnpm run build
# or
npm run build
```

### Preview Production Build
```bash
pnpm run preview
# or
npm run preview
```

## 📊 Performance

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 95+

### Bundle Size
- Initial bundle: ~150KB (gzipped)
- Total assets: ~1.2MB
- Lazy-loaded routes for optimal loading

## 🔒 Security

### Data Protection
- All patient data is handled securely
- No sensitive information is logged
- Environment variables for API keys
- Input validation and sanitization

### API Security
- Rate limiting implemented
- CORS properly configured
- Secure headers included

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables Not Working**
- Ensure variables start with `VITE_`
- Restart development server after adding variables
- Check `.env.local` file is in root directory

**Deployment Issues**
- Verify build completes successfully locally
- Check environment variables are set in deployment platform
- Ensure all dependencies are in `package.json`

### Performance Issues
- Enable gzip compression on your server
- Use a CDN for static assets
- Implement proper caching headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ancient Ayurvedic texts and practitioners
- Google AI for powering the recommendation engine
- Shadcn/ui for beautiful UI components
- React and Vite communities

## 📞 Support

For support, email support@ayurvedadiet.com or create an issue in the GitHub repository.

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Teleconsultation integration
- [ ] Community forums
- [ ] Wearable device integration
- [ ] Advanced analytics dashboard
- [ ] Meal planning automation

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Ayurvedic wisdom**