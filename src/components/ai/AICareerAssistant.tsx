import React, { useState, useRef, useEffect } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { Bot, Send, User, Sparkles, HelpCircle, ArrowRight, CornerDownLeft } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: { label: string; route?: string; skillId?: string }[];
}

interface AICareerAssistantProps {
  onNavigate?: (route: string) => void;
  onOpenSkillGuidance?: (skillId: string) => void;
}

export const AICareerAssistant: React.FC<AICareerAssistantProps> = ({
  onNavigate,
  onOpenSkillGuidance,
}) => {
  const { user } = useAuth();
  const { targetCareer, readiness, skillGaps, userSkills, projects, assessments } = useCareer();

  const careerName = targetCareer?.name || 'Data Analyst';
  const missingGaps = skillGaps.filter(g => g.gapCategory !== 'have');
  const topGap = missingGaps[0];

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Hello ${user?.fullName || 'there'}! I am your CareerBridge AI advisor. I have full context on your profile targeting ${careerName} (Readiness: ${readiness.overallScore}%). How can I guide your preparation today?`,
      timestamp: 'Just now',
      actions: [
        { label: 'What should I learn next?' },
        { label: 'Why is SQL important for Data Analyst?' },
        { label: 'How can I increase my readiness score?' }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (query: string): { text: string; actions?: { label: string; route?: string; skillId?: string }[] } => {
    const q = query.toLowerCase();

    if (q.includes('what should i learn next') || q.includes('learn next') || q.includes('priority')) {
      if (topGap) {
        return {
          text: `Based on your profile for ${careerName}, your highest-priority focus area is ${topGap.skillName} (${topGap.priority} Priority). You currently have ${topGap.userLevel} proficiency, whereas the career baseline requires ${topGap.requiredLevel}.\n\nI recommend following your 3-week study plan starting with core data extraction and table JOINs.`,
          actions: [{ label: `View ${topGap.skillName} Guidance`, skillId: topGap.skillId }]
        };
      }
      return {
        text: `You have completed all primary technical skill requirements for ${careerName}! Focus on building your capstone portfolio projects and taking standardized assessments.`,
        actions: [{ label: 'Explore Projects', route: '/projects' }]
      };
    }

    if (q.includes('why is sql') || q.includes('sql important') || q.includes('why sql')) {
      return {
        text: `For a Data Analyst, SQL is the foundation of day-to-day operations. Over 90% of business transaction records reside in relational databases (PostgreSQL, MySQL, Snowflake). You need SQL to retrieve raw data, join customer records with sales, calculate cohort retention, and feed clean datasets into Power BI dashboards.`,
        actions: [{ label: 'View SQL Learning Path', skillId: 'sql' }]
      };
    }

    if (q.includes('power bi or tableau') || q.includes('tableau or power bi')) {
      return {
        text: `Both are premier BI platforms, but for entry-level Data Analyst roles in the current market, Power BI has higher volume demand due to tight integration with the Microsoft ecosystem and Excel/DAX modeling. Mastering Power BI first makes picking up Tableau very straightforward later.`,
        actions: [{ label: 'View Power BI Learning Path', skillId: 'power-bi' }]
      };
    }

    if (q.includes('increase') || q.includes('readiness') || q.includes('score')) {
      return {
        text: `Your current Career Readiness is ${readiness.overallScore}%. To raise your score to 75%+:\n\n1. Take the SQL Assessment to earn a Verified badge (+8%).\n2. Submit an end-to-end portfolio project with a GitHub repository (+15%).\n3. Complete the Power BI dashboard module.\n\nEvery verified skill directly recalculates your technical score!`,
        actions: [{ label: 'Take SQL Assessment', skillId: 'sql' }, { label: 'Submit Project', route: '/projects' }]
      };
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('what project')) {
      return {
        text: `For ${careerName}, I recommend building the "Retail Sales & Churn Analytics Project". It covers SQL data extraction, cohort queries, and an interactive Power BI dashboard, allowing you to demonstrate 3 critical skills in one project artifact.`,
        actions: [{ label: 'Open Project Template', route: '/projects' }]
      };
    }

    if (q.includes('internship') || q.includes('ready for an internship') || q.includes('apply')) {
      if (readiness.overallScore >= 60) {
        return {
          text: `You have a strong baseline (${readiness.overallScore}% readiness) with solid Python and Excel fundamentals. Complete your SQL verification and you are ready to apply for Junior/Internship Data Analyst roles!`,
          actions: [{ label: 'View Matched Opportunities', route: '/job-recommendations' }]
        };
      }
      return {
        text: `You are currently at ${readiness.overallScore}% readiness. I suggest closing your critical gaps in SQL and Power BI first so you can comfortably pass technical screening tests.`,
        actions: [{ label: 'View Skill Gaps', route: '/skill-gap' }]
      };
    }

    // Default intelligent response
    return {
      text: `For your preparation as a ${careerName}: Focus on converting your ${topGap ? topGap.skillName : 'technical skills'} from self-reported into verified credentials through practical exercises and projects. Let me know if you would like specific guidance on courses, project requirements, or resume bullet points!`,
      actions: [{ label: 'View Skill Gaps', route: '/skill-gap' }]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateAIResponse(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: resp.text,
        timestamp: 'Just now',
        actions: resp.actions
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">AI Career Assistant</h1>
            <p className="text-xs text-slate-500">
              Personalized advisor with full context on your {careerName} goals and skill gaps.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 hidden sm:inline-block">
          ● Online & Context-Aware
        </span>
      </div>

      {/* Chat Conversation Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card flex flex-col h-[520px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-brand-600 text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-subtle'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Contextual Action Pills */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (act.skillId && onOpenSkillGuidance) {
                              onOpenSkillGuidance(act.skillId);
                            } else if (act.route && onNavigate) {
                              onNavigate(act.route);
                            } else {
                              handleSend(act.label);
                            }
                          }}
                          className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-brand-700 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3 text-brand-500" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <span className="animate-pulse">Analyzing your career profile...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g. What project should I build next?)"
              className="flex-1 px-4 py-3 text-xs bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-2xl shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
