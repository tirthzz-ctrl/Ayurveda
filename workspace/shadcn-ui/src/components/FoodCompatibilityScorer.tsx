import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Food, Patient, FoodCompatibility } from '@/types';
import { foodDatabase } from '@/lib/foodDatabase';
import { useLanguage } from '@/contexts/LanguageContext';

interface FoodCompatibilityScorerProps {
  patient: Patient;
}

export default function FoodCompatibilityScorer({ patient }: FoodCompatibilityScorerProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [compatibilityScores, setCompatibilityScores] = useState<FoodCompatibility[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

  useEffect(() => {
    // Calculate compatibility scores for all foods
    const scores = foodDatabase.map(food => calculateCompatibilityScore(food, patient));
    setCompatibilityScores(scores);
    
    // Filter foods based on search term
    const filtered = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [patient, searchTerm]);

  const calculateCompatibilityScore = (food: Food, patient: Patient): FoodCompatibility => {
    let score = 50; // Base score
    const reasons: string[] = [];
    const recommendations: string[] = [];

    // Dosha compatibility based on prakriti
    const doshaEffect = food.ayurvedicProperties.doshaEffect;
    
    switch (patient.prakriti) {
      case 'vata':
        if (doshaEffect.vata === 'decrease') {
          score += 20;
          reasons.push('Balances Vata dosha');
        } else if (doshaEffect.vata === 'increase') {
          score -= 15;
          reasons.push('May increase Vata');
          recommendations.push('Consume in moderation with warming spices');
        }
        break;
      case 'pitta':
        if (doshaEffect.pitta === 'decrease') {
          score += 20;
          reasons.push('Balances Pitta dosha');
        } else if (doshaEffect.pitta === 'increase') {
          score -= 15;
          reasons.push('May increase Pitta');
          recommendations.push('Consume in smaller quantities, avoid during hot weather');
        }
        break;
      case 'kapha':
        if (doshaEffect.kapha === 'decrease') {
          score += 20;
          reasons.push('Balances Kapha dosha');
        } else if (doshaEffect.kapha === 'increase') {
          score -= 15;
          reasons.push('May increase Kapha');
          recommendations.push('Use warming spices and consume in smaller portions');
        }
        break;
    }

    // Current imbalance (vikriti) considerations
    if (patient.vikriti !== 'balanced') {
      const vikritiEffect = doshaEffect[patient.vikriti];
      if (vikritiEffect === 'decrease') {
        score += 15;
        reasons.push(`Helps balance current ${patient.vikriti} imbalance`);
      } else if (vikritiEffect === 'increase') {
        score -= 20;
        reasons.push(`May worsen current ${patient.vikriti} imbalance`);
        recommendations.push('Avoid or consume very sparingly');
      }
    }

    // Digestibility considerations
    if (patient.bowelMovements === 'constipated' && food.ayurvedicProperties.digestibility === 'difficult') {
      score -= 10;
      reasons.push('May be hard to digest with current digestive state');
    } else if (patient.bowelMovements === 'loose' && food.ayurvedicProperties.digestibility === 'easy') {
      score += 10;
      reasons.push('Easy to digest, suitable for current digestive state');
    }

    // Activity level considerations
    if (patient.activityLevel === 'sedentary' && food.calories > 300) {
      score -= 5;
      reasons.push('High calorie content may not suit sedentary lifestyle');
    } else if (patient.activityLevel === 'very_active' && food.calories < 100) {
      score -= 5;
      reasons.push('May need higher calorie foods for active lifestyle');
    }

    // Dietary habits compatibility
    if (patient.dietaryHabits === 'vegetarian' && food.category === 'Non-Vegetarian') {
      score = 0;
      reasons.push('Not suitable for vegetarian diet');
    }

    // Allergy considerations
    if (patient.allergies.some(allergy => 
      food.name.toLowerCase().includes(allergy.toLowerCase()) ||
      food.category.toLowerCase().includes(allergy.toLowerCase())
    )) {
      score = 0;
      reasons.push('Contains known allergen');
    }

    // Medical conditions considerations
    if (patient.medicalConditions.includes('Diabetes Type 2') && food.carbs > 30) {
      score -= 10;
      reasons.push('High carbohydrate content - monitor blood sugar');
      recommendations.push('Consume in small portions and monitor glucose levels');
    }

    if (patient.medicalConditions.includes('Hypertension') && food.name.toLowerCase().includes('salt')) {
      score -= 15;
      reasons.push('High sodium may affect blood pressure');
      recommendations.push('Use minimal quantities or avoid');
    }

    // Seasonal considerations
    const currentSeason = patient.season || 'summer';
    if (food.ayurvedicProperties.season?.includes(currentSeason)) {
      score += 10;
      reasons.push(`Suitable for ${currentSeason} season`);
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    return {
      foodId: food.id,
      patientId: patient.id,
      score: Math.round(score),
      reasons,
      recommendations
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    if (score >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-4 h-4" />;
    if (score >= 40) return <Minus className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const sortedFoods = filteredFoods
    .map(food => ({
      food,
      compatibility: compatibilityScores.find(c => c.foodId === food.id)
    }))
    .sort((a, b) => (b.compatibility?.score || 0) - (a.compatibility?.score || 0));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Food Compatibility Scorer</h2>
          <p className="text-gray-600">Discover foods that match your Ayurvedic constitution</p>
        </div>
        <div className="text-sm text-gray-500">
          Based on {t(`dosha.${patient.prakriti}`)} constitution
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Constitution Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Your Constitution Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Primary Constitution</div>
              <Badge variant="secondary" className="text-lg capitalize">
                {t(`dosha.${patient.prakriti}`)}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Current Balance</div>
              <Badge 
                variant={patient.vikriti === 'balanced' ? 'default' : 'destructive'}
                className="text-lg capitalize"
              >
                {t(`dosha.${patient.vikriti}`)}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Dietary Preference</div>
              <Badge variant="outline" className="text-lg capitalize">
                {patient.dietaryHabits.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedFoods.slice(0, 12).map(({ food, compatibility }) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{food.name}</CardTitle>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(compatibility?.score || 0)}`}>
                    {getScoreIcon(compatibility?.score || 0)}
                    {compatibility?.score || 0}%
                  </div>
                </div>
                <CardDescription>{food.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Nutritional Info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: {food.calories}</div>
                  <div>Protein: {food.protein}g</div>
                </div>

                {/* Ayurvedic Properties */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {food.ayurvedicProperties.rasa.map(rasa => (
                      <Badge key={rasa} variant="outline" className="text-xs">
                        {t(`rasa.${rasa}`)}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t(`virya.${food.ayurvedicProperties.virya}`)} • {t(`digestibility.${food.ayurvedicProperties.digestibility}`)}
                  </div>
                </div>

                {/* Compatibility Score */}
                <div className="space-y-2">
                  <Progress value={compatibility?.score || 0} className="h-2" />
                  
                  {compatibility?.reasons && compatibility.reasons.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-700">Why this score:</div>
                      {compatibility.reasons.slice(0, 2).map((reason, index) => (
                        <div key={index} className="text-xs text-gray-600">• {reason}</div>
                      ))}
                    </div>
                  )}

                  {compatibility?.recommendations && compatibility.recommendations.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-orange-700">Recommendations:</div>
                      {compatibility.recommendations.slice(0, 1).map((rec, index) => (
                        <div key={index} className="text-xs text-orange-600">• {rec}</div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {sortedFoods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No foods found matching your search criteria.
        </div>
      )}
    </div>
  );
}