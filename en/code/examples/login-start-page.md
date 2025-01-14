# Abstracting Implementation Details

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>
The number of contexts a person can consider at once while reading code is limited.
To make it easier for others to read your code, you can abstract unnecessary contexts.

## 📝 Code Example 1: LoginStartPage

The following `<LoginStartPage />` component contains logic to check if the user is logged in and redirect them to the home page if they are.

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }
  });

  /* ... login related logic ... */

  return <>{/* ... login related components ... */}</>;
}
```

### 👃 Smell the Code

#### Readability

In the example code, the logic to check if the user is logged in and redirect them to the home page is exposed without abstraction. Therefore, you need to read all the variables and values such as `useCheckLogin`, `onChecked`, `status`, and `"LOGGED_IN"` to understand what the code does.

Additionally, the actual login-related code follows below. There are many contexts that the reader needs to understand at once to know what `LoginStartPage` does.

### ✏️ Work on Improving

Separate the logic to check if the user is logged in and redirect them using a **HOC (Higher-Order Component)** or a Wrapper component to reduce the context that the reader needs to understand at once.
This will improve the readability of the code.

Additionally, by preventing the logic within the separated component from referencing each other, you can avoid unnecessary dependencies and complexity in the code.

#### Option A: Using a Wrapper Component

```tsx
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();

  useEffect(() => {
    if (status === "LOGGED_IN") {
      location.href = "/home";
    }
  }, [status]);

  return status !== "LOGGED_IN" ? children : null;
}

function LoginStartPage() {
  /* ... login related logic ... */

  return <>{/* ... login related components ... */}</>;
}
```

#### Option B: Using a Higher-Order Component (HOC)

```tsx
function LoginStartPage() {
  /* ... login related logic ... */

  return <>{/* ... login related components ... */}</>;
}

export default withAuthGuard(LoginStartPage);

// Define HOC
function withAuthGuard(WrappedComponent) {
  return function AuthGuard(props) {
    const status = useCheckLoginStatus();

    useEffect(() => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }, [status]);

    return status !== "LOGGED_IN" ? <WrappedComponent {...props} /> : null;
  };
}
```

## 📝 Code Example 2: FriendInvitation

The following `<FriendInvitation />` component is a page component that, when clicked, asks for the user's consent and sends an invitation to the user.

```tsx 6-27,33
function FriendInvitation() {
  const { data } = useQuery(/* Omitted for brevity .. */);

  // Other state management, event handlers, and asynchronous logic needed for this component...
  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`Share with ${data.name}`}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => close(false)}>
            Close
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
            Confirm
          </ConfirmDialog.ConfirmButton>
        }
        /* omitted */
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  // Other state management, event handlers, and asynchronous logic needed for this component...

  return (
    <>
      <Button onClick={handleClick}>Invite</Button>
      {/* JSX markup for UI... */}
    </>
  );
}
```

### 👃 Smell the Code

#### Readability

To maintain readability, the code should have a limited context at once. If a single component has a diverse context, it becomes difficult to understand the component's role at a glance.

The `<FriendInvitation />` component holds detailed logic for receiving user consent, making it difficult to read due to the many contexts to follow.

#### Cohesion

The logic for receiving user consent and the logic for executing that logic, `<Button />`, are far apart, making it necessary to scroll down a lot to find where this logic is executed.

This increases the likelihood that frequently modified code, such as the button and click handler, may not be modified together.

### ✏️ Work on Improving

We abstracted the logic for receiving user consent and the button into the `<InviteButton />` component.

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* omitted.. */);

  // Other state management, event handlers, and asynchronous logic needed for this component...

  return (
    <>
      <InviteButton name={data.name} />
      {/* JSX markup for UI */}
    </>
  );
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(({ isOpen, close }) => (
          <ConfirmDialog
            title={`Share with ${data.name}`}
            cancelButton={
              <ConfirmDialog.CancelButton onClick={() => close(false)}>
                Close
              </ConfirmDialog.CancelButton>
            }
            confirmButton={
              <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
                Confirm
              </ConfirmDialog.ConfirmButton>
            }
            /* omitted */
          />
        ));

        if (canInvite) {
          await sendPush();
        }
      }}
    >
      Invite
    </Button>
  );
}
```

The `<InviteButton />` component only contains the logic for inviting users and the UI, so it can maintain a low amount of information to be aware of at once, increasing readability. Additionally, the button and the logic executed after clicking are very close together.

## 🔍 Learn More: Abstraction

In the Toss technical blog's article on [Writing Declarative Code](https://toss.tech/article/frontend-declarative-code), code is likened to writing.

### Abstraction in Writing

There is a sentence that says "Take 10 steps to the left." Here,

- "Left" is an abstraction of "the direction 90 degrees from the north when facing north", and
- "90 degrees" is an abstraction of "a quarter of a full rotation", and
- The definition of "clockwise" is an abstraction of "the direction the hands of a clock move in the northern hemisphere".

Similarly, words like "10 steps" and "walk" can be expressed more concretely. So, if we were to represent the sentence without abstraction, it might look like this:

> From the direction you are facing, turn 90 degrees to the left, which is the direction the hands of a clock move in the northern hemisphere, and perform the action of moving your body from one point to another using your legs, which is slower than the fastest way animals move on land, 10 times.

This sentence is difficult to understand exactly when read directly.

### Abstraction in Code

Similarly, in code, if the implementation details are overly exposed, it can be difficult to understand exactly what the code does.
To make it easier to understand, it's necessary to abstract into smaller units, so that you can read it while considering about 6-7 contexts at once.
