type RuntimeConfig = Partial<Record<string, string>>

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig
  }
}

export const getRuntimeConfigValue = (key: string, fallback = ''): string => {
  const runtimeValue = typeof window === 'undefined' ? undefined : window.__RUNTIME_CONFIG__?.[key]
  if (runtimeValue !== undefined && runtimeValue !== '') {
    return runtimeValue
  }

  const buildValue = import.meta.env[key]
  return buildValue !== undefined && buildValue !== '' ? buildValue : fallback
}

export const getRequiredRuntimeConfigValue = (key: string): string => {
  const value = getRuntimeConfigValue(key)
  if (value === '' && import.meta.env.MODE !== 'test') {
    throw new Error(`Missing required runtime config: ${key}`)
  }

  return value
}

export const validateRuntimeConfig = (keys: string[]) => {
  if (import.meta.env.MODE === 'test') {
    return
  }

  keys.forEach(getRequiredRuntimeConfigValue)
}
