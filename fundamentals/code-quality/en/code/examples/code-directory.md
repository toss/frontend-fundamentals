# Keeping Files That Are Modified Together in the Same Directory

<div style="margin-top: 16px">
<Badge type="info" text="Cohesion" />
</div>

When writing code in a project, you often manage hooks, components, utility functions, etc., by dividing them into multiple files. It is important to have a proper directory structure to easily create, find, and delete these files.

Placing source files that are modified together in one directory can clearly reveal the code dependencies. This prevents unauthorized references to files that should not be referenced and allows related files to be deleted at once.

## 📝 Code Example

The following code is a directory structure that categorizes all files in the project by module type (Presentational components, Container components, Hooks, constants, etc.).

```text
└─ src
   ├─ components
   ├─ constants
   ├─ containers
   ├─ contexts
   ├─ remotes
   ├─ hooks
   ├─ utils
   └─ ...
```

## 👃 Smell the Code

### Cohesion

If you divide files by type like this, it becomes difficult to see which code references which. Developers have to analyze the code themselves to understand the dependencies between code files.
Additionally, if a specific component, hook, or utility function is no longer used and gets deleted, related code might not be deleted together, leaving unused code behind.

As the project grows, the dependencies between code can become significantly more complex, doubling, tenfold, or even a hundredfold. A single directory might end up containing over 100 files.

## ✏️ Work on Improving

The following is an example of improving the structure so that code files that are modified together form a single directory.

```text
└─ src
   │  // Code used in the entire project
   ├─ components
   ├─ containers
   ├─ hooks
   ├─ utils
   ├─ ...
   │
   └─ domains
      │  // Code used only in Domain1
      ├─ Domain1
      │     ├─ components
      │     ├─ containers
      │     ├─ hooks
      │     ├─ utils
      │     └─ ...
      │
      │  // Code used only in Domain2
      └─ Domain2
            ├─ components
            ├─ containers
            ├─ hooks
            ├─ utils
            └─ ...
```

If you place code files that are modified together under a single directory, it becomes easier to understand the dependencies between the code.

For example, consider a case where the sub-code of one domain (`Domain1`) references the source code of another domain (`Domain2`).

```typescript
import { useFoo } from "../../../Domain2/hooks/useFoo";
```

When you encounter such an import statement, you can easily recognize that the wrong file is being referenced.

Additionally, when deleting code related to a specific feature, you can delete the entire directory, ensuring that all related code is removed cleanly, leaving no unused code in the project.
