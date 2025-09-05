import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  Activity, 
  Brain, 
  Utensils,
  BarChart3,
  Users,
  CheckCircle
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tip: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to AyurVeda Diet Management',
    description: 'Your personalized journey to wellness through ancient Ayurvedic wisdom combined with modern AI technology.',
    icon: <Heart className="w-8 h-8 text-red-500" />,
    features: [
      'AI-powered personalized diet plans',
      'Traditional Ayurvedic principles',
      'Multi-language support',
      'Comprehensive health tracking'
    ],
    tip: 'Start by completing your Prakriti assessment to get the most accurate recommendations.'
  },
  {
    id: 'constitution',
    title: 'Discover Your Prakriti',
    description: 'Take our comprehensive assessment to determine your unique Ayurvedic constitution (Vata, Pitta, or Kapha).',
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    features: [
      '10-question scientific assessment',
      'Physical, mental & behavioral analysis',
      'Personalized constitution report',
      'Tailored lifestyle recommendations'
    ],
    tip: 'Answer questions based on your natural tendencies, not your current state.'
  },
  {
    id: 'tracking',
    title: 'Track Your Wellness',
    description: 'Monitor your daily symptoms, energy levels, digestion, and overall health patterns.',
    icon: <Activity className="w-8 h-8 text-green-500" />,
    features: [
      'Daily symptom logging',
      'Energy & mood tracking',
      'Digestive health monitoring',
      'Visual trend analysis'
    ],
    tip: 'Consistent daily tracking helps identify patterns and optimize your diet plan.'
  },
  {
    id: 'food',
    title: 'Food Compatibility Scoring',
    description: 'Get personalized food recommendations based on your constitution, health conditions, and preferences.',
    icon: <Utensils className="w-8 h-8 text-orange-500" />,
    features: [
      'AI-powered compatibility scoring',
      '8,000+ foods in database',
      'Seasonal adjustments',
      'Allergy & condition considerations'
    ],
    tip: 'Foods scoring 70+ are highly recommended for your constitution.'
  },
  {
    id: 'recipes',
    title: 'Custom Recipe Builder',
    description: 'Create personalized recipes with automatic Ayurvedic analysis and nutritional information.',
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    features: [
      'Ingredient-based recipe creation',
      'Automatic nutritional calculation',
      'Ayurvedic property analysis',
      'Constitution suitability scoring'
    ],
    tip: 'Include foods from multiple taste categories for balanced nutrition.'
  },
  {
    id: 'community',
    title: 'Join the Community',
    description: 'Connect with other users, share experiences, and learn from Ayurvedic practitioners.',
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    features: [
      'Patient support forums',
      'Success story sharing',
      'Expert Q&A sessions',
      'Recipe sharing platform'
    ],
    tip: 'Sharing your journey helps others and keeps you motivated.'
  }
];

interface OnboardingTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingTutorial({ onComplete, onSkip }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl">
          <CardHeader className="relative">
            <Button
              onClick={onSkip}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              {currentStepData.icon}
              <div>
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {currentStepData.description}
                </CardDescription>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="outline">
                Step {currentStep + 1} of {onboardingSteps.length}
              </Badge>
              <div className="flex gap-1">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-blue-500' : 
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {currentStepData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-medium text-blue-800">Pro Tip:</h5>
                      <p className="text-blue-700 text-sm">{currentStepData.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button onClick={onSkip} variant="ghost">
                  Skip Tutorial
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}