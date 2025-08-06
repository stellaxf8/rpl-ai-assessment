import { useState } from "react";
import { Brain, Menu, BookOpen, BarChart3, Phone } from "lucide-react";
import logoPath from "@assets/RPL Logo_1754506008197.png";
import Overview from "@/components/assessment/overview";
import Questionnaire from "@/components/assessment/questionnaire";
import Results from "@/components/assessment/results";
import Report from "@/components/assessment/report";

import Contact from "@/components/contact/contact";

import { Assessment } from "@shared/schema";

type Section = 'overview' | 'assessment' | 'results' | 'report' | 'contact';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('overview');
  const [completedAssessment, setCompletedAssessment] = useState<Assessment | null>(null);

  const navigationItems = [
    { id: 'overview' as Section, label: 'Assessment' },
    { id: 'contact' as Section, label: 'Contact' },
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
      <header className="bg-white shadow-lg border-b border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentSection('overview')}
              >
                <img 
                  src={logoPath} 
                  alt="Red Pill Labs" 
                  className="h-8 w-auto"
                />
              </div>
              <a 
                href="https://www.redpilllabs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                visit main site
              </a>
            </div>
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    currentSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.id === 'overview' && <BookOpen className="mr-2 h-4 w-4" />}
                  {item.id === 'contact' && <Phone className="mr-2 h-4 w-4" />}
                  {item.label}
                </button>
              ))}

            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#ffffff]">
        {currentSection === 'overview' && (
          <Overview onStartAssessment={handleStartAssessment} />
        )}
        
        {currentSection === 'contact' && (
          <Contact />
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
