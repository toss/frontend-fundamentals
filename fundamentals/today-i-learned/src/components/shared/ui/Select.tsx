import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const selectVariants = cva(
  "flex items-center justify-center gap-1.5 rounded-lg border border-black/8 bg-white text-sm font-bold transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 tracking-tight leading-[160%]",
  {
    variants: {
      size: {
        sm: "h-8 pl-3 pr-4 text-xs",
        md: "h-10 pl-[15px] pr-[18px] text-sm",
        lg: "h-12 pl-4 pr-5 text-base"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[120px]"
      }
    },
    defaultVariants: {
      size: "md",
      fullWidth: false
    }
  }
);

export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof selectVariants> {
  value?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      size,
      fullWidth,
      value,
      placeholder = "선택하세요",
      options,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    const displayText = selectedOption?.label || placeholder;

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-select-container]")) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div className="relative" data-select-container>
        <button
          ref={ref}
          type="button"
          className={cn(selectVariants({ size, fullWidth }), className)}
          onClick={handleToggle}
          {...props}
        >
          <span className={cn("truncate text-black/60", !selectedOption && "text-black/60")}>
            {displayText}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform text-black/40",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                    selectedValue === option.value && "bg-gray-100 font-medium"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select, selectVariants };
