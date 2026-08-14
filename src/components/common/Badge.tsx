import React from 'react';
import { PriorityLevel, SkillLevel, SkillVerificationStatus, GapCategory } from '../../types';

type BadgeVariant =
  | PriorityLevel
  | SkillLevel
  | SkillVerificationStatus
  | GapCategory
  | 'Completed'
  | 'Learning'
  | 'Not Started'
  | 'Locked'
  | 'Demo'
  | 'Default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'Default',
  size = 'md',
  className = '',
  icon,
}) => {
  const getColors = (): string => {
    switch (variant) {
      // Priority
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      // Gap categories
      case 'missing':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'improve':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'have':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';

      // Verification
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
      case 'Project-Demonstrated':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Self-Reported':
        return 'bg-slate-100 text-slate-600 border-slate-200';

      // Levels
      case 'Beginner':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Intermediate':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';

      // Progress States
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Learning':
        return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'Not Started':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Locked':
        return 'bg-slate-100 text-slate-400 border-slate-200';

      case 'Demo':
        return 'bg-amber-500 text-white font-bold tracking-wider uppercase border-amber-600 shadow-sm';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${getColors()} ${sizeClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
