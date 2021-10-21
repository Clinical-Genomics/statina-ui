import * as React from 'react'

export const UserContext = React.createContext({
  initializeUser: (token) => {
    console.log('add call to get user roles')
  },
  user: null,
  token: { type: null, token: null },
})
