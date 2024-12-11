# Allowing Duplicate Code

<div style="margin-top: 16px">
<Badge type="info" text="Coupling" />
</div>

As developers, we often combine duplicate code from different pages or components into a single hook or component. This helps keep related code together, making it easier to update everything at once.

However, this can also create problems. If the shared hook or component is changed, it might affect many places, making updates harder.

At first, the code may seem similar, so we combine it. But later, different pages might need unique features, and the shared code can become too complex. Also, every time we change the shared code, we have to carefully test everything that uses it, which takes extra time and effort.

## 📝 Code Example

Here’s an example of a hook. It takes inspection info, opens a bottom sheet if the system is under inspection, logs user consent for notifications, and closes the current screen.

```typescript
export const useOpenMaintenanceBottomSheet = () => {
  const maintenanceBottomSheet = useMaintenanceBottomSheet();
  const logger = useLogger();

  return async (maintainingInfo: TelecomMaintenanceInfo) => {
    logger.log('점검 바텀시트 열림');
    const result = await maintenanceBottomSheet.open(maintainingInfo);
    if (result) {
      logger.log('점검 바텀시트 알림받기 클릭');
    }
    closeView();
  };
};
```

This code was turned into a common hook because it was used repeatedly across multiple pages.

## 👃 Smell the Code

### Coupling

This hook was created to centralize logic repeated on multiple pages. However, we need to consider the possibilities of future changes to the code:

- What if the value logged differs on each page?
- What if some pages don’t need to close the screen after dismissing the inspection bottom sheet?
- What if the text or images shown in the bottom sheet need to be different?

To handle such changes, this hook would need to accept many complex arguments. Additionally, whenever the hook is updated, all the pages using it would need to be tested to ensure they still work correctly.

## ✏️ Work on Improving

Allowing some code duplication may be a better approach, even if it looks repetitive.

Collaborate with your teammates to clearly understand how the inspection bottom sheet should work. If the logged values are the same across pages, the bottom sheet’s behavior is consistent, and the appearance doesn’t vary (and this is unlikely to change in the future), then centralizing the logic into a common hook can improve code cohesion.

However, if there’s a chance the behavior will differ across pages, it’s better to allow code duplication instead of centralizing it.
