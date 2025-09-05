import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Wand2, Target } from 'lucide-react';
import { Patient, DietChart, AIPromptData } from '@/types';
import { aiDietService } from '@/lib/aiService';
import { toast } from 'sonner';

interface DietChartGeneratorProps {
  patient: Patient;
  onGenerated: (dietChart: DietChart) => void;
}

export default function DietChartGenerator({ patient, onGenerated }: DietChartGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState(7);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [customPreference, setCustomPreference] = useState('');
  const [customRestriction, setCustomRestriction] = useState('');
  const [customGoal, setCustomGoal] = useState('');

  const commonPreferences = [
    'Spicy food', 'Sweet dishes', 'Light meals', 'Traditional recipes',
    'Quick preparation', 'Seasonal fruits', 'Herbal teas', 'Warm foods'
  ];

  const commonRestrictions = [
    'No dairy', 'No gluten', 'No nuts', 'No seafood',
    'Low sodium', 'No sugar', 'No processed foods', 'No nightshades'
  ];

  const commonGoals = [
    'Weight loss', 'Weight gain', 'Better digestion', 'Increased energy',
    'Better sleep', 'Stress reduction', 'Immunity boost', 'Detoxification'
  ];

  const addCustomItem = (item: string, list: string[], setList: (items: string[]) => void, setInput: (value: string) => void) => {
    if (item.trim() && !list.includes(item.trim())) {
      setList([...list, item.trim()]);
      setInput('');
    }
  };

  const removeItem = (item: string, list: string[], setList: (items: string[]) => void) => {
    setList(list.filter(i => i !== item));
  };

  const toggleItem = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      removeItem(item, list, setList);
    } else {
      setList([...list, item]);
    }
  };

  const generateDietChart = async () => {
    setIsGenerating(true);
    try {
      const promptData: AIPromptData = {
        patient,
        preferences,
        restrictions,
        goals,
        duration
      };

      const dietChart = await aiDietService.generateDietChart(promptData);
      onGenerated(dietChart);
      toast.success('AI diet chart generated successfully!');
    } catch (error) {
      console.error('Error generating diet chart:', error);
      toast.error('Failed to generate diet chart. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-purple-200 to-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            AI Diet Chart Generator
          </CardTitle>
          <CardDescription>
            Let our AI create a personalized Ayurvedic diet plan based on your constitution and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Plan Duration (days)</Label>
            <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="21">21 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <Label>Food Preferences</Label>
            <div className="flex flex-wrap gap-2">
              {commonPreferences.map((pref) => (
                <Badge
                  key={pref}
                  variant={preferences.includes(pref) ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleItem(pref, preferences, setPreferences)}
                >
                  {pref}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom preference..."
                value={customPreference}
                onChange={(e) => setCustomPreference(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCustomItem(customPreference, preferences, setPreferences, setCustomPreference);
                  }
                }}
              />
              <Button
                onClick={() => addCustomItem(customPreference, preferences, setPreferences, setCustomPreference)}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {preferences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.map((pref) => (
                  <Badge key={pref} variant="secondary" className="cursor-pointer" onClick={() => removeItem(pref, preferences, setPreferences)}>
                    {pref} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Restrictions */}
          <div className="space-y-3">
            <Label>Dietary Restrictions</Label>
            <div className="flex flex-wrap gap-2">
              {commonRestrictions.map((restriction) => (
                <Badge
                  key={restriction}
                  variant={restrictions.includes(restriction) ? "destructive" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleItem(restriction, restrictions, setRestrictions)}
                >
                  {restriction}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom restriction..."
                value={customRestriction}
                onChange={(e) => setCustomRestriction(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCustomItem(customRestriction, restrictions, setRestrictions, setCustomRestriction);
                  }
                }}
              />
              <Button
                onClick={() => addCustomItem(customRestriction, restrictions, setRestrictions, setCustomRestriction)}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {restrictions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {restrictions.map((restriction) => (
                  <Badge key={restriction} variant="destructive" className="cursor-pointer opacity-80" onClick={() => removeItem(restriction, restrictions, setRestrictions)}>
                    {restriction} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Goals */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Health Goals
            </Label>
            <div className="flex flex-wrap gap-2">
              {commonGoals.map((goal) => (
                <Badge
                  key={goal}
                  variant={goals.includes(goal) ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  onClick={() => toggleItem(goal, goals, setGoals)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom goal..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCustomItem(customGoal, goals, setGoals, setCustomGoal);
                  }
                }}
              />
              <Button
                onClick={() => addCustomItem(customGoal, goals, setGoals, setCustomGoal)}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {goals.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <Badge key={goal} className="cursor-pointer bg-green-100 text-green-800" onClick={() => removeItem(goal, goals, setGoals)}>
                    {goal} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={generateDietChart}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Personalized Diet Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Diet Chart
                </>
              )}
            </Button>
          </motion.div>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <div className="text-sm text-gray-600">
                Our AI is analyzing your constitution and preferences...
              </div>
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}