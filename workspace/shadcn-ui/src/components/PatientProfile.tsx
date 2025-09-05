import { useState } from 'react';
import { motion } from 'framer-motion';
import { Patient } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Heart, Activity, Droplets, Moon, AlertCircle, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface PatientProfileProps {
  patient: Patient;
  onUpdate?: (patient: Patient) => void;
  isEditable?: boolean;
}

export default function PatientProfile({ patient, onUpdate, isEditable = false }: PatientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedPatient);
      toast.success('Profile updated successfully!');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const currentPatient = isEditing ? editedPatient : patient;
  const bmi = parseFloat(calculateBMI(currentPatient.weight, currentPatient.height));
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentPatient.name}</h2>
            <p className="text-gray-600">{currentPatient.email}</p>
          </div>
        </div>
        {isEditable && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Age</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.age}
                    onChange={(e) => setEditedPatient({...editedPatient, age: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="text-lg font-semibold">{currentPatient.age} years</div>
                )}
              </div>
              <div>
                <Label>Gender</Label>
                {isEditing ? (
                  <Select
                    value={editedPatient.gender}
                    onValueChange={(value: 'male' | 'female' | 'other') => setEditedPatient({...editedPatient, gender: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-lg font-semibold capitalize">{currentPatient.gender}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Weight</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.weight}
                    onChange={(e) => setEditedPatient({...editedPatient, weight: parseFloat(e.target.value)})}
                  />
                ) : (
                  <div className="text-lg font-semibold">{currentPatient.weight} kg</div>
                )}
              </div>
              <div>
                <Label>Height</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.height}
                    onChange={(e) => setEditedPatient({...editedPatient, height: parseFloat(e.target.value)})}
                  />
                ) : (
                  <div className="text-lg font-semibold">{currentPatient.height} cm</div>
                )}
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">BMI</span>
                <div className="text-right">
                  <div className="text-lg font-bold">{bmi}</div>
                  <div className={`text-sm ${bmiInfo.color}`}>{bmiInfo.category}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ayurvedic Constitution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Ayurvedic Constitution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Prakriti (Natural Constitution)</Label>
              {isEditing ? (
                <Select
                  value={editedPatient.prakriti}
                  onValueChange={(value: 'vata' | 'pitta' | 'kapha' | 'vata_pitta' | 'pitta_kapha' | 'vata_kapha' | 'tridosha') => setEditedPatient({...editedPatient, prakriti: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vata">Vata</SelectItem>
                    <SelectItem value="pitta">Pitta</SelectItem>
                    <SelectItem value="kapha">Kapha</SelectItem>
                    <SelectItem value="vata_pitta">Vata-Pitta</SelectItem>
                    <SelectItem value="pitta_kapha">Pitta-Kapha</SelectItem>
                    <SelectItem value="vata_kapha">Vata-Kapha</SelectItem>
                    <SelectItem value="tridosha">Tridosha</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="text-sm capitalize">
                  {currentPatient.prakriti.replace('_', '-')}
                </Badge>
              )}
            </div>

            <div>
              <Label>Vikriti (Current Imbalance)</Label>
              {isEditing ? (
                <Select
                  value={editedPatient.vikriti}
                  onValueChange={(value: 'vata' | 'pitta' | 'kapha' | 'balanced') => setEditedPatient({...editedPatient, vikriti: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vata">Vata Imbalance</SelectItem>
                    <SelectItem value="pitta">Pitta Imbalance</SelectItem>
                    <SelectItem value="kapha">Kapha Imbalance</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge 
                  variant={currentPatient.vikriti === 'balanced' ? 'default' : 'destructive'} 
                  className="text-sm capitalize"
                >
                  {currentPatient.vikriti === 'balanced' ? 'Balanced' : `${currentPatient.vikriti} Imbalance`}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Lifestyle & Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Activity Level</Label>
              {isEditing ? (
                <Select
                  value={editedPatient.activityLevel}
                  onValueChange={(value: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active') => setEditedPatient({...editedPatient, activityLevel: value})}
                >
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
              ) : (
                <div className="text-lg font-semibold capitalize">{currentPatient.activityLevel.replace('_', ' ')}</div>
              )}
            </div>

            <div>
              <Label>Dietary Habits</Label>
              {isEditing ? (
                <Select
                  value={editedPatient.dietaryHabits}
                  onValueChange={(value: 'vegetarian' | 'non_vegetarian' | 'vegan' | 'jain') => setEditedPatient({...editedPatient, dietaryHabits: value})}
                >
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
              ) : (
                <Badge variant="outline" className="text-sm capitalize">
                  {currentPatient.dietaryHabits.replace('_', '-')}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meal Frequency</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.mealFrequency}
                    onChange={(e) => setEditedPatient({...editedPatient, mealFrequency: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="text-lg font-semibold">{currentPatient.mealFrequency} meals/day</div>
                )}
              </div>
              <div>
                <Label>Sleep Hours</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.sleepHours}
                    onChange={(e) => setEditedPatient({...editedPatient, sleepHours: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="text-lg font-semibold">{currentPatient.sleepHours} hours</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Water Intake</Label>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.1"
                  value={editedPatient.waterIntake}
                  onChange={(e) => setEditedPatient({...editedPatient, waterIntake: parseFloat(e.target.value)})}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-lg font-semibold">{currentPatient.waterIntake}L per day</span>
                </div>
              )}
            </div>

            <div>
              <Label>Bowel Movements</Label>
              {isEditing ? (
                <Select
                  value={editedPatient.bowelMovements}
                  onValueChange={(value: 'regular' | 'irregular' | 'constipated' | 'loose') => setEditedPatient({...editedPatient, bowelMovements: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                    <SelectItem value="constipated">Constipated</SelectItem>
                    <SelectItem value="loose">Loose</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge 
                  variant={currentPatient.bowelMovements === 'regular' ? 'default' : 'secondary'}
                  className="text-sm capitalize"
                >
                  {currentPatient.bowelMovements}
                </Badge>
              )}
            </div>

            <div>
              <Label>Medical Conditions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentPatient.medicalConditions.length > 0 ? (
                  currentPatient.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {condition}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None reported</span>
                )}
              </div>
            </div>

            <div>
              <Label>Allergies</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentPatient.allergies.length > 0 ? (
                  currentPatient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-red-200 text-red-700">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None reported</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}