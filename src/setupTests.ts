import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
;(globalThis as unknown as { self: Window & typeof globalThis }).self = globalThis as Window &
  typeof globalThis

window.URL.createObjectURL = () => ''

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
HTMLCanvasElement.prototype.getContext = () => ''

globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }
  }
