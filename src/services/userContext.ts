import * as React from 'react'

export interface UserContext {
  initializeToken(token: string): any
  initializeUser(user: string): any
  token: string | null
  user: UserInfoContext | null
}

export interface UserInfoContext {
  added: string
  email: string
  role: string
  username: string
}

export const UserContext = React.createContext<UserContext>({
  initializeUser: (user) => {
    console.log(user)
  },
  initializeToken: (token) => {
    console.log(token)
  },
  user: null,
  token: null,
})
