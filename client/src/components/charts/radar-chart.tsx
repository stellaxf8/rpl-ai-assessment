import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { DimensionScores } from '@shared/schema';

interface RadarChartProps {
  scores: DimensionScores;
}

export default function RadarChart({ scores }: RadarChartProps) {
  const data = [
    { dimension: 'Technology', score: scores.technologyInfrastructure },
    { dimension: 'Data Quality', score: scores.dataQuality },
    { dimension: 'Team Literacy', score: scores.teamLiteracy },
    { dimension: 'Integration', score: scores.systemIntegration },
    { dimension: 'Budget', score: scores.budget },
    { dimension: 'Security', score: scores.security },
  ];

  return (
    <div className="h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 5]} 
            tick={false}
          />
          <Radar
            name="Your Scores"
            dataKey="score"
            stroke="hsl(207, 90%, 54%)"
            fill="hsl(207, 90%, 54%)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}