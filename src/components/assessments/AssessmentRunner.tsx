import React, { useState, useEffect } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { ASSESSMENTS_QUESTION_BANK } from '../../data/assessmentsData';
import { AssessmentQuestion, SkillLevel } from '../../types';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentRunnerProps {
  skillId: string;
  onFinish: () => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({ skillId, onFinish }) => {
  const { user } = useAuth();
  const { submitAssessment } = useCareer();

  const questions: AssessmentQuestion[] = ASSESSMENTS_QUESTION_BANK[skillId] || ASSESSMENTS_QUESTION_BANK['sql'];
  const skillName = skillId.toUpperCase();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultAttempt, setResultAttempt] = useState<{
    score: number;
    passedLevel: SkillLevel | 'Needs More Practice';
    correctCount: number;
    totalCount: number;
    strongAreas: string[];
    weakAreas: string[];
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    const strongMap: Record<string, number> = {};
    const weakMap: Record<string, number> = {};

    questions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      if (ans === q.correctOptionIndex) {
        correct++;
        strongMap[q.topicTag] = (strongMap[q.topicTag] || 0) + 1;
      } else {
        weakMap[q.topicTag] = (weakMap[q.topicTag] || 0) + 1;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    let passedLevel: SkillLevel | 'Needs More Practice' = 'Needs More Practice';
    if (score >= 85) passedLevel = 'Advanced';
    else if (score >= 70) passedLevel = 'Intermediate';
    else if (score >= 50) passedLevel = 'Beginner';

    const strongAreas = Object.keys(strongMap);
    const weakAreas = Object.keys(weakMap);

    const attempt = {
      score,
      passedLevel,
      correctCount: correct,
      totalCount: questions.length,
      strongAreas,
      weakAreas,
    };

    setResultAttempt(attempt);
    setIsSubmitted(true);

    // Persist and trigger dynamic recalculation
    submitAssessment({
      userId: user?.id || 'usr-temp',
      skillId,
      skillName,
      score,
      totalQuestions: questions.length,
      correctCount: correct,
      passedLevel,
      strongAreas,
      weakAreas,
    });

    if (score >= 70) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in py-4">
      {/* ========================================================================= */}
      {/* ASSESSMENT RESULTS VIEW (Requirement #38) */}
      {/* ========================================================================= */}
      {isSubmitted && resultAttempt ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-8 animate-slide-up">
          <div className="text-center space-y-3 border-b border-slate-100 pb-6">
            <div className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
              resultAttempt.score >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Assessment Results: {skillName}
            </h2>

            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-extrabold font-mono text-slate-900">
                {resultAttempt.score}%
              </span>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                resultAttempt.score >= 70
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {resultAttempt.passedLevel} Proficiency
              </span>
            </div>

            <p className="text-xs text-slate-500">
              You answered <strong className="text-slate-800">{resultAttempt.correctCount}</strong> out of{' '}
              <strong className="text-slate-800">{resultAttempt.totalCount}</strong> questions correctly.
            </p>

            {resultAttempt.score >= 70 ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl inline-flex items-center gap-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Badge Issued! Your Career Readiness has been dynamically updated.</span>
              </div>
            ) : (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl inline-flex items-center gap-2 text-xs font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Score below 70% threshold for Verified badge. Review weak areas below and retake!</span>
              </div>
            )}
          </div>

          {/* Breakdown of Strong & Weak Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-2">
              <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strong Areas</span>
              </span>
              {resultAttempt.strongAreas.length === 0 ? (
                <p className="text-slate-400">None identified</p>
              ) : (
                <ul className="space-y-1">
                  {resultAttempt.strongAreas.map((area) => (
                    <li key={area} className="text-slate-700 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100 space-y-2">
              <span className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Needs Improvement</span>
              </span>
              {resultAttempt.weakAreas.length === 0 ? (
                <p className="text-emerald-700 font-semibold">Flawless performance across all topics!</p>
              ) : (
                <ul className="space-y-1">
                  {resultAttempt.weakAreas.map((area) => (
                    <li key={area} className="text-slate-700 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Detailed Question Review Accordion */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Question-by-Question Review</h4>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctOptionIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-slate-50 border-slate-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        Q{idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-0.5 pl-2 border-l-2 border-slate-300">
                      <p>
                        Your Answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                          {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                        </strong>
                      </p>
                      {!isCorrect && (
                        <p>
                          Correct Answer: <strong className="text-emerald-700">{q.options[q.correctOptionIndex]}</strong>
                        </p>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                      <strong>Explanation: </strong>{q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setTimeLeft(15 * 60);
                setCurrentIndex(0);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            <button
              type="button"
              onClick={onFinish}
              className="w-full sm:w-auto px-7 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Back to Dashboard & Recalculate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* ACTIVE QUIZ QUESTION RUNNER */
        /* ========================================================================= */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Top Bar: Progress & Time Left */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 block">
                Standardized Skill Assessment
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">{skillName}</h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl font-bold text-slate-700">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <span className="font-bold text-slate-400">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-300'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Text & Code Snippet */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-brand-50 text-brand-700 rounded uppercase">
                {currentQ.topicTag}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold ring-1 ring-brand-600 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              Previous Question
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Submit & View Verified Results</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
