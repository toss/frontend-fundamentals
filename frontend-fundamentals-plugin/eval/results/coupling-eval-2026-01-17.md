# Coupling Skill Evaluation

> **Evaluation Timestamp:** 2026-01-17
> **Model:** Claude Opus 4.5

## Summary

| Task | Grade | Issue Found | Fix Suggested |
|------|-------|-------------|---------------|
| props-drilling.tsx | PASS | Props drilled through 5 layers (App -> Page -> Layout/Header/Sidebar -> Avatar/UserMenu) | Composition pattern with children, Context for user data |
| god-hook.tsx | PASS | Single hook manages 8 unrelated state pieces (user, preferences, notifications, friends, posts, messages) | Split into useUser, usePreferences, useNotifications, useFriends, usePosts, useMessages |
| dashboard-layout.tsx | PASS | Props drilled through 4-5 layers; same callbacks passed redundantly (onAlertAcknowledge in 3 branches) | Composition pattern, Context for shared state (user, alerts, notifications) |
| use-dashboard.tsx | PASS | God hook with 18 useState, 12 useEffect, 50+ returned values managing 6 unrelated domains | Split into useUser, usePreferences, useWidgets, useNotifications, useUIState, useAnalytics, useRealtime |

**Overall Pass Rate: 4/4 (100%)**

---

## Detailed Results

### props-drilling.tsx

**Code Review:**

The code shows a classic props drilling anti-pattern where the `user` object is passed from `App` through every intermediate component down to the leaf components that actually use it:

```
App (owns user)
  -> Page (passes user)
    -> Layout (passes user)
      -> Header (passes user)
        -> UserMenu (uses user)
      -> Sidebar (passes user)
        -> Avatar (uses user)
    -> Content (passes user)
      -> UserProfile (uses user)
```

The `user` prop is passed through 4-5 layers, and intermediate components like `Page`, `Layout`, `Header`, `Sidebar`, and `Content` only pass it through without using it themselves.

**Issue Identified:**

- Props drilling: The `user` prop is threaded through multiple component layers
- Every intermediate component must know about and forward the `user` prop
- Adding a new user property or changing the User interface requires changes to every component in the chain
- Components like `Layout`, `Header`, `Sidebar`, and `Content` are unnecessarily coupled to the User type

**Suggested Fix:**

1. **Composition Pattern**: Use the `children` prop to compose components without drilling:
```tsx
function App() {
  const user = useCurrentUser();
  return (
    <Layout
      header={<UserMenu user={user} />}
      sidebar={<Avatar user={user} />}
    >
      <UserProfile user={user} />
    </Layout>
  );
}
```

2. **React Context** (for truly global user data):
```tsx
const UserContext = createContext<User | null>(null);

function App() {
  const user = useCurrentUser();
  return (
    <UserContext.Provider value={user}>
      <Page />
    </UserContext.Provider>
  );
}

// In leaf components
function Avatar() {
  const user = useContext(UserContext);
  return <img src={user?.avatar} alt={user?.name} />;
}
```

The composition pattern is preferred when components need to render user-specific UI in specific slots. Context is appropriate here since user data is truly global and needed by many unrelated components.

**Grade:** PASS

**Reasoning:** Correctly identified that props are drilled through 4-5 component layers (App -> Page -> Layout -> Header/Sidebar/Content -> leaf components). Suggested both composition pattern and Context as appropriate fixes without recommending global state management (Redux/MobX) which would be over-engineering for this case.

---

### god-hook.tsx

**Code Review:**

The `useUser` hook manages 8 different pieces of state that are logically separate domains:

1. **User data**: `user`, `loading`, `error` - core authentication/identity
2. **Preferences**: `preferences` - user settings
3. **Notifications**: `notifications` - alert system
4. **Social**: `friends` - social connections
5. **Content**: `posts` - user-generated content
6. **Messaging**: `messages` - communication

The hook also bundles 3 different action handlers (`updatePreferences`, `markNotificationRead`, `sendMessage`) that operate on completely different domains.

**Issue Identified:**

- **Single Responsibility Violation**: One hook manages 6+ unrelated concerns
- **Change Amplification**: Any change to notifications, messaging, or preferences logic requires modifying this single hook
- **Testing Difficulty**: Cannot test messaging logic without also setting up user, preferences, and notification mocks
- **Re-render Coupling**: Components using only `messages` will re-render when `preferences` change
- **Dependency Chain**: All secondary data fetches depend on `user.id`, but they don't depend on each other - yet they're coupled

**Suggested Fix:**

Split into focused single-responsibility hooks:

```tsx
// Core user identity
function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser().then(setUser).catch(setError).finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}

// User preferences
function usePreferences(userId: string | undefined) {
  const [preferences, setPreferences] = useState<Preferences>({});

  useEffect(() => {
    if (userId) fetchPreferences(userId).then(setPreferences);
  }, [userId]);

  const updatePreferences = async (prefs: Partial<Preferences>) => {
    await savePreferences(prefs);
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  return { preferences, updatePreferences };
}

// Notifications
function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (userId) fetchNotifications(userId).then(setNotifications);
  }, [userId]);

  const markNotificationRead = async (id: string) => {
    await markRead(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, markNotificationRead };
}

// Similar hooks for useFriends, usePosts, useMessages
```

Components then compose only the hooks they need:

```tsx
function NotificationPanel() {
  const { user } = useUser();
  const { notifications, markNotificationRead } = useNotifications(user?.id);
  // Only re-renders when notifications change
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that the hook does too many unrelated things (user data, preferences, notifications, friends, posts, messages). Suggested splitting into focused single-responsibility hooks (useUser, usePreferences, useNotifications, etc.) which is the correct fix. Did not suggest adding more flags/options to control behavior, which would be the wrong approach.

---

### dashboard-layout.tsx

**Code Review:**

This is a more complex props drilling example with multiple data streams being drilled:

1. **User data**: drilled through DashboardHeader -> HeaderUserMenu, DashboardSidebar -> SidebarNav/SidebarSettings, DashboardMain -> OverviewPanel -> AlertsSection
2. **Notifications**: drilled DashboardHeader -> HeaderNotifications -> NotificationDropdown -> NotificationItem (4-5 levels)
3. **Alerts + onAlertAcknowledge**: drilled through DashboardSidebar -> SidebarAlerts -> AlertItem AND through DashboardMain -> OverviewPanel -> AlertsSection (same callback passed to two separate branches)
4. **Preferences + onPreferenceUpdate**: drilled through DashboardSidebar -> SidebarSettings AND DashboardMain -> OverviewPanel

The `onAlertAcknowledge` callback is particularly problematic - it's defined in `DashboardLayout` but used in:
- SidebarAlerts -> AlertItem
- DashboardMain -> OverviewPanel -> AlertsSection

**Issue Identified:**

- **Excessive Props Drilling**: Props pass through 4-5 component layers before being used
- **Prop Explosion**: `DashboardHeader` receives 7 props, `DashboardSidebar` receives 7 props, `DashboardMain` receives 6 props
- **Redundant Callback Threading**: Same `onAlertAcknowledge` callback is passed down two completely separate component branches
- **Tight Coupling**: Every intermediate component must know about all the data types and callbacks even if it doesn't use them
- **Maintenance Burden**: Adding a new action requires modifying 4-5 components to thread the prop through

**Suggested Fix:**

1. **Composition Pattern** for structural components:

```tsx
function DashboardLayout() {
  // ... state management ...

  return (
    <div className="dashboard">
      <DashboardHeader>
        <NotificationBell
          notifications={notifications}
          onRead={handleNotificationRead}
        />
        <UserMenu user={user} onLogout={() => setUser(null)} />
      </DashboardHeader>

      <DashboardSidebar collapsed={!sidebarOpen}>
        <SidebarNav activeView={activeView} onViewChange={setActiveView} />
        <AlertsList alerts={dashboardData.alerts} onAcknowledge={handleAlertAcknowledge} />
      </DashboardSidebar>

      <DashboardMain>
        {/* View content */}
      </DashboardMain>
    </div>
  );
}
```

2. **Context for truly shared state**:

```tsx
// For user data (used everywhere)
const UserContext = createContext<{ user: User; preferences: UserPreferences } | null>(null);

// For alerts (used in multiple unrelated branches)
const AlertsContext = createContext<{
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
} | null>(null);

function DashboardLayout() {
  // ... state ...

  return (
    <UserContext.Provider value={{ user, preferences: user.preferences }}>
      <AlertsContext.Provider value={{ alerts: dashboardData.alerts, onAcknowledge: handleAlertAcknowledge }}>
        <DashboardHeader />
        <DashboardSidebar />
        <DashboardMain />
      </AlertsContext.Provider>
    </UserContext.Provider>
  );
}

// In any component that needs alerts
function AlertItem({ alert }: { alert: Alert }) {
  const { onAcknowledge } = useContext(AlertsContext);
  // ...
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that props are drilled through 4-5 component layers and that the same callbacks (especially `onAlertAcknowledge`) are redundantly passed through multiple branches. Suggested composition pattern and Context for truly shared state. Did not suggest Redux/global store for all props, which would be over-engineering.

---

### use-dashboard.tsx

**Code Review:**

This is an extreme example of a "god hook" that manages essentially the entire application state:

**State Count:**
- 18 `useState` calls
- 12 `useEffect` hooks
- 3 `useRef` hooks
- 50+ values returned

**Domains Managed (should be separate):**
1. **User** (3 states): `user`, `userLoading`, `userError`
2. **Preferences** (3 states): `preferences`, `preferencesLoading`, `preferencesDirty`
3. **Widgets** (5 states): `widgets`, `widgetsLoading`, `widgetsError`, `selectedWidgetId`, `editingWidgetId`
4. **Notifications** (4 states): `notifications`, `notificationsLoading`, `notificationsPanelOpen`, + computed `unreadCount`
5. **UI State** (5 states): `sidebarOpen`, `modalOpen`, `searchOpen`, `searchQuery`, `activeTab`
6. **Real-time** (3 states): `isConnected`, `lastSync`, `pendingChanges`
7. **Analytics** (2 states): `analyticsQueue`, + ref for flush timing

**Issue Identified:**

- **Massive Single Responsibility Violation**: One hook manages 6-7 completely unrelated domains
- **Impossible to Test**: Testing widget logic requires mocking user auth, preferences, analytics, WebSocket, etc.
- **Performance Nightmare**: Any state change triggers re-computation and re-render of everything
- **Change Amplification**: Adding a feature to notifications requires modifying a 550+ line hook
- **Circular Dependencies**: Analytics tracking (`trackEvent`) is called from widget/preference handlers, creating internal coupling
- **Memory Leaks Risk**: Multiple intervals, timeouts, and WebSocket need coordinated cleanup
- **Shared State Hazard**: The `flushAnalytics` in `logout` reads `analyticsQueue` from closure - stale closure bugs waiting to happen

**Suggested Fix:**

Split into focused, single-responsibility hooks:

```tsx
// 1. User authentication
function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser().then(setUser).catch(setError).finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  return { user, loading, error, logout };
}

// 2. User preferences
function usePreferences(userId: string | undefined) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);

  // Fetch and auto-save logic

  return { preferences, loading, dirty, updatePreference, updateNotificationPreference };
}

// 3. Dashboard widgets
function useWidgets(userId: string | undefined) {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // CRUD operations

  return {
    widgets, loading, error,
    selectedWidget, editingWidget,
    addWidget, updateWidget, deleteWidget, selectWidget, startEditing, stopEditing
  };
}

// 4. Notifications
function useNotifications(userId: string | undefined, enabled: boolean) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);

  // Fetch and polling logic

  return { notifications, loading, unreadCount, panelOpen, setPanelOpen, markRead, markAllRead, dismiss };
}

// 5. UI state (simple, no side effects)
function useDashboardUI() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  return {
    sidebarOpen, toggleSidebar: () => setSidebarOpen(v => !v),
    modalOpen, openModal, closeModal,
    searchOpen, searchQuery, openSearch, closeSearch, setSearchQuery,
    activeTab, setTab
  };
}

// 6. Real-time connection
function useRealtimeSync(userId: string | undefined, onMessage: (data: any) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // WebSocket logic

  return { isConnected, lastSync };
}

// 7. Analytics (separate concern)
function useAnalytics(userId: string | undefined) {
  const [queue, setQueue] = useState<AnalyticsEvent[]>([]);

  const trackEvent = useCallback((name: string, properties: Record<string, any>) => {
    setQueue(prev => [...prev, { name, properties: { ...properties, userId }, timestamp: new Date() }]);
  }, [userId]);

  // Batching and flush logic

  return { trackEvent, flush };
}

// 8. Keyboard shortcuts (separate concern)
function useKeyboardShortcuts(shortcuts: KeyboardShortcuts | undefined, handlers: ShortcutHandlers) {
  useEffect(() => {
    // Event listener logic
  }, [shortcuts, handlers]);
}
```

Components compose only what they need:

```tsx
function DashboardPage() {
  const { user, loading: userLoading, logout } = useUser();
  const { preferences } = usePreferences(user?.id);
  const widgets = useWidgets(user?.id);
  const notifications = useNotifications(user?.id, preferences?.notifications.inApp ?? false);
  const ui = useDashboardUI();
  const { trackEvent } = useAnalytics(user?.id);

  // Only pass what each child actually needs
}

// Widget panel only needs widget state
function WidgetPanel() {
  const { user } = useUser();
  const { widgets, selectedWidget, selectWidget } = useWidgets(user?.id);
  // No notification, analytics, or preference logic polluting this component
}
```

**Grade:** PASS

**Reasoning:** Correctly identified the god hook pattern with 18 useState, 12 useEffect, and 50+ returned values managing 6-7 unrelated domains (user, preferences, widgets, notifications, UI state, real-time, analytics). Suggested splitting into focused hooks (useUser, usePreferences, useWidgets, useNotifications, useDashboardUI, useRealtimeSync, useAnalytics, useKeyboardShortcuts). Did not suggest adding more parameters or flags to control behavior, which would make the problem worse.

---

## Conclusion

All four coupling tasks were correctly evaluated:

1. **props-drilling.tsx**: Identified basic props drilling and suggested composition/context
2. **god-hook.tsx**: Identified a hook managing too many concerns and suggested splitting by domain
3. **dashboard-layout.tsx**: Identified complex multi-branch props drilling with redundant callback threading
4. **use-dashboard.tsx**: Identified extreme god hook pattern and provided comprehensive splitting strategy

The key principle validated: **Coupling issues should be fixed by separation of concerns** (composition, context, or splitting hooks), NOT by adding more centralized state management or more flags/options to existing structures.
