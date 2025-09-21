import { type ClassValue, clsx } from "clsx";
import { cx } from "../../styled-system/css";

export function cn(...inputs: ClassValue[]) {
  return cx(clsx(inputs));
}