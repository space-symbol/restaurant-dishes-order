import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vite.config.ts',
    test: {
      environment: 'jsdom',
      include: ['**/*.test.ts'],
    }
  },
])
