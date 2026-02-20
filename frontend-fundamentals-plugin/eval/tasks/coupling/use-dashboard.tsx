// EVAL TASK: Coupling - God Hook Managing Too Many Unrelated Concerns
// Expected: Identify that this hook manages dashboard data, user preferences, notifications, analytics, AND UI state; should be split into focused hooks
// Domain: SaaS analytics dashboard

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  dashboardLayout: 'grid' | 'list';
  refreshInterval: number;
  notifications: NotificationPreferences;
  shortcuts: KeyboardShortcuts;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  digest: 'daily' | 'weekly' | 'never';
}

interface KeyboardShortcuts {
  toggleSidebar: string;
  search: string;
  newWidget: string;
  refresh: string;
}

interface DashboardWidget {
  id: string;
  type: 'chart' | 'table' | 'metric' | 'list';
  title: string;
  config: Record<string, any>;
  position: { x: number; y: number; w: number; h: number };
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  read: boolean;
  createdAt: Date;
}

interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
}

interface DashboardState {
  // User data
  user: User | null;
  userLoading: boolean;
  userError: Error | null;

  // Preferences
  preferences: UserPreferences | null;
  preferencesLoading: boolean;
  preferencesDirty: boolean;

  // Dashboard data
  widgets: DashboardWidget[];
  widgetsLoading: boolean;
  widgetsError: Error | null;
  selectedWidgetId: string | null;
  editingWidgetId: string | null;

  // Notifications
  notifications: Notification[];
  notificationsLoading: boolean;
  unreadCount: number;
  notificationsPanelOpen: boolean;

  // UI State
  sidebarOpen: boolean;
  modalOpen: string | null;
  searchOpen: boolean;
  searchQuery: string;
  activeTab: string;

  // Real-time updates
  isConnected: boolean;
  lastSync: Date | null;
  pendingChanges: number;

  // Analytics queue
  analyticsQueue: AnalyticsEvent[];
  analyticsFlushPending: boolean;
}

// This hook does WAY too much - manages completely unrelated concerns
export function useDashboard() {
  // =============== USER STATE ===============
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  // =============== PREFERENCES STATE ===============
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [preferencesLoading, setPreferencesLoading] = useState(true);
  const [preferencesDirty, setPreferencesDirty] = useState(false);

  // =============== WIDGETS STATE ===============
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [widgetsLoading, setWidgetsLoading] = useState(true);
  const [widgetsError, setWidgetsError] = useState<Error | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);

  // =============== NOTIFICATIONS STATE ===============
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  // =============== UI STATE ===============
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // =============== REAL-TIME STATE ===============
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [pendingChanges, setPendingChanges] = useState(0);

  // =============== ANALYTICS STATE ===============
  const [analyticsQueue, setAnalyticsQueue] = useState<AnalyticsEvent[]>([]);
  const analyticsFlushRef = useRef<NodeJS.Timeout | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // =============== USER EFFECTS ===============
  useEffect(() => {
    fetchUser()
      .then(setUser)
      .catch(setUserError)
      .finally(() => setUserLoading(false));
  }, []);

  // =============== PREFERENCES EFFECTS ===============
  useEffect(() => {
    if (user) {
      fetchPreferences(user.id)
        .then(setPreferences)
        .finally(() => setPreferencesLoading(false));
    }
  }, [user?.id]);

  // Auto-save preferences when dirty
  useEffect(() => {
    if (preferencesDirty && preferences && user) {
      const timeout = setTimeout(() => {
        savePreferences(user.id, preferences);
        setPreferencesDirty(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [preferencesDirty, preferences, user]);

  // =============== WIDGETS EFFECTS ===============
  useEffect(() => {
    if (user) {
      fetchWidgets(user.id)
        .then(setWidgets)
        .catch(setWidgetsError)
        .finally(() => setWidgetsLoading(false));
    }
  }, [user?.id]);

  // =============== NOTIFICATIONS EFFECTS ===============
  useEffect(() => {
    if (user) {
      fetchNotifications(user.id)
        .then(setNotifications)
        .finally(() => setNotificationsLoading(false));
    }
  }, [user?.id]);

  // Poll for new notifications
  useEffect(() => {
    if (user && preferences?.notifications.inApp) {
      const interval = setInterval(() => {
        fetchNotifications(user.id).then(setNotifications);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user?.id, preferences?.notifications.inApp]);

  // =============== REAL-TIME EFFECTS ===============
  useEffect(() => {
    if (user) {
      wsRef.current = new WebSocket(`wss://api.example.com/ws?userId=${user.id}`);

      wsRef.current.onopen = () => setIsConnected(true);
      wsRef.current.onclose = () => setIsConnected(false);

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleRealtimeUpdate(data);
      };

      return () => wsRef.current?.close();
    }
  }, [user?.id]);

  // Auto-refresh based on preferences
  useEffect(() => {
    if (preferences?.refreshInterval && preferences.refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        refreshDashboard();
      }, preferences.refreshInterval * 1000);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [preferences?.refreshInterval]);

  // =============== KEYBOARD SHORTCUTS EFFECT ===============
  useEffect(() => {
    if (!preferences?.shortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { shortcuts } = preferences;

      if (e.key === shortcuts.toggleSidebar && e.ctrlKey) {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }

      if (e.key === shortcuts.search && e.ctrlKey) {
        e.preventDefault();
        setSearchOpen(true);
      }

      if (e.key === shortcuts.refresh && e.ctrlKey) {
        e.preventDefault();
        refreshDashboard();
      }

      if (e.key === 'Escape') {
        setSearchOpen(false);
        setModalOpen(null);
        setEditingWidgetId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [preferences?.shortcuts]);

  // =============== ANALYTICS FLUSH EFFECT ===============
  useEffect(() => {
    if (analyticsQueue.length >= 10) {
      flushAnalytics();
    } else if (analyticsQueue.length > 0 && !analyticsFlushRef.current) {
      analyticsFlushRef.current = setTimeout(() => {
        flushAnalytics();
        analyticsFlushRef.current = null;
      }, 5000);
    }

    return () => {
      if (analyticsFlushRef.current) {
        clearTimeout(analyticsFlushRef.current);
      }
    };
  }, [analyticsQueue.length]);

  // =============== THEME EFFECT ===============
  useEffect(() => {
    if (preferences?.theme) {
      document.documentElement.classList.remove('light', 'dark');
      if (preferences.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(preferences.theme);
      }
    }
  }, [preferences?.theme]);

  // =============== HANDLERS ===============
  const handleRealtimeUpdate = useCallback((data: any) => {
    switch (data.type) {
      case 'widget_update':
        setWidgets(prev => prev.map(w => w.id === data.widgetId ? { ...w, ...data.changes } : w));
        break;
      case 'notification':
        setNotifications(prev => [data.notification, ...prev]);
        break;
      case 'sync':
        setLastSync(new Date());
        break;
    }
  }, []);

  // =============== USER ACTIONS ===============
  const logout = useCallback(async () => {
    await flushAnalytics();
    wsRef.current?.close();
    setUser(null);
    setPreferences(null);
    setWidgets([]);
    setNotifications([]);
  }, []);

  // =============== PREFERENCE ACTIONS ===============
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => prev ? { ...prev, [key]: value } : null);
    setPreferencesDirty(true);
    trackEvent('preference_changed', { key, value });
  }, []);

  const updateNotificationPreference = useCallback(<K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences(prev => {
      if (!prev) return null;
      return {
        ...prev,
        notifications: { ...prev.notifications, [key]: value },
      };
    });
    setPreferencesDirty(true);
  }, []);

  // =============== WIDGET ACTIONS ===============
  const addWidget = useCallback(async (widget: Omit<DashboardWidget, 'id'>) => {
    if (!user) return;
    const newWidget = await createWidget(user.id, widget);
    setWidgets(prev => [...prev, newWidget]);
    trackEvent('widget_added', { type: widget.type });
  }, [user]);

  const updateWidget = useCallback(async (id: string, changes: Partial<DashboardWidget>) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, ...changes } : w));
    setPendingChanges(prev => prev + 1);

    // Debounced save
    await saveWidget(id, changes);
    setPendingChanges(prev => prev - 1);
    setLastSync(new Date());
  }, []);

  const deleteWidget = useCallback(async (id: string) => {
    await removeWidget(id);
    setWidgets(prev => prev.filter(w => w.id !== id));
    if (selectedWidgetId === id) setSelectedWidgetId(null);
    if (editingWidgetId === id) setEditingWidgetId(null);
    trackEvent('widget_deleted', { id });
  }, [selectedWidgetId, editingWidgetId]);

  const selectWidget = useCallback((id: string | null) => {
    setSelectedWidgetId(id);
    if (id) trackEvent('widget_selected', { id });
  }, []);

  const startEditingWidget = useCallback((id: string) => {
    setEditingWidgetId(id);
    trackEvent('widget_edit_started', { id });
  }, []);

  const stopEditingWidget = useCallback(() => {
    setEditingWidgetId(null);
  }, []);

  // =============== NOTIFICATION ACTIONS ===============
  const markNotificationRead = useCallback(async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    await updateNotification(id, { read: true });
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    if (user) {
      await markAllRead(user.id);
    }
  }, [user]);

  const dismissNotification = useCallback(async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    await deleteNotification(id);
  }, []);

  // =============== UI ACTIONS ===============
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const newValue = !prev;
      updatePreference('sidebarCollapsed', !newValue);
      return newValue;
    });
  }, [updatePreference]);

  const openModal = useCallback((modalId: string) => {
    setModalOpen(modalId);
    trackEvent('modal_opened', { modalId });
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(null);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    trackEvent('search_opened', {});
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
  }, []);

  const setTab = useCallback((tab: string) => {
    setActiveTab(tab);
    trackEvent('tab_changed', { tab });
  }, []);

  // =============== ANALYTICS ACTIONS ===============
  const trackEvent = useCallback((name: string, properties: Record<string, any>) => {
    setAnalyticsQueue(prev => [...prev, {
      name,
      properties: { ...properties, userId: user?.id },
      timestamp: new Date(),
    }]);
  }, [user?.id]);

  const flushAnalytics = useCallback(async () => {
    if (analyticsQueue.length === 0) return;

    const eventsToFlush = [...analyticsQueue];
    setAnalyticsQueue([]);

    try {
      await sendAnalytics(eventsToFlush);
    } catch (error) {
      // Re-queue failed events
      setAnalyticsQueue(prev => [...eventsToFlush, ...prev]);
    }
  }, [analyticsQueue]);

  // =============== REFRESH ACTION ===============
  const refreshDashboard = useCallback(async () => {
    if (!user) return;

    setWidgetsLoading(true);
    try {
      const newWidgets = await fetchWidgets(user.id);
      setWidgets(newWidgets);
      setLastSync(new Date());
      trackEvent('dashboard_refreshed', {});
    } catch (error) {
      setWidgetsError(error as Error);
    } finally {
      setWidgetsLoading(false);
    }
  }, [user, trackEvent]);

  // =============== COMPUTED VALUES ===============
  const unreadCount = notifications.filter(n => !n.read).length;
  const isLoading = userLoading || preferencesLoading || widgetsLoading;
  const hasError = userError || widgetsError;
  const selectedWidget = widgets.find(w => w.id === selectedWidgetId);
  const editingWidget = widgets.find(w => w.id === editingWidgetId);

  // Return EVERYTHING - this is the problem
  return {
    // User
    user,
    userLoading,
    userError,
    logout,

    // Preferences
    preferences,
    preferencesLoading,
    preferencesDirty,
    updatePreference,
    updateNotificationPreference,

    // Widgets
    widgets,
    widgetsLoading,
    widgetsError,
    selectedWidget,
    selectedWidgetId,
    editingWidget,
    editingWidgetId,
    addWidget,
    updateWidget,
    deleteWidget,
    selectWidget,
    startEditingWidget,
    stopEditingWidget,

    // Notifications
    notifications,
    notificationsLoading,
    unreadCount,
    notificationsPanelOpen,
    setNotificationsPanelOpen,
    markNotificationRead,
    markAllNotificationsRead,
    dismissNotification,

    // UI
    sidebarOpen,
    toggleSidebar,
    modalOpen,
    openModal,
    closeModal,
    searchOpen,
    searchQuery,
    setSearchQuery,
    openSearch,
    closeSearch,
    activeTab,
    setTab,

    // Real-time
    isConnected,
    lastSync,
    pendingChanges,
    refreshDashboard,

    // Analytics
    trackEvent,
    flushAnalytics,

    // Computed
    isLoading,
    hasError,
  };
}

// Stub API functions
async function fetchUser(): Promise<User> {
  return {} as User;
}
async function fetchPreferences(userId: string): Promise<UserPreferences> {
  return {} as UserPreferences;
}
async function savePreferences(userId: string, prefs: UserPreferences): Promise<void> {}
async function fetchWidgets(userId: string): Promise<DashboardWidget[]> {
  return [];
}
async function createWidget(userId: string, widget: Omit<DashboardWidget, 'id'>): Promise<DashboardWidget> {
  return {} as DashboardWidget;
}
async function saveWidget(id: string, changes: Partial<DashboardWidget>): Promise<void> {}
async function removeWidget(id: string): Promise<void> {}
async function fetchNotifications(userId: string): Promise<Notification[]> {
  return [];
}
async function updateNotification(id: string, changes: Partial<Notification>): Promise<void> {}
async function deleteNotification(id: string): Promise<void> {}
async function markAllRead(userId: string): Promise<void> {}
async function sendAnalytics(events: AnalyticsEvent[]): Promise<void> {}

export default useDashboard;
