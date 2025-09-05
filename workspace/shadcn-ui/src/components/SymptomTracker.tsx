import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SymptomEntry } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, AlertCircle, Plus, X, Activity, Heart, Brain, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SymptomTrackerProps {
  patientId: string;
}

export default function SymptomTracker({ patientId }: SymptomTrackerProps) {
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<SymptomEntry>>({
    patientId,
    date: new Date(),
    symptoms: [],
    energy: 3,
    digestion: 3,
    sleep: 3,
    mood: 3,
    bowelMovement: 'normal',
    appetite: 3,
    waterIntake: 2.5,
    exerciseMinutes: 30,
    stressLevel: 3,
    notes: ''
  });
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: 3 as 1 | 2 | 3 | 4 | 5, notes: '' });
  const [showAddSymptom, setShowAddSymptom] = useState(false);

  const commonSymptoms = [
    'Headache', 'Fatigue', 'Bloating', 'Acidity', 'Joint Pain', 'Anxiety', 
    'Insomnia', 'Constipation', 'Skin Issues', 'Mood Swings', 'Brain Fog', 'Nausea'
  ];

  useEffect(() => {
    // Load existing symptoms - in real app, this would be from API
    const mockSymptoms: SymptomEntry[] = [
      {
        id: '1',
        patientId,
        date: new Date(Date.now() - 86400000), // Yesterday
        symptoms: [{ name: 'Headache', severity: 3 }, { name: 'Fatigue', severity: 2 }],
        energy: 3,
        digestion: 4,
        sleep: 3,
        mood: 3,
        bowelMovement: 'normal',
        appetite: 4,
        waterIntake: 2.8,
        exerciseMinutes: 45,
        stressLevel: 2
      },
      {
        id: '2',
        patientId,
        date: new Date(Date.now() - 172800000), // 2 days ago
        symptoms: [{ name: 'Bloating', severity: 4 }],
        energy: 2,
        digestion: 2,
        sleep: 4,
        mood: 3,
        bowelMovement: 'constipated',
        appetite: 2,
        waterIntake: 2.2,
        exerciseMinutes: 20,
        stressLevel: 4
      }
    ];
    setSymptoms(mockSymptoms);
  }, [patientId]);

  const addSymptom = () => {
    if (!newSymptom.name.trim()) return;
    
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: [...(prev.symptoms || []), { ...newSymptom }]
    }));
    setNewSymptom({ name: '', severity: 3, notes: '' });
    setShowAddSymptom(false);
  };

  const removeSymptom = (index: number) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms?.filter((_, i) => i !== index) || []
    }));
  };

  const saveEntry = () => {
    const entry: SymptomEntry = {
      id: Date.now().toString(),
      patientId,
      date: new Date(),
      symptoms: currentEntry.symptoms || [],
      energy: currentEntry.energy || 3,
      digestion: currentEntry.digestion || 3,
      sleep: currentEntry.sleep || 3,
      mood: currentEntry.mood || 3,
      bowelMovement: currentEntry.bowelMovement || 'normal',
      appetite: currentEntry.appetite || 3,
      waterIntake: currentEntry.waterIntake || 2.5,
      exerciseMinutes: currentEntry.exerciseMinutes || 30,
      stressLevel: currentEntry.stressLevel || 3,
      notes: currentEntry.notes
    };

    setSymptoms(prev => [entry, ...prev]);
    setCurrentEntry({
      patientId,
      date: new Date(),
      symptoms: [],
      energy: 3,
      digestion: 3,
      sleep: 3,
      mood: 3,
      bowelMovement: 'normal',
      appetite: 3,
      waterIntake: 2.5,
      exerciseMinutes: 30,
      stressLevel: 3,
      notes: ''
    });
    toast.success('Symptom entry saved successfully!');
  };

  const getChartData = () => {
    return symptoms.slice(0, 7).reverse().map(entry => ({
      date: entry.date.toLocaleDateString(),
      energy: entry.energy,
      digestion: entry.digestion,
      sleep: entry.sleep,
      mood: entry.mood,
      stress: 6 - entry.stressLevel // Invert stress for better visualization
    }));
  };

  const getRadarData = () => {
    if (symptoms.length === 0) return [];
    
    const latest = symptoms[0];
    return [
      { subject: 'Energy', A: latest.energy, fullMark: 5 },
      { subject: 'Digestion', A: latest.digestion, fullMark: 5 },
      { subject: 'Sleep', A: latest.sleep, fullMark: 5 },
      { subject: 'Mood', A: latest.mood, fullMark: 5 },
      { subject: 'Appetite', A: latest.appetite, fullMark: 5 },
      { subject: 'Calm', A: 6 - latest.stressLevel, fullMark: 5 }
    ];
  };

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      case 5: return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Symptom & Wellness Tracker</h2>
          <p className="text-gray-600">Monitor your daily health patterns and symptoms</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Today's Entry
            </CardTitle>
            <CardDescription>Record your current symptoms and wellness metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wellness Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Energy Level: {currentEntry.energy}/5
                </Label>
                <Slider
                  value={[currentEntry.energy || 3]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, energy: value[0] as 1 | 2 | 3 | 4 | 5 }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Digestion: {currentEntry.digestion}/5
                </Label>
                <Slider
                  value={[currentEntry.digestion || 3]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, digestion: value[0] as 1 | 2 | 3 | 4 | 5 }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Sleep Quality: {currentEntry.sleep}/5
                </Label>
                <Slider
                  value={[currentEntry.sleep || 3]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, sleep: value[0] as 1 | 2 | 3 | 4 | 5 }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  Mood: {currentEntry.mood}/5
                </Label>
                <Slider
                  value={[currentEntry.mood || 3]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, mood: value[0] as 1 | 2 | 3 | 4 | 5 }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bowel Movement</Label>
                <Select
                  value={currentEntry.bowelMovement}
                  onValueChange={(value: 'normal' | 'constipated' | 'loose' | 'irregular') => 
                    setCurrentEntry(prev => ({ ...prev, bowelMovement: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="constipated">Constipated</SelectItem>
                    <SelectItem value="loose">Loose</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Water Intake (L)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={currentEntry.waterIntake}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, waterIntake: parseFloat(e.target.value) }))}
                />
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Current Symptoms</Label>
                <Button
                  onClick={() => setShowAddSymptom(true)}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Symptom
                </Button>
              </div>

              {showAddSymptom && (
                <div className="p-3 border rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Symptom</Label>
                      <Select
                        value={newSymptom.name}
                        onValueChange={(value) => setNewSymptom(prev => ({ ...prev, name: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select symptom" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonSymptoms.map(symptom => (
                            <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                          ))}
                          <SelectItem value="custom">Custom...</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Severity: {newSymptom.severity}/5</Label>
                      <Slider
                        value={[newSymptom.severity]}
                        onValueChange={(value) => setNewSymptom(prev => ({ ...prev, severity: value[0] as 1 | 2 | 3 | 4 | 5 }))}
                        max={5}
                        min={1}
                        step={1}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addSymptom} size="sm">Add</Button>
                    <Button onClick={() => setShowAddSymptom(false)} size="sm" variant="outline">Cancel</Button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {currentEntry.symptoms?.map((symptom, index) => (
                  <Badge
                    key={index}
                    className={`${getSeverityColor(symptom.severity)} cursor-pointer`}
                    onClick={() => removeSymptom(index)}
                  >
                    {symptom.name} ({symptom.severity}/5) <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                value={currentEntry.notes}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional observations or notes..."
                rows={3}
              />
            </div>

            <Button onClick={saveEntry} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
              Save Today's Entry
            </Button>
          </CardContent>
        </Card>

        {/* Current Wellness Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Current Wellness Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} />
                  <Radar
                    name="Current"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            7-Day Wellness Trends
          </CardTitle>
          <CardDescription>Track your wellness metrics over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="energy" stroke="#f59e0b" name="Energy" />
                <Line type="monotone" dataKey="digestion" stroke="#3b82f6" name="Digestion" />
                <Line type="monotone" dataKey="sleep" stroke="#ef4444" name="Sleep" />
                <Line type="monotone" dataKey="mood" stroke="#8b5cf6" name="Mood" />
                <Line type="monotone" dataKey="stress" stroke="#10b981" name="Calm" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {symptoms.slice(0, 5).map((entry) => (
              <div key={entry.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{entry.date.toLocaleDateString()}</span>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>Energy: {entry.energy}/5</span>
                    <span>Digestion: {entry.digestion}/5</span>
                    <span>Sleep: {entry.sleep}/5</span>
                  </div>
                </div>
                {entry.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.symptoms.map((symptom, index) => (
                      <Badge key={index} className={getSeverityColor(symptom.severity)}>
                        {symptom.name} ({symptom.severity}/5)
                      </Badge>
                    ))}
                  </div>
                )}
                {entry.notes && (
                  <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}