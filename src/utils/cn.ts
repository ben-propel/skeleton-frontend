import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge and conditionally apply CSS classes.
 * Combines clsx functionality for clean className handling.
 * 
 * @param inputs - Array of class values that can be strings, objects, arrays, etc.
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}