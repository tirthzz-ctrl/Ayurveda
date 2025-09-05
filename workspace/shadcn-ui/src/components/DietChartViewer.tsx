import { useState } from 'react';
import { motion } from 'framer-motion';
import { DietChart } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Clock, Utensils, Heart, Leaf, Info } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DietChartViewerProps {
  dietChart: DietChart;
  onEdit?: () => void;
}

export default function DietChartViewer({ dietChart, onEdit }: DietChartViewerProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('diet-chart-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${dietChart.title.replace(/\s+/g, '_')}.pdf`);
      toast.success('Diet chart downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download diet chart');
    } finally {
      setIsDownloading(false);
    }
  };

  const mealTimes = {
    breakfast: '7:00 AM - 8:00 AM',
    midMorning: '10:00 AM - 11:00 AM',
    lunch: '12:30 PM - 1:30 PM',
    evening: '4:00 PM - 5:00 PM',
    dinner: '7:00 PM - 8:00 PM'
  };

  const mealIcons = {
    breakfast: '🌅',
    midMorning: '☕',
    lunch: '🍽️',
    evening: '🫖',
    dinner: '🌙'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{dietChart.title}</h2>
          <p className="text-gray-600 mt-1">{dietChart.description}</p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button onClick={onEdit} variant="outline">
              Edit Plan
            </Button>
          )}
          <Button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Diet Chart Content */}
      <div id="diet-chart-content" className="bg-white p-6 rounded-lg">
        {/* Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Nutritional Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{dietChart.totalNutrition.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dietChart.totalNutrition.protein}g</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dietChart.totalNutrition.carbs}g</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{dietChart.totalNutrition.fat}g</div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{dietChart.totalNutrition.fiber}g</div>
                <div className="text-sm text-gray-600">Fiber</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meal Plans */}
        <div className="space-y-4">
          {Object.entries(dietChart.meals).map(([mealType, meal], index) => (
            <motion.div
              key={mealType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mealIcons[mealType as keyof typeof mealIcons]}</span>
                      <span className="capitalize">{mealType.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {mealTimes[mealType as keyof typeof mealTimes]}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Foods */}
                    {meal.foods.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          Recommended Foods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {meal.foods.map((food) => (
                            <div key={food.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">{food.name}</span>
                                <div className="text-xs text-gray-500">
                                  {food.servingSize}{food.unit} • {food.calories} cal
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {food.ayurvedicProperties.rasa.map((rasa) => (
                                  <Badge key={rasa} variant="secondary" className="text-xs">
                                    {rasa}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    {meal.instructions && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-green-600 mt-0.5" />
                          <p className="text-sm text-green-800">{meal.instructions}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Ayurvedic Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Ayurvedic Guidelines
            </CardTitle>
            <CardDescription>
              Follow these principles for optimal health and digestion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dietChart.ayurvedicGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-2 p-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{guideline}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Restrictions */}
        {dietChart.restrictions.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-red-600">Important Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dietChart.restrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-red-700">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    {restriction}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
          <p>Generated on {new Date(dietChart.createdAt).toLocaleDateString()}</p>
          <p className="mt-1">Duration: {dietChart.duration} days • Follow under medical supervision</p>
        </div>
      </div>
    </div>
  );
}