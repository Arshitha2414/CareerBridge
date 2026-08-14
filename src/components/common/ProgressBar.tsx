import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'brand' | 'emerald' | 'amber' | 'rose' | 'auto';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'auto',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const getVariantColor = (): string => {
    if (variant === 'auto') {
      if (percentage >= 75) return 'bg-emerald-500';
      if (percentage >= 45) return 'bg-brand-500';
      if (percentage >= 20) return 'bg-amber-500';
      return 'bg-rose-500';
    }

    switch (variant) {
      case 'emerald':
        return 'bg-emerald-500';
      case 'amber':
        return 'bg-amber-500';
      case 'rose':
        return 'bg-rose-500';
      case 'brand':
      default:
        return 'bg-brand-500';
    }
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5 text-slate-600">
          <span>Progress</span>
          <span className="font-mono text-slate-900">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses}`}>
        <div
          className={`${heightClasses} rounded-full transition-all duration-500 ease-out ${getVariantColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
