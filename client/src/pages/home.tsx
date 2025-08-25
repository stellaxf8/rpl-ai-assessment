import { useState, useEffect } from "react";
import { Brain, Menu, BookOpen, BarChart3, Phone, Home as HomeIcon } from "lucide-react";
import logoPath from "@assets/RPL Logo_1754506008197.png";
import backgroundImage from "@assets/background-pattern.png";
import Overview from "@/components/assessment/overview";
import Questionnaire from "@/components/assessment/questionnaire";
import Results from "@/components/assessment/results";
import Contact from "@/components/contact/contact";
import { Assessment } from "@shared/schema";

type Section = 'overview' | 'assessment' | 'results' | 'contact';

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
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >
      <div 
        className="absolute inset-0 bg-white" 
        style={{ opacity: 0.75 }}
      ></div>
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200 relative z-10 animate-slide-up">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 animate-fade-in">
            <a 
              href="https://www.redpilllabs.com/" 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity animate-slide-in-left"
            >
              <img 
                src={logoPath} 
                alt="Red Pill Labs" 
                className="h-4 sm:h-8 w-auto"
              />
            </a>
            <nav className="flex items-center space-x-2 sm:space-x-4 animate-slide-in-right">
              <button 
                onClick={() => setCurrentSection('overview')}
                className="bg-[#cd0000] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-[#b30000] flex items-center justify-center hover-lift button-press min-h-[2rem] sm:min-h-0 sm:h-auto"
              >
                <HomeIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Home
              </button>
              <a 
                href="https://www.redpilllabs.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#cd0000] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-[#b30000] flex items-center justify-center hover-lift button-press min-h-[2rem] sm:min-h-0 sm:h-auto"
              >
                <Phone className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
              </a>
              
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-white rounded-lg mt-4 sm:mt-6 mb-4 sm:mb-6 shadow-lg border-2 border-[#cd0000] animate-slide-up stagger-delay-1">
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
              onRetakeAssessment={handleRetakeAssessment}
            />
          </div>
        )}
      </main>
      </div>
    </div>
  );
}
