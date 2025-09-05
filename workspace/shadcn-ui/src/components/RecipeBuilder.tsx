import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, ChefHat, Clock, Users, Star, Trash2 } from 'lucide-react';
import { Recipe, Food, Patient } from '@/types';
import { foodDatabase, searchFoods } from '@/lib/foodDatabase';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface RecipeBuilderProps {
  patient?: Patient;
  onSave?: (recipe: Recipe) => void;
}

interface RecipeIngredient {
  foodId: string;
  quantity: number;
  unit: string;
}

export default function RecipeBuilder({ patient, onSave }: RecipeBuilderProps) {
  const { t } = useLanguage();
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    name: '',
    ingredients: [],
    instructions: [],
    cookingTips: [],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'medium',
    ayurvedicBenefits: [],
    suitableFor: [],
    season: []
  });

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [newIngredient, setNewIngredient] = useState({ foodId: '', quantity: 1, unit: 'grams' });
  const [newInstruction, setNewInstruction] = useState('');
  const [newTip, setNewTip] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableFoods, setAvailableFoods] = useState<Food[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = searchFoods(searchTerm);
      setAvailableFoods(filtered.slice(0, 10));
    } else {
      setAvailableFoods(foodDatabase.slice(0, 20));
    }
  }, [searchTerm]);

  const addIngredient = () => {
    if (!newIngredient.foodId) {
      toast.error('Please select a food item');
      return;
    }

    const exists = ingredients.find(ing => ing.foodId === newIngredient.foodId);
    if (exists) {
      toast.error('This ingredient is already added');
      return;
    }

    setIngredients(prev => [...prev, { ...newIngredient }]);
    setRecipe(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), { ...newIngredient }]
    }));
    setNewIngredient({ foodId: '', quantity: 1, unit: 'grams' });
    toast.success('Ingredient added');
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients?.filter((_, i) => i !== index) || []
    }));
  };

  const addInstruction = () => {
    if (!newInstruction.trim()) return;
    
    setRecipe(prev => ({
      ...prev,
      instructions: [...(prev.instructions || []), newInstruction.trim()]
    }));
    setNewInstruction('');
  };

  const removeInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions?.filter((_, i) => i !== index) || []
    }));
  };

  const addCookingTip = () => {
    if (!newTip.trim()) return;
    
    setRecipe(prev => ({
      ...prev,
      cookingTips: [...(prev.cookingTips || []), newTip.trim()]
    }));
    setNewTip('');
  };

  const removeCookingTip = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      cookingTips: prev.cookingTips?.filter((_, i) => i !== index) || []
    }));
  };

  const calculateNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;

    ingredients.forEach(ingredient => {
      const food = foodDatabase.find(f => f.id === ingredient.foodId);
      if (food) {
        const ratio = ingredient.quantity / food.servingSize;
        totalCalories += food.calories * ratio;
        totalProtein += food.protein * ratio;
        totalCarbs += food.carbs * ratio;
        totalFat += food.fat * ratio;
        totalFiber += food.fiber * ratio;
      }
    });

    return {
      calories: Math.round(totalCalories / (recipe.servings || 1)),
      protein: Math.round(totalProtein / (recipe.servings || 1)),
      carbs: Math.round(totalCarbs / (recipe.servings || 1)),
      fat: Math.round(totalFat / (recipe.servings || 1)),
      fiber: Math.round(totalFiber / (recipe.servings || 1))
    };
  };

  const analyzeAyurvedicProperties = () => {
    const rasaCounts = {
      sweet: 0, sour: 0, salty: 0, pungent: 0, bitter: 0, astringent: 0
    };
    
    const doshaEffects = {
      vata: { increase: 0, decrease: 0, neutral: 0 },
      pitta: { increase: 0, decrease: 0, neutral: 0 },
      kapha: { increase: 0, decrease: 0, neutral: 0 }
    };

    ingredients.forEach(ingredient => {
      const food = foodDatabase.find(f => f.id === ingredient.foodId);
      if (food) {
        // Count tastes
        food.ayurvedicProperties.rasa.forEach(rasa => {
          rasaCounts[rasa]++;
        });

        // Count dosha effects
        Object.entries(food.ayurvedicProperties.doshaEffect).forEach(([dosha, effect]) => {
          doshaEffects[dosha as keyof typeof doshaEffects][effect]++;
        });
      }
    });

    // Determine dominant effects
    const dominantRasas = Object.entries(rasaCounts)
      .filter(([_, count]) => count > 0)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 3)
      .map(([rasa, _]) => rasa);

    const suitableFor: ('vata' | 'pitta' | 'kapha')[] = [];
    Object.entries(doshaEffects).forEach(([dosha, effects]) => {
      if (effects.decrease > effects.increase) {
        suitableFor.push(dosha as 'vata' | 'pitta' | 'kapha');
      }
    });

    return {
      dominantRasas,
      suitableFor,
      benefits: [
        `Contains ${dominantRasas.length} of the 6 tastes`,
        suitableFor.length > 0 ? `Balances ${suitableFor.join(', ')} dosha` : 'Neutral dosha effect',
        'Made with fresh, natural ingredients'
      ]
    };
  };

  const saveRecipe = () => {
    if (!recipe.name?.trim()) {
      toast.error('Please enter a recipe name');
      return;
    }

    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    if (!recipe.instructions || recipe.instructions.length === 0) {
      toast.error('Please add cooking instructions');
      return;
    }

    const nutritionalInfo = calculateNutrition();
    const ayurvedicAnalysis = analyzeAyurvedicProperties();

    const completeRecipe: Recipe = {
      id: `recipe_${Date.now()}`,
      name: recipe.name,
      ingredients: ingredients,
      instructions: recipe.instructions,
      cookingTips: recipe.cookingTips || [],
      prepTime: recipe.prepTime || 15,
      cookTime: recipe.cookTime || 30,
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || 'medium',
      ayurvedicBenefits: ayurvedicAnalysis.benefits,
      suitableFor: ayurvedicAnalysis.suitableFor,
      season: recipe.season || [],
      nutritionalInfo
    };

    if (onSave) {
      onSave(completeRecipe);
    }

    toast.success('Recipe saved successfully!');
  };

  const getFoodName = (foodId: string) => {
    const food = foodDatabase.find(f => f.id === foodId);
    return food?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recipe Builder</h2>
          <p className="text-gray-600">Create custom recipes with Ayurvedic analysis</p>
        </div>
        <Button onClick={saveRecipe} className="bg-gradient-to-r from-orange-500 to-red-500">
          <ChefHat className="w-4 h-4 mr-2" />
          Save Recipe
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recipe Details */}
        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Recipe Name</Label>
              <Input
                value={recipe.name}
                onChange={(e) => setRecipe(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter recipe name..."
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Prep Time (min)
                </Label>
                <Input
                  type="number"
                  value={recipe.prepTime}
                  onChange={(e) => setRecipe(prev => ({ ...prev, prepTime: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  Cook Time (min)
                </Label>
                <Input
                  type="number"
                  value={recipe.cookTime}
                  onChange={(e) => setRecipe(prev => ({ ...prev, cookTime: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Servings
                </Label>
                <Input
                  type="number"
                  value={recipe.servings}
                  onChange={(e) => setRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div>
              <Label>Difficulty Level</Label>
              <Select
                value={recipe.difficulty}
                onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                  setRecipe(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Nutritional Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ingredients.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(calculateNutrition()).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-medium">
                        {value}{key === 'calories' ? '' : 'g'} per serving
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Ayurvedic Properties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analyzeAyurvedicProperties().dominantRasas.map(rasa => (
                      <Badge key={rasa} variant="outline" className="text-xs">
                        {t(`rasa.${rasa}`)}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    Suitable for: {analyzeAyurvedicProperties().suitableFor.map(d => t(`dosha.${d}`)).join(', ') || 'All constitutions'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                Add ingredients to see nutritional analysis
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Ingredient */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <Label>Search & Select Food</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                  value={newIngredient.foodId}
                  onValueChange={(value) => setNewIngredient(prev => ({ ...prev, foodId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select food" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFoods.map(food => (
                      <SelectItem key={food.id} value={food.id}>
                        {food.name} ({food.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: parseFloat(e.target.value) }))}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label>Unit</Label>
                <Select
                  value={newIngredient.unit}
                  onValueChange={(value) => setNewIngredient(prev => ({ ...prev, unit: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grams">grams</SelectItem>
                    <SelectItem value="cups">cups</SelectItem>
                    <SelectItem value="pieces">pieces</SelectItem>
                    <SelectItem value="tablespoons">tbsp</SelectItem>
                    <SelectItem value="teaspoons">tsp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addIngredient}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{getFoodName(ingredient.foodId)}</span>
                  <span className="text-gray-600 ml-2">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </div>
                <Button
                  onClick={() => removeIngredient(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Cooking Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Add cooking instruction..."
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              rows={2}
            />
            <Button onClick={addInstruction}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {recipe.instructions?.map((instruction, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <span className="font-medium text-sm text-gray-600">Step {index + 1}:</span>
                  <p className="mt-1">{instruction}</p>
                </div>
                <Button
                  onClick={() => removeInstruction(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cooking Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Ayurvedic Cooking Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add cooking tip..."
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
            />
            <Button onClick={addCookingTip}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {recipe.cookingTips?.map((tip, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <p className="flex-1">{tip}</p>
                <Button
                  onClick={() => removeCookingTip(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}