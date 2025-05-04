import { vi } from "vitest";

export const $api = {
  post: vi.fn(() => Promise.resolve({ data: {} })),
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

