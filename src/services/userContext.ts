import * as React from 'react'

export interface UserContext {
  email: string | null
  initializeUserContext(token: string): any
  permissions: string[]
  token: string | null
  username: string | null
}

export const UserContext = React.createContext<UserContext>({
  email: null,
  initializeUserContext: (token) => null,
  permissions: [],
  token: null,
  username: null,
})
