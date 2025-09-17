import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component with label, error, and helper text support
 * 
 * @component
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   placeholder="Enter your email" 
 *   error="Invalid email format"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  helperText,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-secondary-700"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'flex h-10 w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-secondary-400',
          'focus-ring focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  )
}

Input.displayName = 'Input'