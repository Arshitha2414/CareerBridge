import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { VERIFIED_LEARNING_RESOURCES } from '../../data/learningResourcesData';
import { Badge } from '../common/Badge';
import {
  GraduationCap,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  Video,
  Code,
  FileText
} from 'lucide-react';

interface LearningCenterProps {
  onSelectSkill: (skillId: string) => void;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({ onSelectSkill }) => {
  const { user } = useAuth();
  const { skillGaps } = useCareer();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCost, setSelectedCost] = useState<'All' | 'Free' | 'Paid'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredResources = VERIFIED_LEARNING_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.skillId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCost = selectedCost === 'All' || res.cost === selectedCost;
    const matchesType = selectedType === 'All' || res.type === selectedType;
    return matchesSearch && matchesCost && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4 text-rose-500" />;
      case 'Interactive':
        return <Code className="w-4 h-4 text-emerald-500" />;
      case 'Reading':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Learning Center & Resource Library</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated authentic learning resources directly linked to Microsoft, Kaggle, SQLBolt, Cisco, and freeCodeCamp.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, skills or platforms..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-400 mr-1">Cost:</span>
              {['All', 'Free', 'Paid'].map((cost) => (
                <button
                  key={cost}
                  type="button"
                  onClick={() => setSelectedCost(cost as any)}
                  className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                    selectedCost === cost ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cost}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
              <span className="font-bold text-slate-400 mr-1">Format:</span>
              {['All', 'Interactive', 'Video', 'Reading', 'Course'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-colors ${
                    selectedType === t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Verified Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card hover:border-brand-300 hover:shadow-card-hover p-5 flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    {getTypeIcon(res.type)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {res.provider}
                  </span>
                </div>
                <Badge label={res.cost} variant={res.cost === 'Free' ? 'have' : 'Default'} size="sm" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{res.title}</h3>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Skill: <strong className="text-slate-800 uppercase">{res.skillId}</strong></span>
                <span>•</span>
                <span>~{res.estimatedHours}h</span>
                <span>•</span>
                <span className="text-amber-600 font-bold">{res.rating}★</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelectSkill(res.skillId)}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                View Skill Guidance
              </button>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Launch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
