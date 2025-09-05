import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'sa' | 'ta' | 'te' | 'bn' | 'gu' | 'mr' | 'kn' | 'ml' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.symptoms': 'Symptoms',
    'nav.diet': 'Diet Plan',
    'nav.recipes': 'Recipes',
    'nav.community': 'Community',
    'nav.consultation': 'Consultation',
    'nav.logout': 'Logout',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Login
    'login.title': 'AyurVeda Diet Management',
    'login.subtitle': 'Personalized nutrition through ancient wisdom',
    'login.welcome': 'Welcome Back',
    'login.patient': 'Patient',
    'login.doctor': 'Doctor',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signin': 'Sign In',
    'login.demo': 'Use Demo Account',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.plans': 'Active Plans',
    'dashboard.stats.bmi': 'BMI Status',
    'dashboard.stats.constitution': 'Constitution',
    'dashboard.stats.downloads': 'Downloads',
    
    // Profile
    'profile.basic': 'Basic Information',
    'profile.ayurvedic': 'Ayurvedic Constitution',
    'profile.lifestyle': 'Lifestyle & Activity',
    'profile.health': 'Health Information',
    'profile.age': 'Age',
    'profile.gender': 'Gender',
    'profile.weight': 'Weight',
    'profile.height': 'Height',
    'profile.prakriti': 'Prakriti (Natural Constitution)',
    'profile.vikriti': 'Vikriti (Current Imbalance)',
    
    // Doshas
    'dosha.vata': 'Vata',
    'dosha.pitta': 'Pitta',
    'dosha.kapha': 'Kapha',
    'dosha.balanced': 'Balanced',
    
    // Symptoms
    'symptoms.tracker': 'Symptom & Wellness Tracker',
    'symptoms.daily': 'Daily Entry',
    'symptoms.energy': 'Energy Level',
    'symptoms.digestion': 'Digestion',
    'symptoms.sleep': 'Sleep Quality',
    'symptoms.mood': 'Mood',
    'symptoms.stress': 'Stress Level',
    
    // Foods
    'food.categories.grains': 'Grains',
    'food.categories.vegetables': 'Vegetables',
    'food.categories.fruits': 'Fruits',
    'food.categories.dairy': 'Dairy',
    'food.categories.spices': 'Spices',
    'food.categories.legumes': 'Legumes',
    
    // Tastes (Rasa)
    'rasa.sweet': 'Sweet',
    'rasa.sour': 'Sour',
    'rasa.salty': 'Salty',
    'rasa.pungent': 'Pungent',
    'rasa.bitter': 'Bitter',
    'rasa.astringent': 'Astringent',
    
    // Ayurvedic Properties
    'virya.hot': 'Hot',
    'virya.cold': 'Cold',
    'digestibility.easy': 'Easy to Digest',
    'digestibility.moderate': 'Moderate',
    'digestibility.difficult': 'Difficult to Digest'
  },
  
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.symptoms': 'लक्षण',
    'nav.diet': 'आहार योजना',
    'nav.recipes': 'व्यंजन',
    'nav.community': 'समुदाय',
    'nav.consultation': 'परामर्श',
    'nav.logout': 'लॉग आउट',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.search': 'खोजें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    
    // Login
    'login.title': 'आयुर्वेद आहार प्रबंधन',
    'login.subtitle': 'प्राचीन ज्ञान के माध्यम से व्यक्तिगत पोषण',
    'login.welcome': 'वापसी पर स्वागत है',
    'login.patient': 'रोगी',
    'login.doctor': 'डॉक्टर',
    'login.email': 'ईमेल',
    'login.password': 'पासवर्ड',
    'login.signin': 'साइन इन करें',
    'login.demo': 'डेमो खाता उपयोग करें',
    
    // Doshas
    'dosha.vata': 'वात',
    'dosha.pitta': 'पित्त',
    'dosha.kapha': 'कफ',
    'dosha.balanced': 'संतुलित',
    
    // Tastes (Rasa)
    'rasa.sweet': 'मधुर',
    'rasa.sour': 'अम्ल',
    'rasa.salty': 'लवण',
    'rasa.pungent': 'कटु',
    'rasa.bitter': 'तिक्त',
    'rasa.astringent': 'कषाय',
    
    // Ayurvedic Properties
    'virya.hot': 'उष्ण',
    'virya.cold': 'शीत',
    'digestibility.easy': 'सुपाच्य',
    'digestibility.moderate': 'मध्यम',
    'digestibility.difficult': 'दुष्पाच्य'
  },
  
  sa: {
    // Sanskrit translations
    'dosha.vata': 'वातः',
    'dosha.pitta': 'पित्तम्',
    'dosha.kapha': 'कफः',
    'dosha.balanced': 'समतुल्यम्',
    
    'rasa.sweet': 'मधुरः',
    'rasa.sour': 'अम्लः',
    'rasa.salty': 'लवणः',
    'rasa.pungent': 'कटुः',
    'rasa.bitter': 'तिक्तः',
    'rasa.astringent': 'कषायः',
    
    'virya.hot': 'उष्णम्',
    'virya.cold': 'शीतम्'
  },
  
  ta: {
    // Tamil translations
    'dosha.vata': 'வாதம்',
    'dosha.pitta': 'பித்தம்',
    'dosha.kapha': 'கபம்',
    'dosha.balanced': 'சமநிலை',
    
    'rasa.sweet': 'இனிப்பு',
    'rasa.sour': 'புளிப்பு',
    'rasa.salty': 'உப்பு',
    'rasa.pungent': 'காரம்',
    'rasa.bitter': 'கசப்பு',
    'rasa.astringent': 'துவர்ப்பு'
  },
  
  te: {
    // Telugu translations
    'dosha.vata': 'వాతం',
    'dosha.pitta': 'పిత్తం',
    'dosha.kapha': 'కఫం',
    'dosha.balanced': 'సమతుల్యత',
    
    'rasa.sweet': 'తీపి',
    'rasa.sour': 'పుల్లని',
    'rasa.salty': 'ఉప్పు',
    'rasa.pungent': 'కారం',
    'rasa.bitter': 'చేదు',
    'rasa.astringent': 'కషాయం'
  },
  
  bn: {
    // Bengali translations
    'dosha.vata': 'বাত',
    'dosha.pitta': 'পিত্ত',
    'dosha.kapha': 'কফ',
    'dosha.balanced': 'সুষম',
    
    'rasa.sweet': 'মিষ্টি',
    'rasa.sour': 'টক',
    'rasa.salty': 'নোনতা',
    'rasa.pungent': 'ঝাল',
    'rasa.bitter': 'তিক্ত',
    'rasa.astringent': 'কষায়'
  },
  
  gu: {
    // Gujarati translations
    'dosha.vata': 'વાત',
    'dosha.pitta': 'પિત્ત',
    'dosha.kapha': 'કફ',
    'dosha.balanced': 'સંતુલિત'
  },
  
  mr: {
    // Marathi translations
    'dosha.vata': 'वात',
    'dosha.pitta': 'पित्त',
    'dosha.kapha': 'कफ',
    'dosha.balanced': 'संतुलित'
  },
  
  kn: {
    // Kannada translations
    'dosha.vata': 'ವಾತ',
    'dosha.pitta': 'ಪಿತ್ತ',
    'dosha.kapha': 'ಕಫ',
    'dosha.balanced': 'ಸಮತೋಲನ'
  },
  
  ml: {
    // Malayalam translations
    'dosha.vata': 'വാതം',
    'dosha.pitta': 'പിത്തം',
    'dosha.kapha': 'കഫം',
    'dosha.balanced': 'സമതുലിതം'
  },
  
  pa: {
    // Punjabi translations
    'dosha.vata': 'ਵਾਤ',
    'dosha.pitta': 'ਪਿੱਤ',
    'dosha.kapha': 'ਕਫ਼',
    'dosha.balanced': 'ਸੰਤੁਲਿਤ'
  }
};

export const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'sa' as Language, name: 'Sanskrit', nativeName: 'संस्कृतम्' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
  { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa' as Language, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ayurveda_language') as Language;
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ayurveda_language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};