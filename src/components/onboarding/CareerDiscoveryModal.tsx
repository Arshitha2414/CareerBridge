import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { CAREER_ROLES } from '../../data/careersData';

interface CareerDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCareer: (careerId: string) => void;
}

export const CareerDiscoveryModal: React.FC<CareerDiscoveryModalProps> = ({
  isOpen,
  onClose,
  onSelectCareer,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);

  const activities = [
    'Programming',
    'Working with Data',
    'Artificial Intelligence',
    'Building Websites',
    'Cybersecurity',
    'Cloud Computing',
    'Designing Interfaces',
    'Solving Business Problems',
    'Networking',
    'Research',
    'Presenting Information',
    'Helping People',
    'Working with Databases',
    'Automation',
    'Problem Solving',
  ];

  const workTypes = [
    'Building web & mobile applications',
    'Analyzing data & creating reports',
    'Designing visual interfaces & wireframes',
    'Solving complex bugs & backend architecture',
    'Working with mathematical numbers & statistics',
    'Protecting systems & auditing security',
    'Automating cloud infrastructure & CI/CD',
    'Translating business requirements into plans',
    'Researching new AI models & algorithms',
  ];

  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const toggleWorkType = (wt: string) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(wt) ? prev.filter((w) => w !== wt) : [...prev, wt]
    );
  };

  // Generate top 3 recommended careers based on selections
  const getRecommendations = () => {
    const scored = CAREER_ROLES.map((career) => {
      let score = 50; // base
      const reasons: string[] = [];

      if (career.id === 'data-analyst') {
        if (selectedActivities.includes('Working with Data')) { score += 20; reasons.push('Working with Data'); }
        if (selectedActivities.includes('Presenting Information')) { score += 15; reasons.push('Presenting Information'); }
        if (selectedActivities.includes('Working with Databases')) { score += 15; reasons.push('Databases'); }
        if (selectedWorkTypes.includes('Analyzing data & creating reports')) { score += 20; reasons.push('Creating reports'); }
      } else if (career.id === 'full-stack-developer' || career.id === 'frontend-developer') {
        if (selectedActivities.includes('Programming')) { score += 20; reasons.push('Programming'); }
        if (selectedActivities.includes('Building Websites')) { score += 20; reasons.push('Building Websites'); }
        if (selectedWorkTypes.includes('Building web & mobile applications')) { score += 20; reasons.push('Building applications'); }
      } else if (career.id === 'ai-engineer' || career.id === 'data-scientist') {
        if (selectedActivities.includes('Artificial Intelligence')) { score += 25; reasons.push('AI'); }
        if (selectedActivities.includes('Research')) { score += 15; reasons.push('Research'); }
        if (selectedWorkTypes.includes('Researching new AI models & algorithms')) { score += 20; reasons.push('AI Research'); }
      } else if (career.id === 'cybersecurity-analyst') {
        if (selectedActivities.includes('Cybersecurity')) { score += 25; reasons.push('Cybersecurity'); }
        if (selectedActivities.includes('Networking')) { score += 20; reasons.push('Networking'); }
        if (selectedWorkTypes.includes('Protecting systems & auditing security')) { score += 20; reasons.push('Security auditing'); }
      } else if (career.id === 'ui-ux-designer') {
        if (selectedActivities.includes('Designing Interfaces')) { score += 30; reasons.push('Designing Interfaces'); }
        if (selectedWorkTypes.includes('Designing visual interfaces & wireframes')) { score += 25; reasons.push('Visual wireframing'); }
      } else if (career.id === 'business-analyst' || career.id === 'product-manager') {
        if (selectedActivities.includes('Solving Business Problems')) { score += 25; reasons.push('Business problem solving'); }
        if (selectedActivities.includes('Helping People')) { score += 15; reasons.push('Stakeholder collaboration'); }
      }

      const matchPercentage = Math.min(Math.max(score, 60), 96);
      return {
        career,
        matchPercentage,
        reasonText: reasons.length > 0 ? `Matches your interest in ${reasons.slice(0, 3).join(', ')}.` : 'Matches your technical curiosity.',
      };
    });

    scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return scored.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title="Career Discovery Guide"
      subtitle="Answer 2 quick questions to find the career pathways that best match your natural strengths"
    >
      <div className="space-y-6">
        {/* Step 1: Activities */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">
                1. Which activities naturally interest you?
              </h4>
              <span className="text-xs text-slate-400">Select all that apply</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {activities.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => toggleActivity(act)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{act}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                disabled={selectedActivities.length === 0}
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Work Type */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">
                2. What type of work do you enjoy doing?
              </h4>
              <span className="text-xs text-slate-400">Select what excites you</span>
            </div>

            <div className="space-y-2">
              {workTypes.map((wt) => {
                const isSelected = selectedWorkTypes.includes(wt);
                return (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => toggleWorkType(wt)}
                    className={`w-full p-3 text-left rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{wt}</span>
                    {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <button
                type="button"
                disabled={selectedWorkTypes.length === 0}
                onClick={() => setStep(3)}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>See My Recommended Careers</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendations */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <h4 className="text-sm font-bold text-slate-900">Your Recommended Career Matches</h4>
            </div>

            <div className="space-y-3">
              {recommendations.map(({ career, matchPercentage, reasonText }) => (
                <div
                  key={career.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-brand-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm font-bold text-slate-900">{career.name}</h5>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                          {matchPercentage}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{career.shortDescription}</p>
                      <p className="text-[11px] text-brand-700 font-medium mt-2 bg-brand-50/80 p-2 rounded-lg border border-brand-100">
                        <span className="font-bold">Why this fits: </span>
                        {reasonText}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCareer(career.id);
                        onClose();
                      }}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      Choose This Career
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Change Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
