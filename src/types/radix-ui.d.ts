import '@radix-ui/react-accordion';
import '@radix-ui/react-alert-dialog';
import '@radix-ui/react-avatar';
import '@radix-ui/react-checkbox';
import '@radix-ui/react-context-menu';
import '@radix-ui/react-dialog';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-hover-card';
import '@radix-ui/react-label';
import '@radix-ui/react-menubar';
import '@radix-ui/react-navigation-menu';
import '@radix-ui/react-popover';
import '@radix-ui/react-progress';
import '@radix-ui/react-radio-group';
import '@radix-ui/react-scroll-area';
import '@radix-ui/react-select';
import '@radix-ui/react-separator';
import '@radix-ui/react-slider';
import '@radix-ui/react-switch';
import '@radix-ui/react-tabs';
import '@radix-ui/react-toast';
import '@radix-ui/react-toggle';
import '@radix-ui/react-toggle-group';
import '@radix-ui/react-tooltip';
import 'react';

// Extend ForwardRefExoticComponent to include displayName
declare module 'react' {
  interface ForwardRefExoticComponent<P> {
    displayName?: string;
  }
}

// Extend Radix UI components to support className
declare module '@radix-ui/react-toggle' {
  interface ToggleProps {
    className?: string;
  }
}

declare module '@radix-ui/react-toast' {
  interface ToastProps {
    className?: string;
  }
  
  interface ToastViewportProps {
    className?: string;
  }
  
  interface ToastActionProps {
    className?: string;
  }
  
  interface ToastCloseProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  interface ToastTitleProps {
    className?: string;
  }
  
  interface ToastDescriptionProps {
    className?: string;
  }
}

declare module '@radix-ui/react-tabs' {
  interface TabsListProps {
    className?: string;
  }
  
  interface TabsTriggerProps {
    className?: string;
  }
  
  interface TabsContentProps {
    className?: string;
  }
}

declare module '@radix-ui/react-tooltip' {
  interface TooltipContentProps {
    className?: string;
  }
}

declare module '@radix-ui/react-toggle-group' {
  interface ToggleGroupSingleProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  interface ToggleGroupMultipleProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  interface ToggleGroupItemProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-accordion' {
  interface AccordionProps {
    className?: string;
  }
  interface AccordionItemProps {
    className?: string;
  }
  interface AccordionTriggerProps {
    className?: string;
  }
  interface AccordionContentProps {
    className?: string;
  }
}

declare module '@radix-ui/react-alert-dialog' {
  interface AlertDialogProps {
    className?: string;
  }
  interface AlertDialogTriggerProps {
    className?: string;
  }
  interface AlertDialogContentProps {
    className?: string;
  }
  interface AlertDialogHeaderProps {
    className?: string;
  }
  interface AlertDialogFooterProps {
    className?: string;
  }
  interface AlertDialogTitleProps {
    className?: string;
  }
  interface AlertDialogDescriptionProps {
    className?: string;
  }
  interface AlertDialogCancelProps {
    className?: string;
  }
  interface AlertDialogActionProps {
    className?: string;
  }
}

declare module '@radix-ui/react-avatar' {
  interface AvatarProps {
    className?: string;
  }
  interface AvatarImageProps {
    className?: string;
  }
  interface AvatarFallbackProps {
    className?: string;
  }
}

declare module '@radix-ui/react-dialog' {
  interface DialogProps {
    className?: string;
  }
  interface DialogTriggerProps {
    className?: string;
  }
  interface DialogContentProps {
    className?: string;
  }
  interface DialogHeaderProps {
    className?: string;
  }
  interface DialogFooterProps {
    className?: string;
  }
  interface DialogTitleProps {
    className?: string;
  }
  interface DialogDescriptionProps {
    className?: string;
  }
  interface DialogCloseProps {
    className?: string;
  }
}

declare module '@radix-ui/react-dropdown-menu' {
  interface DropdownMenuProps {
    className?: string;
  }
  interface DropdownMenuTriggerProps {
    className?: string;
  }
  interface DropdownMenuContentProps {
    className?: string;
  }
  interface DropdownMenuItemProps {
    className?: string;
  }
  interface DropdownMenuCheckboxItemProps {
    className?: string;
  }
  interface DropdownMenuRadioItemProps {
    className?: string;
  }
  interface DropdownMenuLabelProps {
    className?: string;
  }
  interface DropdownMenuSeparatorProps {
    className?: string;
  }
  interface DropdownMenuSubProps {
    className?: string;
  }
  interface DropdownMenuSubTriggerProps {
    className?: string;
  }
  interface DropdownMenuSubContentProps {
    className?: string;
  }
  interface DropdownMenuRadioGroupProps {
    className?: string;
  }
}

declare module '@radix-ui/react-slider' {
  interface SliderProps {
    className?: string;
    children?: React.ReactNode;
  }
  interface SliderTrackProps {
    className?: string;
    children?: React.ReactNode;
  }
  interface SliderRangeProps {
    className?: string;
  }
  interface SliderThumbProps {
    className?: string;
  }
}

declare module '@radix-ui/react-switch' {
  interface SwitchProps {
    className?: string;
    children?: React.ReactNode;
  }
  interface SwitchThumbProps {
    className?: string;
  }
}

declare module '@radix-ui/react-menubar' {
  interface MenubarProps {
    className?: string;
  }
  interface MenubarMenuProps {
    className?: string;
  }
  interface MenubarTriggerProps {
    className?: string;
  }
  interface MenubarContentProps {
    className?: string;
  }
  interface MenubarItemProps {
    className?: string;
  }
  interface MenubarCheckboxItemProps {
    className?: string;
  }
  interface MenubarRadioItemProps {
    className?: string;
  }
  interface MenubarLabelProps {
    className?: string;
  }
  interface MenubarSeparatorProps {
    className?: string;
  }
  interface MenubarSubProps {
    className?: string;
  }
  interface MenubarSubTriggerProps {
    className?: string;
  }
  interface MenubarSubContentProps {
    className?: string;
  }
  interface MenubarRadioGroupProps {
    className?: string;
  }
}

declare module '@radix-ui/react-popover' {
  interface PopoverProps {
    className?: string;
  }
  interface PopoverTriggerProps {
    className?: string;
  }
  interface PopoverContentProps {
    className?: string;
  }
}

declare module '@radix-ui/react-context-menu' {
  interface ContextMenuProps {
    className?: string;
  }
  interface ContextMenuTriggerProps {
    className?: string;
  }
  interface ContextMenuContentProps {
    className?: string;
  }
  interface ContextMenuItemProps {
    className?: string;
  }
  interface ContextMenuCheckboxItemProps {
    className?: string;
  }
  interface ContextMenuRadioItemProps {
    className?: string;
  }
  interface ContextMenuLabelProps {
    className?: string;
  }
  interface ContextMenuSeparatorProps {
    className?: string;
  }
  interface ContextMenuSubProps {
    className?: string;
  }
  interface ContextMenuSubTriggerProps {
    className?: string;
  }
  interface ContextMenuSubContentProps {
    className?: string;
  }
  interface ContextMenuRadioGroupProps {
    className?: string;
  }
}

declare module '@radix-ui/react-hover-card' {
  interface HoverCardProps {
    className?: string;
  }
  interface HoverCardTriggerProps {
    className?: string;
  }
  interface HoverCardContentProps {
    className?: string;
  }
}

declare module '@radix-ui/react-scroll-area' {
  export interface ScrollAreaProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface ScrollAreaViewportProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface ScrollAreaScrollbarProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface ScrollAreaThumbProps {
    className?: string;
  }
}

declare module '@radix-ui/react-select' {
  export interface SelectTriggerProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectIconProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectContentProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectViewportProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectLabelProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectItemProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectSeparatorProps {
    className?: string;
  }

  export interface SelectScrollUpButtonProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface SelectScrollDownButtonProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-separator' {
  export interface SeparatorProps {
    className?: string;
  }
}

declare module '@radix-ui/react-radio-group' {
  export interface RadioGroupProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface RadioGroupItemProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface RadioGroupIndicatorProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-dialog' {
  export interface DialogProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface DialogTriggerProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface DialogContentProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface DialogCloseProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface DialogOverlayProps {
    className?: string;
  }
}

// Add similar declarations for other Radix UI components as needed 