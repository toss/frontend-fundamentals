# Frontend Fundamentals Plugin

Claude Code plugin for Frontend Fundamentals best practices by Toss.

## Installation

### From GitHub (Recommended)

```bash
# Add marketplace
/plugin marketplace add toss/frontend-fundamentals

# Install plugin
/plugin install frontend-fundamentals@toss-frontend-fundamentals
```

### Manual (Local)

```bash
git clone https://github.com/toss/frontend-fundamentals.git
claude --plugin-dir ./frontend-fundamentals/frontend-fundamentals-plugin
```

## Skills

- **code-quality** - Code quality principles (readability, predictability, cohesion, coupling)
- **accessibility** - Web accessibility (a11y) best practices

## Commands

- `/frontend-fundamentals:review` - Review code against FF principles

## Reference

- https://frontend-fundamentals.com
- https://github.com/toss/frontend-fundamentals
