import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink, 
  FileCode2, 
  ShieldCheck,
  X
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'oa_completed' | 'interview_scheduled' | 'skill_verification' | 'new_ranking';
  read: boolean;
  targetTab: ActiveTab;
  candidateId?: string;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onNotificationClick,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'oa_completed':
        return <FileCode2 className="h-4 w-4 text-emerald-400" />;
      case 'interview_scheduled':
        return <Calendar className="h-4 w-4 text-indigo-400" />;
      case 'skill_verification':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'new_ranking':
      default:
        return <Sparkles className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-700 bg-slate-950 p-0 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/60">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.2 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllAsRead}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                onNotificationClick(notif);
                onClose();
              }}
              className={`p-3 rounded-xl transition cursor-pointer hover:bg-slate-900/80 flex items-start space-x-3 ${
                !notif.read ? 'bg-indigo-950/20 border-l-2 border-indigo-500' : 'opacity-80'
              }`}
            >
              <div className="rounded-xl bg-slate-900 p-2 border border-slate-800 mt-0.5 flex-shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
                <div className="text-[10px] text-indigo-400 font-medium pt-1 flex items-center space-x-1">
                  <span>View Details</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-4 py-2.5 bg-slate-950/80 text-center text-[10px] text-slate-500">
        TalentSphere Real-Time Recruiter Alerts
      </div>

    </div>
  );
};
