// EVAL TASK: Coupling - Excessive Props Drilling Through Component Layers
// Expected: Identify that props are drilled through 4+ layers; should use context, composition, or state management
// Domain: SaaS analytics dashboard

import { useState, useEffect } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'viewer';
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  dashboardLayout: 'grid' | 'list';
  notifications: boolean;
  language: string;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  read: boolean;
  createdAt: Date;
}

interface DashboardData {
  metrics: Metric[];
  recentActivity: Activity[];
  alerts: Alert[];
}

interface Metric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface Activity {
  id: string;
  action: string;
  userId: string;
  timestamp: Date;
}

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  acknowledged: boolean;
}

// Root component that passes EVERYTHING down
function DashboardLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'reports'>('overview');

  useEffect(() => {
    // Fetch all data
    Promise.all([fetchUser(), fetchNotifications(), fetchDashboardData()])
      .then(([userData, notifs, data]) => {
        setUser(userData);
        setNotifications(notifs);
        setDashboardData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleThemeChange = (theme: UserPreferences['theme']) => {
    if (user) {
      setUser({ ...user, preferences: { ...user.preferences, theme } });
    }
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleAlertAcknowledge = (id: string) => {
    if (dashboardData) {
      setDashboardData({
        ...dashboardData,
        alerts: dashboardData.alerts.map(a =>
          a.id === id ? { ...a, acknowledged: true } : a
        ),
      });
    }
  };

  const handlePreferenceUpdate = (key: keyof UserPreferences, value: any) => {
    if (user) {
      setUser({
        ...user,
        preferences: { ...user.preferences, [key]: value },
      });
    }
  };

  if (isLoading || !user || !dashboardData) {
    return <LoadingSpinner />;
  }

  // Props drilling begins here - passing everything to children
  return (
    <div className={`dashboard ${user.preferences.theme}`}>
      <DashboardHeader
        user={user}
        notifications={notifications}
        onThemeChange={handleThemeChange}
        onNotificationRead={handleNotificationRead}
        onLogout={() => setUser(null)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="dashboard-body">
        <DashboardSidebar
          user={user}
          activeView={activeView}
          onViewChange={setActiveView}
          collapsed={!sidebarOpen}
          onPreferenceUpdate={handlePreferenceUpdate}
          alerts={dashboardData.alerts}
          onAlertAcknowledge={handleAlertAcknowledge}
        />

        <DashboardMain
          user={user}
          activeView={activeView}
          dashboardData={dashboardData}
          onAlertAcknowledge={handleAlertAcknowledge}
          userPreferences={user.preferences}
          onPreferenceUpdate={handlePreferenceUpdate}
        />
      </div>
    </div>
  );
}

// Level 2: Header still drilling props
function DashboardHeader({
  user,
  notifications,
  onThemeChange,
  onNotificationRead,
  onLogout,
  sidebarOpen,
  onToggleSidebar,
}: {
  user: User;
  notifications: Notification[];
  onThemeChange: (theme: UserPreferences['theme']) => void;
  onNotificationRead: (id: string) => void;
  onLogout: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="dashboard-header">
      <button onClick={onToggleSidebar}>
        {sidebarOpen ? 'Collapse' : 'Expand'}
      </button>

      <div className="header-right">
        <HeaderNotifications
          notifications={notifications}
          onNotificationRead={onNotificationRead}
          userPreferences={user.preferences}
        />

        <HeaderUserMenu
          user={user}
          onThemeChange={onThemeChange}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

// Level 3: Notifications still need props drilled through
function HeaderNotifications({
  notifications,
  onNotificationRead,
  userPreferences,
}: {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  userPreferences: UserPreferences;
}) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="header-notifications">
      <button className="notification-bell">
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      <NotificationDropdown
        notifications={notifications}
        onNotificationRead={onNotificationRead}
        showNotifications={userPreferences.notifications}
      />
    </div>
  );
}

// Level 4: Still drilling
function NotificationDropdown({
  notifications,
  onNotificationRead,
  showNotifications,
}: {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  showNotifications: boolean;
}) {
  if (!showNotifications) {
    return <p>Notifications are disabled</p>;
  }

  return (
    <div className="notification-dropdown">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={onNotificationRead}
        />
      ))}
    </div>
  );
}

// Level 5: Finally uses the callback
function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: string) => void;
}) {
  return (
    <div
      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
      onClick={() => onRead(notification.id)}
    >
      <span className={`type-${notification.type}`}>{notification.message}</span>
    </div>
  );
}

// Level 2: Sidebar also drills props
function DashboardSidebar({
  user,
  activeView,
  onViewChange,
  collapsed,
  onPreferenceUpdate,
  alerts,
  onAlertAcknowledge,
}: {
  user: User;
  activeView: string;
  onViewChange: (view: 'overview' | 'analytics' | 'reports') => void;
  collapsed: boolean;
  onPreferenceUpdate: (key: keyof UserPreferences, value: any) => void;
  alerts: Alert[];
  onAlertAcknowledge: (id: string) => void;
}) {
  return (
    <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <SidebarNav
        activeView={activeView}
        onViewChange={onViewChange}
        userRole={user.role}
      />

      <SidebarAlerts
        alerts={alerts}
        onAlertAcknowledge={onAlertAcknowledge}
        collapsed={collapsed}
      />

      <SidebarSettings
        preferences={user.preferences}
        onPreferenceUpdate={onPreferenceUpdate}
        collapsed={collapsed}
      />
    </aside>
  );
}

// Level 3: Alerts still drilling
function SidebarAlerts({
  alerts,
  onAlertAcknowledge,
  collapsed,
}: {
  alerts: Alert[];
  onAlertAcknowledge: (id: string) => void;
  collapsed: boolean;
}) {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.acknowledged);

  if (collapsed) {
    return criticalAlerts.length > 0 ? <span className="alert-badge" /> : null;
  }

  return (
    <div className="sidebar-alerts">
      {alerts.map(alert => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onAcknowledge={onAlertAcknowledge}
        />
      ))}
    </div>
  );
}

// Level 4: Finally uses the callback
function AlertItem({
  alert,
  onAcknowledge,
}: {
  alert: Alert;
  onAcknowledge: (id: string) => void;
}) {
  return (
    <div className={`alert-item severity-${alert.severity}`}>
      <span>{alert.message}</span>
      {!alert.acknowledged && (
        <button onClick={() => onAcknowledge(alert.id)}>Acknowledge</button>
      )}
    </div>
  );
}

// More drilling through sidebar settings
function SidebarSettings({
  preferences,
  onPreferenceUpdate,
  collapsed,
}: {
  preferences: UserPreferences;
  onPreferenceUpdate: (key: keyof UserPreferences, value: any) => void;
  collapsed: boolean;
}) {
  if (collapsed) return null;

  return (
    <div className="sidebar-settings">
      <SettingsToggle
        label="Notifications"
        value={preferences.notifications}
        onChange={(v) => onPreferenceUpdate('notifications', v)}
      />
      <SettingsToggle
        label="Dark Mode"
        value={preferences.theme === 'dark'}
        onChange={(v) => onPreferenceUpdate('theme', v ? 'dark' : 'light')}
      />
    </div>
  );
}

// Level 2: Main content also drills props
function DashboardMain({
  user,
  activeView,
  dashboardData,
  onAlertAcknowledge,
  userPreferences,
  onPreferenceUpdate,
}: {
  user: User;
  activeView: string;
  dashboardData: DashboardData;
  onAlertAcknowledge: (id: string) => void;
  userPreferences: UserPreferences;
  onPreferenceUpdate: (key: keyof UserPreferences, value: any) => void;
}) {
  return (
    <main className="dashboard-main">
      {activeView === 'overview' && (
        <OverviewPanel
          metrics={dashboardData.metrics}
          recentActivity={dashboardData.recentActivity}
          alerts={dashboardData.alerts}
          onAlertAcknowledge={onAlertAcknowledge}
          layout={userPreferences.dashboardLayout}
          onLayoutChange={(layout) => onPreferenceUpdate('dashboardLayout', layout)}
          userRole={user.role}
        />
      )}
      {/* More views... */}
    </main>
  );
}

// Level 3: Overview panel continues drilling
function OverviewPanel({
  metrics,
  recentActivity,
  alerts,
  onAlertAcknowledge,
  layout,
  onLayoutChange,
  userRole,
}: {
  metrics: Metric[];
  recentActivity: Activity[];
  alerts: Alert[];
  onAlertAcknowledge: (id: string) => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
  userRole: User['role'];
}) {
  return (
    <div className={`overview-panel layout-${layout}`}>
      <div className="panel-header">
        <button onClick={() => onLayoutChange(layout === 'grid' ? 'list' : 'grid')}>
          Toggle Layout
        </button>
      </div>

      <MetricsGrid
        metrics={metrics}
        layout={layout}
      />

      <AlertsSection
        alerts={alerts}
        onAlertAcknowledge={onAlertAcknowledge}
        userRole={userRole}
      />
    </div>
  );
}

// Level 4: Alerts section AGAIN receives the same callback
function AlertsSection({
  alerts,
  onAlertAcknowledge,
  userRole,
}: {
  alerts: Alert[];
  onAlertAcknowledge: (id: string) => void;
  userRole: User['role'];
}) {
  const canAcknowledge = userRole === 'admin' || userRole === 'editor';

  return (
    <div className="alerts-section">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert severity-${alert.severity}`}>
          <span>{alert.message}</span>
          {canAcknowledge && !alert.acknowledged && (
            <button onClick={() => onAlertAcknowledge(alert.id)}>
              Acknowledge
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// Stub components
function SidebarNav({ activeView, onViewChange, userRole }: any) {
  return <nav />;
}

function HeaderUserMenu({ user, onThemeChange, onLogout }: any) {
  return <div />;
}

function SettingsToggle({ label, value, onChange }: any) {
  return <label />;
}

function MetricsGrid({ metrics, layout }: any) {
  return <div />;
}

function LoadingSpinner() {
  return <div>Loading...</div>;
}

// Stub fetch functions
async function fetchUser(): Promise<User> {
  return {} as User;
}

async function fetchNotifications(): Promise<Notification[]> {
  return [];
}

async function fetchDashboardData(): Promise<DashboardData> {
  return {} as DashboardData;
}

export default DashboardLayout;
