import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { deleteUser, getUsers } from '../../services/StatinaApi'
import { Button, Col, Dropdown, Input, Menu, Row, Table, Typography, Popconfirm } from 'antd'
import { escapeRegExp, SuccessNotification } from 'services/helpers/helpers'
import { Link } from 'react-router-dom'
import { DeleteTwoTone } from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import { User } from '../../services/interfaces'

export const UsersTable = () => {
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    getUsers(userContext).then((users) => {
      setUsers(users?.documents)
    })
  }, [])

  const confirmDeleteUser = (username: string) => {
    deleteUser(username, userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: `${username} deleted`,
      })
      getUsers(userContext).then((users) => {
        setUsers(users?.documents)
      })
    })
  }

  const columns: any = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (batch_id: any) => <Link to={`/users/${batch_id}`}>{batch_id}</Link>,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registered',
      dataIndex: 'added',
      key: 'added',
    },
    {
      title: 'Delete User',
      key: 'delete_user',
      render: ({ username }: User) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => confirmDeleteUser(username)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone style={{ fontSize: '20px' }} />
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <Title>Users</Title>
      <Table columns={columns} dataSource={users} rowKey="username" />
    </>
  )
}
