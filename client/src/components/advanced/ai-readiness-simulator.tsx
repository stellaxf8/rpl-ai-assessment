import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Calculator, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import type { DimensionScores } from "@/lib/types";

interface AIReadinessSimulatorProps {
  currentScores: DimensionScores;
}

export function AIReadinessSimulator({ currentScores }: AIReadinessSimulatorProps) {
  const [simulatedScores, setSimulatedScores] = useState<DimensionScores>(currentScores);
  const [investmentLevel, setInvestmentLevel] = useState([2]); // 1-5 scale
  const [timeframe, setTimeframe] = useState([12]); // months

  const dimensions = [
    { key: 'technologyInfrastructure', label: 'Technology Infrastructure', color: '#8884d8' },
    { key: 'dataQuality', label: 'Data Quality', color: '#82ca9d' },
    { key: 'teamLiteracy', label: 'Team AI Literacy', color: '#ffc658' },
    { key: 'systemIntegration', label: 'System Integration', color: '#ff7c7c' },
    { key: 'budget', label: 'Budget Planning', color: '#8dd1e1' },
    { key: 'security', label: 'Security & Privacy', color: '#d084d0' }
  ];

  const calculatePotentialImprovement = (currentScore: number, dimension: string) => {
    const investment = investmentLevel[0];
    const time = timeframe[0];
    
    // Different dimensions respond differently to investment and time
    const dimensionFactors: Record<string, { investmentWeight: number; timeWeight: number; maxGain: number }> = {
      technologyInfrastructure: { investmentWeight: 0.7, timeWeight: 0.3, maxGain: 2.5 },
      dataQuality: { investmentWeight: 0.5, timeWeight: 0.5, maxGain: 2.0 },
      teamLiteracy: { investmentWeight: 0.3, timeWeight: 0.7, maxGain: 3.0 },
      systemIntegration: { investmentWeight: 0.6, timeWeight: 0.4, maxGain: 2.0 },
      budget: { investmentWeight: 0.8, timeWeight: 0.2, maxGain: 1.5 },
      security: { investmentWeight: 0.5, timeWeight: 0.5, maxGain: 2.5 }
    };

    const factor = dimensionFactors[dimension];
    const investmentEffect = (investment / 5) * factor.investmentWeight;
    const timeEffect = Math.min(time / 24, 1) * factor.timeWeight; // Diminishing returns after 24 months
    
    const totalImprovement = (investmentEffect + timeEffect) * factor.maxGain;
    const newScore = Math.min(5, currentScore + totalImprovement);
    
    return Math.round(newScore * 10) / 10; // Round to 1 decimal
  };

  const updateSimulation = () => {
    const newScores = { ...currentScores };
    dimensions.forEach(({ key }) => {
      newScores[key as keyof DimensionScores] = calculatePotentialImprovement(
        currentScores[key as keyof DimensionScores],
        key
      );
    });
    setSimulatedScores(newScores);
  };

  const resetSimulation = () => {
    setSimulatedScores(currentScores);
    setInvestmentLevel([2]);
    setTimeframe([12]);
  };

  const calculateOverallScore = (scores: DimensionScores) => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round((total / 6) * 20); // Convert to 100-point scale
  };

  const currentOverall = calculateOverallScore(currentScores);
  const simulatedOverall = calculateOverallScore(simulatedScores);
  const improvement = simulatedOverall - currentOverall;

  const radarData = dimensions.map(({ key, label }) => ({
    dimension: label.replace(' ', '\n'),
    current: currentScores[key as keyof DimensionScores],
    simulated: simulatedScores[key as keyof DimensionScores],
    fullMark: 5
  }));

  const barData = dimensions.map(({ key, label, color }) => ({
    dimension: label,
    current: currentScores[key as keyof DimensionScores],
    simulated: simulatedScores[key as keyof DimensionScores],
    improvement: simulatedScores[key as keyof DimensionScores] - currentScores[key as keyof DimensionScores],
    color
  }));

  const getInvestmentLabel = (level: number) => {
    const labels = ['Minimal', 'Low', 'Moderate', 'High', 'Maximum'];
    return labels[level - 1];
  };

  const getTimeframeLabel = (months: number) => {
    if (months < 6) return 'Short-term';
    if (months < 12) return 'Medium-term';
    if (months < 24) return 'Long-term';
    return 'Extended';
  };

  const getROIEstimate = () => {
    const investmentCost = investmentLevel[0] * 50000; // Base cost per level
    const potentialSavings = improvement * 25000; // Estimated savings per point improvement
    const roi = ((potentialSavings - investmentCost) / investmentCost) * 100;
    return Math.round(roi);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          AI Readiness Simulator
        </CardTitle>
        <CardDescription>
          Explore different investment scenarios and see potential improvements to your AI readiness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Investment Level</label>
            <Slider
              value={investmentLevel}
              onValueChange={(value) => {
                setInvestmentLevel(value);
                updateSimulation();
              }}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimal</span>
              <span className="font-medium">{getInvestmentLabel(investmentLevel[0])}</span>
              <span>Maximum</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Timeframe (months)</label>
            <Slider
              value={timeframe}
              onValueChange={(value) => {
                setTimeframe(value);
                updateSimulation();
              }}
              max={36}
              min={3}
              step={3}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 months</span>
              <span className="font-medium">{timeframe[0]} months ({getTimeframeLabel(timeframe[0])})</span>
              <span>36 months</span>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{currentOverall}</div>
              <div className="text-xs text-muted-foreground">Current Score</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-green-600">{simulatedOverall}</div>
              <div className="text-xs text-muted-foreground">Projected Score</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {improvement >= 0 ? '+' : ''}{improvement}
                {improvement > 0 && <TrendingUp className="h-4 w-4" />}
              </div>
              <div className="text-xs text-muted-foreground">Improvement</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className={`text-2xl font-bold ${getROIEstimate() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getROIEstimate()}%
              </div>
              <div className="text-xs text-muted-foreground">Est. ROI</div>
            </div>
          </Card>
        </div>

        {/* Visualization Tabs */}
        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="radar">Radar View</TabsTrigger>
            <TabsTrigger value="bar">Improvement Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radar" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 5]} 
                    tick={{ fontSize: 10 }}
                  />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Projected"
                    dataKey="simulated"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="dimension" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" name="Current Score" />
                  <Bar dataKey="simulated" fill="#82ca9d" name="Projected Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* Insights */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Simulation Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {improvement > 15 && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <TrendingUp className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Excellent potential for improvement! This investment could significantly boost your AI readiness.</span>
              </div>
            )}
            
            {improvement < 5 && investmentLevel[0] < 3 && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500" />
                <span>Consider increasing investment level for more meaningful improvements.</span>
              </div>
            )}
            
            {timeframe[0] < 6 && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500" />
                <span>Short timeframes may limit the potential for team literacy and cultural changes.</span>
              </div>
            )}
            
            <div className="flex items-start gap-2 text-sm text-amber-700">
              <Zap className="h-4 w-4 mt-0.5" />
              <span>
                Estimated investment: ${(investmentLevel[0] * 50000).toLocaleString()} over {timeframe[0]} months
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={updateSimulation} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Update Simulation
          </Button>
          <Button variant="outline" onClick={resetSimulation}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}