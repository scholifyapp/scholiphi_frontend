import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes properly.
 * @param inputs - Class values to be combined
 * @returns A string of combined and optimized class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
