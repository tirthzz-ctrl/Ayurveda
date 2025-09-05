import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  User, 
  Heart, 
  Activity, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Plus,
  X
} from 'lucide-react';
import { Patient } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PatientRegistrationFormProps {
  onComplete: (patientData: Partial<Patient>) => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  weight: number;
  height: number;
  bloodGroup: string;
  currentProblems: string[];
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  previousSurgeries: string[];
  dietaryHabits: 'vegetarian' | 'non_vegetarian' | 'vegan' | 'jain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  sleepHours: number;
  waterIntake: number;
  smokingHabits: 'never' | 'former' | 'occasional' | 'regular';
  alcoholConsumption: 'never' | 'occasional' | 'moderate' | 'regular';
  stressLevel: 1 | 2 | 3 | 4 | 5;
  previousAyurvedicTreatment: boolean;
  ayurvedicTreatmentDetails: string;
  constitutionKnown: boolean;
  knownConstitution: string;
  bowelMovements: 'regular' | 'irregular' | 'constipated' | 'loose';
  digestiveIssues: string[];
  mealFrequency: number;
  healthGoals: string[];
  foodPreferences: string[];
  avoidFoods: string[];
}

const commonHealthProblems = [
  'Diabetes', 'Hypertension', 'Obesity', 'Digestive Issues', 'Anxiety', 'Depression',
  'Insomnia', 'Arthritis', 'Migraine', 'Asthma', 'Skin Problems', 'Fatigue',
  'Back Pain', 'Heart Disease', 'Thyroid Issues', 'PCOS', 'Menstrual Issues'
];

const commonDigestiveIssues = [
  'Acidity', 'Bloating', 'Gas', 'Constipation', 'Loose Motions', 'Nausea',
  'Loss of Appetite', 'Heartburn', 'Stomach Pain', 'Irregular Bowel Movements'
];

const healthGoals = [
  'Weight Loss', 'Weight Gain', 'Better Digestion', 'Improved Energy', 
  'Better Sleep', 'Stress Management', 'Skin Health', 'Mental Clarity',
  'Hormonal Balance', 'Immunity Boost', 'Pain Management', 'General Wellness'
];

export default function PatientRegistrationForm({ onComplete, onCancel }: PatientRegistrationFormProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 25,
    gender: 'male',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    weight: 60,
    height: 165,
    bloodGroup: '',
    currentProblems: [],
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    previousSurgeries: [],
    dietaryHabits: 'vegetarian',
    activityLevel: 'moderate',
    sleepHours: 7,
    waterIntake: 2.5,
    smokingHabits: 'never',
    alcoholConsumption: 'never',
    stressLevel: 3,
    previousAyurvedicTreatment: false,
    ayurvedicTreatmentDetails: '',
    constitutionKnown: false,
    knownConstitution: '',
    bowelMovements: 'regular',
    digestiveIssues: [],
    mealFrequency: 3,
    healthGoals: [],
    foodPreferences: [],
    avoidFoods: []
  });

  const [newItem, setNewItem] = useState('');
  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: keyof FormData, item: string) => {
    if (!item.trim()) return;
    const currentArray = formData[field] as string[];
    if (!currentArray.includes(item)) {
      updateFormData(field, [...currentArray, item]);
    }
    setNewItem('');
  };

  const removeFromArray = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    updateFormData(field, currentArray.filter(i => i !== item));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(item)) {
      removeFromArray(field, item);
    } else {
      updateFormData(field, [...currentArray, item]);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email && formData.phone && formData.age > 0);
      case 2:
        return !!(formData.weight > 0 && formData.height > 0);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const patientData: Partial<Patient> = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      activityLevel: formData.activityLevel,
      dietaryHabits: formData.dietaryHabits,
      sleepHours: formData.sleepHours,
      waterIntake: formData.waterIntake,
      bowelMovements: formData.bowelMovements,
      mealFrequency: formData.mealFrequency,
      medicalConditions: formData.currentProblems,
      allergies: formData.allergies,
      prakriti: 'vata',
      vikriti: 'balanced',
      createdAt: new Date(),
      doctorId: 'default_doctor'
    };

    onComplete(patientData);
    toast.success('Registration completed successfully!');
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Patient Registration</CardTitle>
            <CardDescription>Complete your profile to get personalized Ayurvedic recommendations</CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-gray-600 mt-2">Step {currentStep} of {totalSteps}</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Personal Information</h3>
                      <p className="text-gray-600">Let's start with your basic details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label>Age *</Label>
                        <Input
                          type="number"
                          value={formData.age}
                          onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                          min="1"
                          max="120"
                          required
                        />
                      </div>

                      <div>
                        <Label>Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value: 'male' | 'female' | 'other') => updateFormData('gender', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Activity className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Physical Information</h3>
                      <p className="text-gray-600">Your physical measurements</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Weight (kg) *</Label>
                        <Input
                          type="number"
                          value={formData.weight}
                          onChange={(e) => updateFormData('weight', parseFloat(e.target.value))}
                          min="20"
                          max="200"
                          step="0.1"
                          required
                        />
                      </div>

                      <div>
                        <Label>Height (cm) *</Label>
                        <Input
                          type="number"
                          value={formData.height}
                          onChange={(e) => updateFormData('height', parseFloat(e.target.value))}
                          min="100"
                          max="250"
                          required
                        />
                      </div>

                      <div>
                        <Label>BMI</Label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">
                            {((formData.weight / (formData.height / 100) ** 2) || 0).toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {(() => {
                              const bmi = formData.weight / (formData.height / 100) ** 2;
                              if (bmi < 18.5) return 'Underweight';
                              if (bmi < 25) return 'Normal';
                              if (bmi < 30) return 'Overweight';
                              return 'Obese';
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Health Information</h3>
                      <p className="text-gray-600">Tell us about your health concerns</p>
                    </div>

                    <div>
                      <Label>Current Health Problems</Label>
                      <p className="text-sm text-gray-600 mb-3">Select all that apply to you</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonHealthProblems.map(problem => (
                          <div key={problem} className="flex items-center space-x-2">
                            <Checkbox
                              id={problem}
                              checked={formData.currentProblems.includes(problem)}
                              onCheckedChange={() => toggleArrayItem('currentProblems', problem)}
                            />
                            <Label htmlFor={problem} className="text-sm">{problem}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Activity className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Lifestyle Information</h3>
                      <p className="text-gray-600">Your daily habits</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Dietary Habits</Label>
                        <Select value={formData.dietaryHabits} onValueChange={(value: any) => updateFormData('dietaryHabits', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="jain">Jain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Activity Level</Label>
                        <Select value={formData.activityLevel} onValueChange={(value: any) => updateFormData('activityLevel', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Light Activity</SelectItem>
                            <SelectItem value="moderate">Moderate Activity</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="very_active">Very Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Digestive Health</h3>
                      <p className="text-gray-600">Your digestive patterns</p>
                    </div>

                    <div>
                      <Label>Bowel Movement Pattern</Label>
                      <Select value={formData.bowelMovements} onValueChange={(value: any) => updateFormData('bowelMovements', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="irregular">Irregular</SelectItem>
                          <SelectItem value="constipated">Constipated</SelectItem>
                          <SelectItem value="loose">Loose/Frequent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold">Health Goals</h3>
                      <p className="text-gray-600">What would you like to achieve?</p>
                    </div>

                    <div>
                      <Label>Health Goals</Label>
                      <p className="text-sm text-gray-600 mb-3">Select your objectives</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {healthGoals.map(goal => (
                          <div key={goal} className="flex items-center space-x-2">
                            <Checkbox
                              id={goal}
                              checked={formData.healthGoals.includes(goal)}
                              onCheckedChange={() => toggleArrayItem('healthGoals', goal)}
                            />
                            <Label htmlFor={goal} className="text-sm">{goal}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  Complete Registration
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}