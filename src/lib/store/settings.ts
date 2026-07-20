import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApiKeyStore {
  apiKeys: Record<string, string>
  setApiKey: (provider: string, key: string) => void
  removeApiKey: (provider: string) => void
  getApiKey: (provider: string) => string | undefined
  getAllKeys: () => Record<string, string>
}

export const useSettingsStore = create<ApiKeyStore>()(
  persist(
    (set, get) => ({
      apiKeys: {},
      setApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        })),
      removeApiKey: (provider) =>
        set((state) => {
          const newKeys = { ...state.apiKeys }
          delete newKeys[provider]
          return { apiKeys: newKeys }
        }),
      getApiKey: (provider) => get().apiKeys[provider],
      getAllKeys: () => get().apiKeys,
    }),
    {
      name: 'onchain-autopsy-api-keys', // unique name
      // Note: in a real production app with sensitive keys, 
      // you might want to use a more secure storage mechanism 
      // or at least warn the user they are stored in localStorage.
    }
  )
)
