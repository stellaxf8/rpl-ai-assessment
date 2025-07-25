import { useState } from "react";
import { Brain, Menu, BookOpen } from "lucide-react";
import { Link } from "wouter";
import Overview from "@/components/assessment/overview";
import Questionnaire from "@/components/assessment/questionnaire";
import Results from "@/components/assessment/results";
import Report from "@/components/assessment/report";
import { Assessment } from "@shared/schema";

type Section = 'overview' | 'assessment' | 'results' | 'report';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('overview');
  const [completedAssessment, setCompletedAssessment] = useState<Assessment | null>(null);

  const navigationItems = [
    { id: 'overview' as Section, label: 'Overview' },
    { id: 'assessment' as Section, label: 'Assessment' },
    { id: 'results' as Section, label: 'Results' },
    { id: 'report' as Section, label: 'Report' },
  ];

  const handleAssessmentComplete = (assessment: Assessment) => {
    setCompletedAssessment(assessment);
    setCurrentSection('results');
  };

  const handleStartAssessment = () => {
    setCurrentSection('assessment');
  };

  const handleRetakeAssessment = () => {
    setCompletedAssessment(null);
    setCurrentSection('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentSection('overview')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white text-sm" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">AI Readiness Assessment</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/knowledge-center">
                <button className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Knowledge Center
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentSection === 'overview' && (
          <Overview onStartAssessment={handleStartAssessment} />
        )}
        
        {currentSection === 'assessment' && (
          <Questionnaire 
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentSection('overview')}
          />
        )}
        
        {currentSection === 'results' && completedAssessment && (
          <Results 
            assessment={completedAssessment}
            onGenerateReport={() => setCurrentSection('report')}
            onRetakeAssessment={handleRetakeAssessment}
          />
        )}
        
        {currentSection === 'report' && completedAssessment && (
          <Report assessment={completedAssessment} />
        )}
      </main>
    </div>
  );
}
