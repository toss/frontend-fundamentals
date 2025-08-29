import React from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { clsx } from "clsx";
import styles from "./AlertDialog.module.css";

// AlertDialog Props
interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Trigger Props
interface AlertDialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

// Content Props
interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

// Title Props
interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

// Description Props
interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

// Footer Props
interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Action Props
interface AlertDialogActionProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// Cancel Props
interface AlertDialogCancelProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// Root Component
export function AlertDialog({
  children,
  open,
  onOpenChange
}: AlertDialogProps) {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixAlertDialog.Root>
  );
}

// Trigger Component
AlertDialog.Trigger = function AlertDialogTrigger({
  children,
  asChild = false,
  className
}: AlertDialogTriggerProps) {
  return (
    <RadixAlertDialog.Trigger asChild={asChild} className={className}>
      {children}
    </RadixAlertDialog.Trigger>
  );
};

// Overlay Component
AlertDialog.Overlay = function AlertDialogOverlay() {
  return <RadixAlertDialog.Overlay className={styles.overlay} />;
};

// Content Component
AlertDialog.Content = function AlertDialogContent({
  children,
  className,
  showCloseButton = false
}: AlertDialogContentProps) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className={styles.overlay} />
      <RadixAlertDialog.Content
        className={clsx(styles.content, className)}
      >
        {showCloseButton && (
          <RadixAlertDialog.Cancel asChild>
            <button className={styles.closeButton} aria-label="Close">
              <X size={16} />
            </button>
          </RadixAlertDialog.Cancel>
        )}
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
};

// Title Component
AlertDialog.Title = function AlertDialogTitle({
  children,
  className
}: AlertDialogTitleProps) {
  return (
    <RadixAlertDialog.Title className={clsx(styles.title, className)}>
      {children}
    </RadixAlertDialog.Title>
  );
};

// Description Component
AlertDialog.Description = function AlertDialogDescription({
  children,
  className
}: AlertDialogDescriptionProps) {
  return (
    <RadixAlertDialog.Description
      className={clsx(styles.description, className)}
    >
      {children}
    </RadixAlertDialog.Description>
  );
};

// Footer Component
AlertDialog.Footer = function AlertDialogFooter({
  children,
  className
}: AlertDialogFooterProps) {
  return <div className={clsx(styles.footer, className)}>{children}</div>;
};

// Action Component (Primary button)
AlertDialog.Action = function AlertDialogAction({
  children,
  asChild = false,
  className,
  onClick,
  disabled = false
}: AlertDialogActionProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (asChild) {
    return (
      <RadixAlertDialog.Action asChild onClick={handleClick}>
        {children}
      </RadixAlertDialog.Action>
    );
  }

  return (
    <RadixAlertDialog.Action asChild>
      <button
        className={clsx(styles.actionButton, className)}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </RadixAlertDialog.Action>
  );
};

// Cancel Component (Secondary button)
AlertDialog.Cancel = function AlertDialogCancel({
  children,
  asChild = false,
  className,
  onClick,
  disabled = false
}: AlertDialogCancelProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (asChild) {
    return (
      <RadixAlertDialog.Cancel asChild onClick={handleClick}>
        {children}
      </RadixAlertDialog.Cancel>
    );
  }

  return (
    <RadixAlertDialog.Cancel asChild>
      <button
        className={clsx(styles.cancelButton, className)}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </RadixAlertDialog.Cancel>
  );
};

// Export types for external use
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps
};
