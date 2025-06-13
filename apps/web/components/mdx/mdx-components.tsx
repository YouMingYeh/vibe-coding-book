import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import React from 'react'
import { Badge } from '@workspace/ui/components/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

/**
 * MDX Components - Pure component definitions for MDX content
 * 
 * This file contains all the styled components used to override
 * default HTML elements in MDX content (headings, paragraphs, etc.)
 * as well as custom components like CalloutAlert.
 * 
 * For layout structure, see ./mdx-layout.tsx
 * For the main useMDXComponents hook, see ../mdx-components.tsx
 */

// Custom components for enhanced MDX experience
export const CalloutAlert = ({ type = 'info', children }: { type?: 'info' | 'warning' | 'success' | 'error', children: ReactNode }) => {
  const variants = {
    info: 'bg-blue-50/50 text-blue-900 dark:bg-blue-950/20 dark:text-blue-100',
    warning: 'bg-amber-50/50 text-amber-900 dark:bg-amber-950/20 dark:text-amber-100',
    success: 'bg-green-50/50 text-green-900 dark:bg-green-950/20 dark:text-green-100',
    error: 'bg-red-50/50 text-red-900 dark:bg-red-950/20 dark:text-red-100'
  }
  
  const icons = {
    info: InfoIcon,
    warning: AlertTriangleIcon,
    success: CheckCircleIcon,
    error: XCircleIcon,
  }
  
  const Icon = icons[type]
  
  return (
    <div className={`my-6 p-4 rounded-lg ${variants[type]}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="text-sm leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  )
}

// MDX component overrides with AI 2027 styling
export const mdxComponents = {
  // AI 2027 style headings - clean and minimal
  h1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-3xl font-normal tracking-tight lg:text-4xl mt-16 first:mt-0 mb-8 leading-tight" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 text-2xl font-normal tracking-tight mt-12 mb-6 leading-tight" {...props}>
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-xl font-normal tracking-tight mt-10 mb-4 leading-tight" {...props}>
      {children}
    </h3>
  ),
  
  h4: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-lg font-normal tracking-tight mt-8 mb-3 leading-tight" {...props}>
      {children}
    </h4>
  ),
  
  // AI 2027 style paragraphs with optimal reading spacing
  p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-8 mb-6 text-base text-foreground/90" {...props}>
      {children}
    </p>
  ),
  
  // Enhanced blockquotes
  blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 pl-6 italic text-muted-foreground bg-muted/30 py-4 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  
  // Enhanced lists
  ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  
  // Enhanced code blocks
  pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre className="overflow-x-auto rounded-lg bg-muted/30 p-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  
  // Enhanced inline code
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code className="relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
      {children}
    </code>
  ),
  
  // Enhanced links
  a: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a 
      href={href}
      className="font-medium text-primary hover:underline hover:underline-offset-4 hover:text-primary/80 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  
  // Enhanced tables
  table: ({ children, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  
  th: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right bg-muted/30" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 [&[align=center]]:text-center [&[align=right]]:text-right bg-muted/10" {...props}>
      {children}
    </td>
  ),
  
  // Enhanced horizontal rule
  hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
    <Separator className="my-8" {...props} />
  ),
  
  // Custom components for MDX
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  CalloutAlert,
} as const
