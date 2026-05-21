export function calculateOverallScore(scores: Record<string, number>): number {
  const values = Object.values(scores);
  const average = values.reduce((sum, score) => sum + score, 0) / values.length;
  return Math.round(average * 20);
}

export function calculateDimensionScores(responses: Record<string, number>): Record<string, number> {
  const scores: Record<string, number> = {};

  const dimensionMappings = [
    { name: 'technologyInfrastructure', patterns: ['tech-', 'technologyInfrastructure'] },
    { name: 'dataQuality', patterns: ['data-', 'dataQuality'] },
    { name: 'teamLiteracy', patterns: ['team-', 'teamLiteracy'] },
    { name: 'systemIntegration', patterns: ['system-', 'integration-', 'systemIntegration'] },
    { name: 'budget', patterns: ['budget-', 'resource-', 'budget', 'budgetResources'] },
    { name: 'dataSecurity', patterns: ['security-', 'privacy-', 'dataSecurity', 'security', 'securityPrivacy'] }
  ];

  dimensionMappings.forEach((dimensionMapping) => {
    let totalScore = 0;
    let questionCount = 0;

    Object.keys(responses).forEach(questionId => {
      const matchesPattern = dimensionMapping.patterns.some(pattern =>
        questionId.toLowerCase().includes(pattern.toLowerCase()) ||
        questionId.startsWith(pattern)
      );
      if (matchesPattern) {
        totalScore += responses[questionId];
        questionCount++;
      }
    });

    if (questionCount > 0) {
      scores[dimensionMapping.name] = totalScore / questionCount;
    }
  });

  if (Object.keys(scores).length === 0) {
    const allResponses = Object.values(responses);
    const averageScore = allResponses.length > 0
      ? allResponses.reduce((sum, score) => sum + score, 0) / allResponses.length
      : 3;
    scores.technologyInfrastructure = averageScore;
    scores.dataQuality = averageScore;
    scores.teamLiteracy = averageScore;
    scores.systemIntegration = averageScore;
    scores.budget = averageScore;
    scores.dataSecurity = averageScore;
  }

  return scores;
}
