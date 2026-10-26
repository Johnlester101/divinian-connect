/**
 * Notifications.tsx
 * ============================================================================
 * DIVINIAN CONNECT — NOTIFICATIONS
 * ============================================================================
 *
 * Shows notifications for replies, comments, supports, status changes, and
 * announcements. Users can mark them as read.
 * ============================================================================
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, Clock } from 'lucide-react';

const TYPE_ICONS: Record<string, any> = {
  comment: MessageSquareIcon,
  reply: MessageSquareIcon,
  support: ThumbsUpIcon,
  status: ShieldAlertIcon,
  announcement: BellIcon,
};

function MessageSquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10V4m6 12v-6m0 0l-3-3-3 3m0 0v6m0 0H3m12 0h-3m-3 0v-3m0 0a2 2 0 114 0" />
    </svg>
  );
}
function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

export function Notifications() {
  const { user } = useAuth();
  const {
    notifications,
    markNotificationRead,
    unreadCount,
    getNotificationsForUser,
  } = useData();

  const [list, setList] = useState(notifications);

  useEffect(() => {
    setList(getNotificationsForUser(user!.id));
  }, [notifications, user!.id, getNotificationsForUser]);

  const unread = unreadCount(user!.id);

  return (
    <div className="container-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">
            Stay updated on replies, comments, and concern status changes.
          </p>
        </div>
        {unread > 0 && (
          <Badge variant="navy">{unread} unread</Badge>
        )}
      </div>

      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications yet.</p>
          </div>
        ) : (
          list.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onRead={() => markNotificationRead(n.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: any;
  onRead: () => void;
}) {
  const Icon = TYPE_ICONS[notification.type] || BellIcon;
  return (
    <div
      onClick={onRead}
      className="cursor-pointer"
    >
      <Card
        className={`p-4 rounded-xl border border-gray-200 transition-colors hover:bg-gray-50 ${
          !notification.read ? 'bg-navy-50 border-navy-100' : ''
        }`}
      >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          notification.read ? 'bg-gray-100 text-gray-500' : 'bg-navy-100 text-navy-600'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-900 leading-relaxed">
            {notification.message}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{new Date(notification.createdAt).toLocaleString()}</span>
            {!notification.read && (
              <Badge variant="default" className="text-[10px] ml-auto">
                New
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}
