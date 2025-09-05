import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Heart, Brain, Activity, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface AssessmentQuestion {
  id: string;
  category: 'physical' | 'mental' | 'behavioral';
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    score: number;
  }[];
}

interface PrakritiResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: 'vata' | 'pitta' | 'kapha' | 'vata_pitta' | 'pitta_kapha' | 'vata_kapha' | 'tridosha';
  description: string;
  recommendations: string[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: '1',
    category: 'physical',
    question: 'What is your natural body build?',
    options: [
      { text: 'Thin, light frame, prominent joints', dosha: 'vata', score: 3 },
      { text: 'Medium build, well-proportioned, muscular', dosha: 'pitta', score: 3 },
      { text: 'Large frame, heavy build, broad shoulders', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '2',
    category: 'physical',
    question: 'How is your skin texture?',
    options: [
      { text: 'Dry, rough, thin, cool to touch', dosha: 'vata', score: 2 },
      { text: 'Warm, oily, soft, with freckles/moles', dosha: 'pitta', score: 2 },
      { text: 'Thick, moist, cool, smooth', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '3',
    category: 'physical',
    question: 'What is your hair like?',
    options: [
      { text: 'Dry, brittle, thin, coarse', dosha: 'vata', score: 2 },
      { text: 'Fine, soft, oily, early graying/balding', dosha: 'pitta', score: 2 },
      { text: 'Thick, lustrous, wavy, oily', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '4',
    category: 'physical',
    question: 'How is your appetite?',
    options: [
      { text: 'Variable, sometimes forget to eat', dosha: 'vata', score: 2 },
      { text: 'Strong, regular, get irritable when hungry', dosha: 'pitta', score: 2 },
      { text: 'Steady, can skip meals easily', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '5',
    category: 'physical',
    question: 'How is your digestion?',
    options: [
      { text: 'Irregular, gas, bloating, constipation', dosha: 'vata', score: 3 },
      { text: 'Strong, quick, heartburn, loose stools', dosha: 'pitta', score: 3 },
      { text: 'Slow, heavy feeling, mucus formation', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '6',
    category: 'mental',
    question: 'How is your mental activity?',
    options: [
      { text: 'Quick, restless, many ideas', dosha: 'vata', score: 3 },
      { text: 'Sharp, focused, goal-oriented', dosha: 'pitta', score: 3 },
      { text: 'Calm, steady, methodical', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '7',
    category: 'mental',
    question: 'How do you handle stress?',
    options: [
      { text: 'Become anxious, worried, overwhelmed', dosha: 'vata', score: 2 },
      { text: 'Become irritable, angry, critical', dosha: 'pitta', score: 2 },
      { text: 'Remain calm, withdraw, become stubborn', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '8',
    category: 'behavioral',
    question: 'What is your sleep pattern?',
    options: [
      { text: 'Light sleeper, difficulty falling asleep', dosha: 'vata', score: 2 },
      { text: 'Moderate sleep, wake up refreshed', dosha: 'pitta', score: 2 },
      { text: 'Deep sleeper, difficulty waking up', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '9',
    category: 'behavioral',
    question: 'How do you prefer to exercise?',
    options: [
      { text: 'Light, gentle, yoga, walking', dosha: 'vata', score: 2 },
      { text: 'Moderate to intense, competitive sports', dosha: 'pitta', score: 2 },
      { text: 'Slow, steady, swimming, weight training', dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: '10',
    category: 'behavioral',
    question: 'What is your speaking style?',
    options: [
      { text: 'Fast, talkative, enthusiastic', dosha: 'vata', score: 2 },
      { text: 'Clear, precise, articulate', dosha: 'pitta', score: 2 },
      { text: 'Slow, melodious, thoughtful', dosha: 'kapha', score: 2 }
    ]
  }
];

interface PrakritiAssessmentProps {
  onComplete: (result: PrakritiResult) => void;
}

export default function PrakritiAssessment({ onComplete }: PrakritiAssessmentProps) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    assessmentQuestions.forEach((question, index) => {
      const answerIndex = answers[question.id];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        const score = selectedOption.score;
        
        switch (selectedOption.dosha) {
          case 'vata':
            vataScore += score;
            break;
          case 'pitta':
            pittaScore += score;
            break;
          case 'kapha':
            kaphaScore += score;
            break;
        }
      }
    });

    const total = vataScore + pittaScore + kaphaScore;
    const vataPercentage = (vataScore / total) * 100;
    const pittaPercentage = (pittaScore / total) * 100;
    const kaphaPercentage = (kaphaScore / total) * 100;

    let dominant: PrakritiResult['dominant'];
    let description: string;
    let recommendations: string[];

    // Determine dominant dosha(s)
    const scores = [
      { dosha: 'vata', score: vataPercentage },
      { dosha: 'pitta', score: pittaPercentage },
      { dosha: 'kapha', score: kaphaPercentage }
    ].sort((a, b) => b.score - a.score);

    if (scores[0].score > 50) {
      dominant = scores[0].dosha as 'vata' | 'pitta' | 'kapha';
    } else if (scores[0].score - scores[1].score < 15) {
      if (scores[0].dosha === 'vata' && scores[1].dosha === 'pitta') {
        dominant = 'vata_pitta';
      } else if (scores[0].dosha === 'pitta' && scores[1].dosha === 'kapha') {
        dominant = 'pitta_kapha';
      } else if (scores[0].dosha === 'vata' && scores[1].dosha === 'kapha') {
        dominant = 'vata_kapha';
      } else {
        dominant = 'tridosha';
      }
    } else {
      dominant = scores[0].dosha as 'vata' | 'pitta' | 'kapha';
    }

    // Set description and recommendations based on dominant constitution
    switch (dominant) {
      case 'vata':
        description = 'You have a Vata-dominant constitution. Vata governs movement, circulation, and the nervous system.';
        recommendations = [
          'Eat warm, cooked, nourishing foods',
          'Maintain regular routines and meal times',
          'Practice calming activities like yoga and meditation',
          'Get adequate rest and avoid overstimulation',
          'Use warming spices like ginger, cinnamon, and cardamom'
        ];
        break;
      case 'pitta':
        description = 'You have a Pitta-dominant constitution. Pitta governs digestion, metabolism, and transformation.';
        recommendations = [
          'Eat cooling, sweet, and bitter foods',
          'Avoid excessive heat and spicy foods',
          'Practice moderation in all activities',
          'Stay cool and avoid direct sunlight during peak hours',
          'Use cooling spices like coriander, fennel, and mint'
        ];
        break;
      case 'kapha':
        description = 'You have a Kapha-dominant constitution. Kapha governs structure, immunity, and lubrication.';
        recommendations = [
          'Eat light, warm, and spicy foods',
          'Engage in regular vigorous exercise',
          'Avoid heavy, oily, and cold foods',
          'Maintain an active lifestyle',
          'Use warming spices like black pepper, turmeric, and ginger'
        ];
        break;
      default:
        description = 'You have a balanced or dual constitution, which requires a more individualized approach.';
        recommendations = [
          'Follow seasonal eating patterns',
          'Listen to your body and adjust diet accordingly',
          'Maintain balance in all aspects of life',
          'Consult with an Ayurvedic practitioner for personalized guidance'
        ];
    }

    const result: PrakritiResult = {
      vata: Math.round(vataPercentage),
      pitta: Math.round(pittaPercentage),
      kapha: Math.round(kaphaPercentage),
      dominant,
      description,
      recommendations
    };

    setIsComplete(true);
    onComplete(result);
    toast.success('Prakriti assessment completed!');
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];
  const hasAnswered = answers[question.id] !== undefined;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-800">Assessment Complete!</h3>
        <p className="text-gray-600">Your Prakriti has been determined and saved to your profile.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Prakriti Assessment</h2>
          <p className="text-gray-600">Discover your natural Ayurvedic constitution</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Question {currentQuestion + 1} of {assessmentQuestions.length}</div>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {question.category === 'physical' && <Activity className="w-5 h-5 text-blue-600" />}
            {question.category === 'mental' && <Brain className="w-5 h-5 text-purple-600" />}
            {question.category === 'behavioral' && <Heart className="w-5 h-5 text-green-600" />}
            <Badge variant="outline" className="capitalize">
              {question.category}
            </Badge>
          </div>
          <CardTitle className="text-lg">{question.question}</CardTitle>
          <CardDescription>
            Choose the option that best describes you naturally (not your current state)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
          >
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
                <Badge variant="outline" className={`text-xs ${
                  option.dosha === 'vata' ? 'border-blue-200 text-blue-700' :
                  option.dosha === 'pitta' ? 'border-red-200 text-red-700' :
                  'border-green-200 text-green-700'
                }`}>
                  {t(`dosha.${option.dosha}`)}
                </Badge>
              </motion.div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button
              onClick={prevQuestion}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={!hasAnswered}
              className="bg-gradient-to-r from-green-500 to-emerald-600"
            >
              {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}