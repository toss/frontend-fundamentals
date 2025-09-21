import * as React from "react";
import { ChevronDown } from "lucide-react";
import { css, cx } from "@styled-system/css";

type SelectSize = "sm" | "md" | "lg";

const selectVariants = {
  base: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: "rgba(0, 0, 0, 0.08)",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "colors",
    letterSpacing: "-0.025em",
    lineHeight: "1.6",
    cursor: "pointer",
    _hover: { backgroundColor: "gray.50" },
    _focus: {
      outline: "2px solid",
      outlineColor: "gray.300",
      outlineOffset: "2px"
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5"
    }
  }),
  sizes: {
    sm: css({ height: "32px", paddingLeft: "12px", paddingRight: "16px", fontSize: "12px" }),
    md: css({ height: "40px", paddingLeft: "15px", paddingRight: "18px", fontSize: "14px" }),
    lg: css({ height: "48px", paddingLeft: "16px", paddingRight: "20px", fontSize: "16px" })
  },
  fullWidth: {
    true: css({ width: "100%" }),
    false: css({ width: "auto", minWidth: "120px" })
  }
};

export interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  size?: SelectSize;
  fullWidth?: boolean;
  value?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      size = "md",
      fullWidth = false,
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
      <div className={css({ position: "relative" })} data-select-container>
        <button
          ref={ref}
          type="button"
          className={cx(
            selectVariants.base,
            size && selectVariants.sizes[size],
            fullWidth && selectVariants.fullWidth.true,
            className
          )}
          onClick={handleToggle}
          {...props}
        >
          <span
            className={cx(
              css({
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "rgba(0, 0, 0, 0.6)"
              }),
              !selectedOption && css({ color: "rgba(0, 0, 0, 0.6)" })
            )}
          >
            {displayText}
          </span>
          <ChevronDown
            className={cx(
              css({
                width: "16px",
                height: "16px",
                flexShrink: "0",
                transition: "transform",
                color: "rgba(0, 0, 0, 0.4)"
              }),
              isOpen && css({ transform: "rotate(180deg)" })
            )}
          />
        </button>

        {isOpen && (
          <div className={css({
            position: "absolute",
            top: "full",
            left: "0",
            right: "0",
            zIndex: "50",
            marginTop: "4px",
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "gray.200",
            backgroundColor: "white",
            boxShadow: "lg"
          })}>
            <div className={css({
              maxHeight: "240px",
              overflowY: "auto",
              paddingY: "4px"
            })}>
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cx(
                    css({
                      width: "full",
                      paddingX: "12px",
                      paddingY: "8px",
                      textAlign: "left",
                      fontSize: "14px",
                      transition: "colors",
                      _hover: { backgroundColor: "gray.50" }
                    }),
                    selectedValue === option.value && css({
                      backgroundColor: "gray.100",
                      fontWeight: "500"
                    })
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
