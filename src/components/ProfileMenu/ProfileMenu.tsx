import React from 'react'
import { Button, Card } from 'antd'
import { UserInfoContext } from '../../services/userContext'

interface ProfileMenuProps {
  logout: () => void
  user: UserInfoContext
}

export const ProfileMenu = ({ logout, user }: ProfileMenuProps) => {
  return (
    <div>
      <Card>
        {user.username}
        {user.email}
      </Card>
      <Button type="primary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  )
}
