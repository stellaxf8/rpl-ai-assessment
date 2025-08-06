import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreChartProps {
  score: number;
}

// Helper function to get dynamic color based on score
const getScoreColor = (score: number) => {
  if (score >= 80) return 'hsl(134, 61%, 41%)'; // High (Green): 4.0+/5
  if (score >= 50) return 'hsl(48, 96%, 53%)'; // Medium (Yellow): 2.5-3.9/5
  return 'hsl(0, 84%, 60%)'; // Low (Red): 0.0-2.4/5
};

export default function ScoreChart({ score }: ScoreChartProps) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];

  const COLORS = [getScoreColor(score), 'hsl(20, 5.9%, 90%)'];

  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-4xl font-bold text-slate-900">{score}</span>
        <span className="text-slate-600 font-medium">out of 100</span>
      </div>
    </div>
  );
}
