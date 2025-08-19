import { useState } from "react";
import { Brain, Menu, BookOpen, BarChart3, Phone } from "lucide-react";
import logoPath from "@assets/RPL Logo_1754506008197.png";
import backgroundImage from "@assets/BG 1_1755624813166.png";
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
  const [assessmentKey, setAssessmentKey] = useState(0);

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
    setAssessmentKey(prev => prev + 1); // Force component remount
    setCurrentSection('assessment');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200 relative z-10 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 animate-fade-in">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-all hover-scale animate-slide-in-left"
              onClick={() => setCurrentSection('overview')}
            >
              <img 
                src={logoPath} 
                alt="Red Pill Labs" 
                className="h-8 w-auto hover-lift"
              />
            </div>
            <nav className="flex items-center space-x-4 animate-slide-in-right">
              <a 
                href="https://www.redpilllabs.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-all flex items-center hover-lift button-press"
              >
                <Phone className="mr-1 h-4 w-4" />
                Contact Us
              </a>
              <a 
                href="https://www.redpilllabs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600 transition-all hover-lift"
              >
                visit main site
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white/70 backdrop-blur-sm rounded-lg mt-4 mb-4 shadow-lg animate-slide-up stagger-delay-1">
        {currentSection === 'overview' && (
          <Overview onStartAssessment={handleStartAssessment} />
        )}
        
        {currentSection === 'contact' && (
          <Contact />
        )}
        
        {currentSection === 'assessment' && (
          <Questionnaire 
            key={assessmentKey}
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentSection('overview')}
          />
        )}
        
        {currentSection === 'results' && completedAssessment && (
          <div key="results-section">
            <Results 
              assessment={completedAssessment}
              onGenerateReport={() => setCurrentSection('report')}
              onRetakeAssessment={handleRetakeAssessment}
            />
          </div>
        )}
        
        {currentSection === 'report' && completedAssessment && (
          <div key="report-section">
            <Report 
              assessment={completedAssessment} 
              onBack={() => setCurrentSection('results')}
            />
          </div>
        )}
      </main>
      {/* Footnote Disclaimer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 mt-4">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg py-2 px-4">
          <p className="text-xs text-gray-500">* Assessment results are for informational purposes only. We recommend using results alongside professional consultation.</p>
        </div>
      </footer>
    </div>
  );
}
