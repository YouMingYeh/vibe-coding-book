import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import React from 'react'
import { MDXLayout } from '@/components/mdx/mdx-layout'
import { mdxComponents } from '@/components/mdx/mdx-components'

/**
 * MDX Components Configuration - Main hook for MDX customization
 * 
 * This file combines:
 * - Layout structure (from ./components/mdx-layout.tsx)
 * - Component styling (from ./components/mdx-components.tsx)
 * 
 * This separation allows for:
 * - Better organization of concerns
 * - Easier testing of individual parts
 * - Reusability of components and layouts
 */

// This hook lets us globally customise how markdown elements render.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper with AI 2027 style typography
    wrapper: ({ children }: { children: ReactNode }) => (
      <MDXLayout>
        <article className="max-w-none">
          {children}
        </article>
      </MDXLayout>
    ),
    
    // Spread all the MDX component overrides
    ...mdxComponents,
    
    // Allow for custom component overrides
    ...components,
  }
}