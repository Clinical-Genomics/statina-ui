import * as React from 'react'

export const UserContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initializeUser: (token) => {},
  user: null,
  token: { type: null, token: null },
})
