export type Tag = 'tools' | 'design' | 'dev' | 'inspo' | 'reading'

export interface Bookmark {
  id: string
  url: string
  domain: string
  title: string
  tag: Tag
  screenshot?: string | null
  createdAt: string
}

export const TECH_MAP: Record<string, { name: string; icon: string; invert: boolean }> = {
  'vercel.com':        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
  'linear.app':        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
  'framer.com':        { name: 'Framer',  icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg',                 invert: true  },
  'loom.com':          { name: 'React',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',    invert: false },
  'raycast.com':       { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
  'refactoringui.com': { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
  'stripe.com':        { name: 'Ruby',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',      invert: false },
  'cosmos.so':         { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
  'usepanda.com':      { name: 'Vue',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',    invert: false },
  'codeium.com':       { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',  invert: true  },
}

export const TAGS: Tag[] = ['tools', 'design', 'dev', 'inspo', 'reading']
