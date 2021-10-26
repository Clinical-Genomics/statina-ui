import React from 'react'
import { Button, Card, Tag } from 'antd'
import { getUserRole } from '../../services/helpers/helpers'

interface ProfileDropdownProps {
  logout: () => void
  user: any
}

export const ProfileDropdown = ({ logout, user }: ProfileDropdownProps) => {
  return (
    <div>
      <Card>
        <p>
          <Tag color={'blue'}>{getUserRole(user?.scopes)}</Tag>
        </p>
        <p>{user.email}</p>
        <Button type="primary" onClick={() => logout()}>
          Logout
        </Button>
      </Card>
    </div>
  )
}
