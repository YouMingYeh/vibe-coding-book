import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Allow MDX & MD files to be treated as pages, routes or importable modules
// Enhanced with more plugins for better developer experience
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      // Parse frontmatter but don't render it
      remarkFrontmatter,
      // GitHub-flavoured markdown (tables, strikethrough, task-lists …)
      remarkGfm,
    ],
    rehypePlugins: [
      // Add IDs to headings
      rehypeSlug,
      // Add anchor links to headings
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      // Syntax-highlight fenced code blocks using highlight.js themes
      [rehypeHighlight, { detect: true, ignoreMissing: true }],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  // make .md & .mdx files routable & importable
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
