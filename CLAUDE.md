# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context Priming
Read the CLAUDE.md and other files in docs/* to prime your understanding of the project

## Project Overview
This is a React TypeScript frontend skeleton project for Propel Ventures, designed as a modern web application framework with best practices and standards built in.

## Technology Stack
- **Framework**: React 18+ with TypeScript 5+
- **Build Tool**: Vite (assumed based on modern React setup)
- **Styling**: Tailwind CSS with utility-first approach
- **UI Components**: shadcn/ui component system with Radix UI primitives
- **Icons**: Lucide React icon library
- **State Management**: Context API patterns (Redux Toolkit/Zustand for complex state)
- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint, Prettier, strict TypeScript configuration

## Development Commands
Since no package.json exists yet, these are the standard commands that should be implemented:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Preview production build
npm run preview

# Add shadcn/ui components (example)
npx shadcn@latest add button input card
```

## Architecture Overview

### Project Structure
```
src/
├── app/                 # App-wide setup and providers
├── components/          # Reusable UI components (Atomic Design)
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple combinations
│   ├── organisms/      # Complex components
│   ├── templates/      # Page layouts
│   └── ui/             # shadcn/ui components (auto-generated)
├── features/           # Feature-based modules
├── hooks/              # Global custom hooks
├── lib/                # Third-party configurations and utils (including cn utility)
├── services/           # API services and external integrations
├── store/              # Global state management
├── types/              # Global TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and Tailwind config
```

### Component Architecture
- Follow **Atomic Design** principles for component organization
- Use **functional components** with React hooks exclusively
- Implement **compound components** for complex UI patterns
- Maintain **single responsibility** principle for each component
- **shadcn/ui Integration**: Prefer shadcn/ui components in `components/ui/` for base UI elements
- **Custom Components**: Build complex features by composing shadcn/ui components in molecules/organisms
- **Styling**: Use Tailwind CSS classes with shadcn/ui's design system tokens

### Code Standards
All code must follow the comprehensive standards defined in:
- `docs/coding-strategy.md` - Detailed TypeScript, React, and Tailwind guidelines
- Strict TypeScript configuration with no implicit any
- Component file structure with co-located tests and types
- Performance optimization using React.memo, useMemo, useCallback appropriately

## Development Workflow

### Branching Strategy
Follow the three-branch strategy outlined in `docs/branching-strategy.md`:
- **main**: Production-ready code
- **test**: Pre-production testing and QA
- **dev**: Active development integration

### Feature Development Process
1. Create feature branch from `dev`: `feature/descriptive-name`
2. Follow TypeScript and React best practices
3. Include tests for new functionality
4. Create PR to merge back to `dev`
5. Code review and approval required

### Task Management
- Use `.claude/commands/prime-context.md` to understand the codebase
- Follow the task completion guide in `.claude/commands/complete-task.md`
- Reference `docs/tasks/task.md` for current task requirements

## Key Development Principles

### TypeScript Standards
- Use explicit return types for all functions
- Prefer interfaces over type aliases for object shapes
- Implement discriminated unions for complex state
- Enable strict mode with comprehensive compiler options

### React Patterns
- Use functional components with proper hook organization
- Implement custom hooks for business logic extraction
- Follow the component structure order: state → refs → context → custom hooks → effects → memoized values → callbacks → early returns → render

### Performance Guidelines
- Implement code splitting with React.lazy for routes and heavy components
- Use React.memo for pure components with complex props
- Apply useMemo/useCallback judiciously for expensive computations
- Implement virtualization for long lists

### shadcn/ui Integration Guidelines
- **Component Discovery**: Use the shadcn MCP server to search and explore available components
- **Installation**: Add components via `npx shadcn@latest add [component-name]`
- **Customization**: Modify shadcn/ui components in place within `components/ui/` when needed
- **Composition**: Build complex components by combining multiple shadcn/ui primitives
- **Theming**: Leverage the built-in design system via CSS variables in `globals.css`
- **Icons**: Use Lucide React icons which integrate seamlessly with shadcn/ui
- **Best Practices**: 
  - Import from `@/components/ui/[component]` for shadcn components
  - Use `cn()` utility from `@/lib/utils` for conditional className merging
  - Follow shadcn/ui patterns for component APIs and prop structures

### Accessibility Requirements
- Follow WCAG 2.1 AA standards
- Use semantic HTML with proper ARIA labels
- Implement keyboard navigation for interactive elements
- Maintain focus management in modal components

## Testing Strategy
- **Unit Tests**: Component functionality and hooks
- **Integration Tests**: Feature workflows and API interactions
- **Coverage Requirements**: 80% overall, 90% for utilities, 85% for hooks, 75% for components

## Important Notes
- **Never** create files unless absolutely necessary - always prefer editing existing files
- **Always** run lint and type-check commands before committing
- **Follow** the existing code patterns and conventions found in the codebase
- **Consult** the detailed standards in `docs/coding-strategy.md` for specific implementation patterns