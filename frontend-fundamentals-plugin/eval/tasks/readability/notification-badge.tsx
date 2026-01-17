// EVAL TASK: Readability - Deeply Nested Conditionals for Notification States
// Expected: Identify that deeply nested ternaries and conditions make the logic hard to follow; should extract to helper functions or early returns
// Domain: SaaS notification system

import { useMemo } from 'react';

interface Notification {
  id: string;
  type: 'message' | 'alert' | 'update' | 'mention' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
  muted: boolean;
  createdAt: Date;
}

interface NotificationBadgeProps {
  notifications: Notification[];
  userSettings: {
    doNotDisturb: boolean;
    mutedTypes: string[];
    showOnlyHighPriority: boolean;
  };
  isOnline: boolean;
}

function NotificationBadge({ notifications, userSettings, isOnline }: NotificationBadgeProps) {
  const badgeContent = useMemo(() => {
    const activeNotifications = notifications.filter(n =>
      !n.read &&
      !n.muted &&
      !userSettings.mutedTypes.includes(n.type) &&
      (userSettings.showOnlyHighPriority ? n.priority === 'high' || n.priority === 'critical' : true)
    );

    const count = activeNotifications.length;
    const hasCritical = activeNotifications.some(n => n.priority === 'critical');
    const hasHigh = activeNotifications.some(n => n.priority === 'high');
    const hasRecentMention = activeNotifications.some(n =>
      n.type === 'mention' &&
      Date.now() - n.createdAt.getTime() < 300000
    );

    // This is where it gets messy...
    return {
      count,
      hasCritical,
      hasHigh,
      hasRecentMention,
    };
  }, [notifications, userSettings]);

  const { count, hasCritical, hasHigh, hasRecentMention } = badgeContent;

  return (
    <div className="notification-wrapper">
      <button className="notification-bell">
        <BellIcon />
        {!userSettings.doNotDisturb ? (
          count > 0 ? (
            <span
              className={`badge ${
                hasCritical
                  ? 'critical'
                  : hasHigh
                    ? 'high'
                    : hasRecentMention
                      ? 'mention'
                      : 'default'
              }`}
              style={{
                animation: hasCritical
                  ? 'pulse-critical 0.5s infinite'
                  : hasHigh
                    ? 'pulse-high 1s infinite'
                    : hasRecentMention
                      ? 'bounce 0.3s ease-out'
                      : 'none',
                backgroundColor: hasCritical
                  ? '#dc2626'
                  : hasHigh
                    ? '#ea580c'
                    : hasRecentMention
                      ? '#2563eb'
                      : '#6b7280',
              }}
            >
              {count > 99
                ? '99+'
                : count > 9
                  ? hasCritical
                    ? '!'
                    : count
                  : count}
            </span>
          ) : isOnline ? null : (
            <span className="offline-indicator" />
          )
        ) : (
          <span className="dnd-indicator">
            {hasCritical ? (
              <span className="critical-override">!</span>
            ) : null}
          </span>
        )}
      </button>

      <span className="sr-only">
        {userSettings.doNotDisturb
          ? hasCritical
            ? `Do not disturb active, but ${count} critical notification${count !== 1 ? 's' : ''} require attention`
            : 'Do not disturb active'
          : count > 0
            ? `${count} unread notification${count !== 1 ? 's' : ''}${
                hasCritical
                  ? ', including critical alerts'
                  : hasHigh
                    ? ', including high priority'
                    : hasRecentMention
                      ? ', including recent mentions'
                      : ''
              }`
            : isOnline
              ? 'No new notifications'
              : 'Offline - notifications paused'}
      </span>
    </div>
  );
}

// Separate component with similar issues
function NotificationItem({ notification, settings }: {
  notification: Notification;
  settings: NotificationBadgeProps['userSettings'];
}) {
  const icon = notification.type === 'message'
    ? <MessageIcon />
    : notification.type === 'alert'
      ? <AlertIcon />
      : notification.type === 'mention'
        ? <MentionIcon />
        : notification.type === 'update'
          ? <UpdateIcon />
          : <SystemIcon />;

  const priorityLabel = notification.priority === 'critical'
    ? 'Critical'
    : notification.priority === 'high'
      ? 'Important'
      : notification.priority === 'medium'
        ? 'Normal'
        : 'Low priority';

  return (
    <div
      className={`notification-item ${notification.read ? 'read' : 'unread'} ${
        notification.muted || settings.mutedTypes.includes(notification.type)
          ? 'muted'
          : notification.priority === 'critical'
            ? 'critical'
            : notification.priority === 'high'
              ? 'high'
              : ''
      }`}
    >
      {icon}
      <span className="priority-badge">{priorityLabel}</span>
    </div>
  );
}

// Icon stubs
const BellIcon = () => <svg />;
const MessageIcon = () => <svg />;
const AlertIcon = () => <svg />;
const MentionIcon = () => <svg />;
const UpdateIcon = () => <svg />;
const SystemIcon = () => <svg />;

export { NotificationBadge, NotificationItem };
