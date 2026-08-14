import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Sparkles, Award, BookOpen, MessageSquare, Info } from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { AppNotification } from '../../types';

interface NotificationDropdownProps {
  onNavigate?: (route: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onNavigate }) => {
  const { notifications, markNotificationRead } = useCareer();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'assessment':
        return <Award className="w-4 h-4 text-emerald-600" />;
      case 'achievement':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'learning':
        return <BookOpen className="w-4 h-4 text-brand-600" />;
      case 'mentor':
        return <MessageSquare className="w-4 h-4 text-indigo-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);
    if (notif.link && onNavigate) {
      onNavigate(notif.link);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-brand-50 text-brand-700 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="py-8 text-center px-4">
                <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">No notifications yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Updates on verified skills, mentor notes, and roadmaps will appear here.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                    !notif.isRead ? 'bg-brand-50/30' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold leading-tight ${!notif.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1.5 block">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
