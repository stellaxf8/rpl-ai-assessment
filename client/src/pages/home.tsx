import { useState, useEffect } from "react";
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

  // Jump to top when section changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  const navigationItems = [
    { id: 'overview' as Section, label: 'Assessment' },
    { id: 'contact' as Section, label: 'Contact' },
  ];

  const handleAssessmentComplete = (assessment: Assessment) => {
    setCompletedAssessment(assessment);
    setCurrentSection('results');
    window.scrollTo(0, 0);
  };

  const handleStartAssessment = () => {
    setCurrentSection('assessment');
    window.scrollTo(0, 0);
  };

  const handleRetakeAssessment = () => {
    setCompletedAssessment(null);
    setAssessmentKey(prev => prev + 1); // Force component remount
    setCurrentSection('assessment');
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200 relative z-10 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 animate-fade-in">
            <a 
              href="https://www.redpilllabs.com/" 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity animate-slide-in-left"
            >
              <img 
                src={logoPath} 
                alt="Red Pill Labs" 
                className="h-6 sm:h-8 w-auto"
              />
            </a>
            <nav className="flex items-center space-x-2 sm:space-x-4 animate-slide-in-right">
              <a 
                href="https://www.redpilllabs.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#cd0000] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-[#b30000] flex items-center hover-lift button-press"
              >
                <Phone className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Contact Us</span>
                <span className="xs:hidden">Contact</span>
              </a>
              <a 
                href="https://www.redpilllabs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600 transition-all hover-lift hidden sm:block"
              >
                visit main site
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 bg-white rounded-lg mt-2 sm:mt-4 mb-2 sm:mb-4 shadow-lg animate-slide-up stagger-delay-1">
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
      <footer className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-2 sm:pb-4 mt-2 sm:mt-4">
        <div className="text-center bg-white rounded-lg py-2 px-4">
          <p className="text-xs text-gray-500">* Assessment results are for informational purposes only. We recommend using results alongside professional consultation.</p>
        </div>
      </footer>
    </div>
  );
}
