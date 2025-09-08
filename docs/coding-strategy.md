# Coding Standards

## Table of Contents
1. [TypeScript Standards](#typescript-standards)
2. [React Conventions](#react-conventions)
3. [Component Architecture](#component-architecture)
4. [Tailwind CSS Guidelines](#tailwind-css-guidelines)
5. [File and Folder Structure](#file-and-folder-structure)
6. [Naming Conventions](#naming-conventions)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Testing Standards](#testing-standards)
10. [Performance Guidelines](#performance-guidelines)
11. [Accessibility Standards](#accessibility-standards)
12. [Documentation](#documentation)

---

## TypeScript Standards

### General Rules
```typescript
// ✅ GOOD: Use explicit types
interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ❌ BAD: Avoid implicit any
const processData = (data) => { // implicitly 'any'
  return data.map(item => item.value);
};
```

### Type Definitions
- **Always** use explicit return types for functions
- **Never** use `any` unless absolutely necessary (use `unknown` instead)
- **Prefer** interfaces over type aliases for object shapes
- **Use** discriminated unions for complex state

```typescript
// Discriminated union example
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

### Strict Mode Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## React Conventions

### Component Structure
```typescript
// Standard functional component template
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/utils/cn';
import type { ComponentProps } from './types';

/**
 * Component description
 * @param props - Component properties
 */
export const ComponentName: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 'default',
  children,
  ...rest
}) => {
  // 1. State declarations
  const [state, setState] = useState<string>('');
  
  // 2. Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3. Context/Redux hooks
  const { user } = useAuth();
  
  // 4. Custom hooks
  const { data, loading } = useCustomHook();
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, [dependency]);
  
  // 6. Memoized values
  const computedValue = useMemo(() => {
    return expensiveComputation(prop1);
  }, [prop1]);
  
  // 7. Callbacks
  const handleClick = useCallback((event: React.MouseEvent) => {
    // Handler logic
  }, [dependency]);
  
  // 8. Early returns
  if (loading) return <LoadingSpinner />;
  if (!data) return null;
  
  // 9. Main render
  return (
    <div ref={containerRef} className={cn('base-styles', className)} {...rest}>
      {children}
    </div>
  );
};

ComponentName.displayName = 'ComponentName';
```

### Hooks Rules
```typescript
// ✅ GOOD: Custom hook with proper naming
export const useUserData = (userId: string) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setData).finally(() => setLoading(false));
  }, [userId]);
  
  return { data, loading };
};

// ❌ BAD: Hook called conditionally
if (condition) {
  useEffect(() => {}, []); // Never do this!
}
```

### Props and State
- Use destructuring for props
- Provide default values for optional props
- Keep state as local as possible
- Lift state only when necessary

---

## Component Architecture

### Atomic Design Structure
```
components/
├── atoms/          # Basic building blocks
│   ├── Button/
│   ├── Input/
│   └── Label/
├── molecules/      # Simple combinations
│   ├── FormField/
│   └── SearchBar/
├── organisms/      # Complex components
│   ├── Header/
│   └── UserProfile/
├── templates/      # Page layouts
│   └── DashboardLayout/
└── pages/          # Full pages
    └── Dashboard/
```

### Component File Structure
```
ComponentName/
├── index.ts              # Public exports
├── ComponentName.tsx     # Main component
├── ComponentName.test.tsx # Tests
├── ComponentName.stories.tsx # Storybook
├── types.ts             # TypeScript types
├── hooks.ts             # Component-specific hooks
├── utils.ts             # Helper functions
└── styles.module.css    # CSS modules (if needed)
```

---

## Tailwind CSS Guidelines

### Class Organization
```tsx
// ✅ GOOD: Organized by category
<div className={cn(
  // Layout
  "flex flex-col gap-4",
  // Spacing
  "p-6 mx-auto",
  // Sizing
  "w-full max-w-4xl",
  // Typography
  "text-base font-medium",
  // Colors
  "bg-white text-gray-900",
  // Borders
  "border border-gray-200 rounded-lg",
  // Effects
  "shadow-sm",
  // Transitions
  "transition-all duration-200",
  // States
  "hover:shadow-md hover:border-gray-300",
  // Responsive
  "sm:flex-row md:p-8",
  // Conditional
  isActive && "bg-blue-50 border-blue-500"
)} />
```

### Custom Utilities
```css
/* styles/globals.css */
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

### Component Variants with CVA
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // Additional props
}
```

---

## File and Folder Structure

### Project Organization
```
src/
├── app/                 # App-wide setup
│   ├── providers/      # Context providers
│   └── routes/         # Route definitions
├── components/         # Reusable components
├── features/          # Feature modules
│   └── auth/
│       ├── api/       # API calls
│       ├── components/
│       ├── hooks/
│       ├── store/     # Feature state
│       └── types/
├── hooks/             # Global hooks
├── lib/               # Third-party configurations
├── services/          # API services
├── store/             # Global state
├── types/             # Global types
├── utils/             # Utilities
└── styles/            # Global styles
```

---

## Naming Conventions

### Files and Folders
```
✅ GOOD:
components/UserProfile/UserProfile.tsx
hooks/useDebounce.ts
utils/formatCurrency.ts
types/user.types.ts
services/api.service.ts

❌ BAD:
components/user_profile/user-profile.tsx
hooks/UseDebounce.ts
utils/FormatCurrency.ts
```

### Variables and Functions
```typescript
// Components: PascalCase
export const UserProfile: React.FC = () => {};

// Functions: camelCase
export const calculateTotal = (items: Item[]): number => {};

// Constants: UPPER_SNAKE_CASE
export const MAX_RETRY_ATTEMPTS = 3;

// Enums: PascalCase with PascalCase members
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// Types/Interfaces: PascalCase
interface UserData {
  firstName: string;
  lastName: string;
}

// Boolean variables: is/has/should prefix
const isLoading = true;
const hasError = false;
const shouldUpdate = true;
```

---

## State Management

### Context API Pattern
```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Redux Toolkit Pattern
```typescript
// store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string) => {
    const response = await api.getUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});
```

---

## API Integration

### Service Layer Pattern
```typescript
// services/api/base.service.ts
export class BaseApiService {
  protected baseURL = import.meta.env.VITE_API_URL;
  
  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }
    
    return response.json();
  }
}

// services/api/user.service.ts
export class UserService extends BaseApiService {
  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }
  
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}
```

### React Query Pattern
```typescript
// hooks/queries/useUser.ts
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    }
  });
};
```

---

## Testing Standards

### Component Testing
```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    title: 'Test Title',
    onAction: vi.fn()
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should render with required props', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('should handle user interaction', async () => {
    render(<ComponentName {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(defaultProps.onAction).toHaveBeenCalledTimes(1);
    });
  });
  
  it('should match snapshot', () => {
    const { container } = render(<ComponentName {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
```

### Hook Testing
```typescript
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### Coverage Requirements
- Minimum 80% overall coverage
- 90% coverage for utilities
- 85% coverage for hooks
- 75% coverage for components

---

## Performance Guidelines

### Code Splitting
```typescript
// Lazy load routes
const Dashboard = lazy(() => import('@/pages/Dashboard'));

// Lazy load heavy components
const ChartComponent = lazy(() => 
  import('@/components/ChartComponent')
);
```

### Memoization
```typescript
// ✅ GOOD: Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ GOOD: Memoize callbacks passed to children
const handleClick = useCallback((id: string) => {
  dispatch(selectItem(id));
}, [dispatch]);

// ❌ BAD: Over-memoization
const simpleValue = useMemo(() => {
  return prop1 + prop2; // Too simple to memoize
}, [prop1, prop2]);
```

### List Optimization
```typescript
// ✅ GOOD: Use keys properly
{items.map(item => (
  <ListItem key={item.id} {...item} />
))}

// ✅ GOOD: Virtualize long lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {Row}
</FixedSizeList>
```

---

## Accessibility Standards

### ARIA and Semantic HTML
```tsx
// ✅ GOOD: Semantic HTML with proper ARIA
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <a href="/home" aria-current="page">Home</a>
    </li>
  </ul>
</nav>

<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClose}
>
  <XIcon aria-hidden="true" />
</button>

// ❌ BAD: Div soup with no semantics
<div onClick={handleClick}>Click me</div>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleSelect();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      focusNext();
      break;
    case 'ArrowUp':
      focusPrevious();
      break;
  }
};
```

### Focus Management
```typescript
// Trap focus in modal
useEffect(() => {
  if (isOpen) {
    const previousFocus = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    
    return () => {
      previousFocus?.focus();
    };
  }
}, [isOpen]);
```

---

## Documentation

### Component Documentation
```typescript
/**
 * UserProfile component displays user information and actions
 * 
 * @component
 * @example
 * ```tsx
 * <UserProfile
 *   user={userData}
 *   onEdit={handleEdit}
 *   isEditable
 * />
 * ```
 */
interface UserProfileProps {
  /** User data object */
  user: User;
  /** Callback fired when edit button is clicked */
  onEdit?: (user: User) => void;
  /** Whether the profile can be edited */
  isEditable?: boolean;
}
```
