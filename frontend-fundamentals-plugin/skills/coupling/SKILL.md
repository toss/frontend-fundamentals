---
name: coupling
description: Use when reviewing or writing code where props pass through many layers, hooks do too much, or changes ripple across unrelated components.
---

# Coupling

Minimize scope of impact when code changes. Changes to one feature shouldn't break others.

## When to Apply

- Props drilled through 3+ component layers
- One hook managing many unrelated concerns
- Changing one feature breaks unrelated features
- Components know too much about parent/child implementation

## Key Pattern: Composition Over Props Drilling

Pass components, not data:

❌ Bad:
```tsx
<Page user={user}>
  <Layout user={user}>
    <Header user={user}>
      <Avatar user={user} />
    </Header>
  </Layout>
</Page>
```

✅ Good:
```tsx
<Page>
  <Layout header={<Header avatar={<Avatar user={user} />} />}>
    <Content />
  </Layout>
</Page>
```

Only the component that needs `user` receives it directly.

## Key Pattern: Single-Responsibility Hooks

Split "god hooks" into focused units:

❌ Bad:
```tsx
function useUser() {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  // ... 50 more lines managing everything
  return { user, preferences, notifications, messages, ... };
}
```

✅ Good:
```tsx
function useUser() {
  return useQuery('user', fetchUser);
}

function usePreferences(userId: string) {
  return useQuery(['preferences', userId], fetchPreferences);
}

function useNotifications(userId: string) {
  return useQuery(['notifications', userId], fetchNotifications);
}
```

Each hook has one reason to change.

## Quick Reference

| Smell | Fix |
|-------|-----|
| Props through 3+ layers | Composition pattern: pass components as props |
| Hook returns 5+ unrelated things | Split into focused single-purpose hooks |
| Component imports from 10+ files | Facade pattern or better colocation |
| Changing A breaks unrelated B | Identify coupling point, introduce interface |
| "Util" file imported everywhere | Move logic closer to usage or create explicit API |

## When Context is Appropriate

Use Context for truly global concerns:
- Theme, locale, auth state
- Data that 10+ components need

Don't use Context to avoid composition patterns.

## Anti-Patterns to Avoid

- Don't create global state for everything
- Don't couple through shared "smart" components
- Don't add more responsibilities to existing large hooks

Reference: https://frontend-fundamentals.com/code-quality/loosely-coupled/
