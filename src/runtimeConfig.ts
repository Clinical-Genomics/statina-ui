type RuntimeConfig = Partial<Record<string, string>>

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig
  }
}

export const getRuntimeConfigValue = (key: string, fallback = ''): string => {
  const runtimeValue = window.__RUNTIME_CONFIG__?.[key]
  if (runtimeValue !== undefined && runtimeValue !== '') {
    return runtimeValue
  }

  const buildValue = import.meta.env[key]
  return buildValue !== undefined && buildValue !== '' ? buildValue : fallback
}
