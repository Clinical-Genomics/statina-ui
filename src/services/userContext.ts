import * as React from 'react'

export interface UserContext {
  initializeUser(token: string): any
  token: string | null
  user: string | null
}

export const UserContext = React.createContext<UserContext>({
  initializeUser: (token) => {
    console.log(token)
  },
  user: null,
  token: null,
})
