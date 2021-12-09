import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { deleteUser, getUsers, putUserRole } from '../../services/StatinaApi'
import { Col, Row, Table, Popconfirm, Select, Typography } from 'antd'
import { escapeRegExp, SuccessNotification, userRoles } from 'services/helpers/helpers'
import { DeleteTwoTone } from '@ant-design/icons'
import { User } from '../../services/interfaces'
import Search from 'antd/lib/input/Search'

export const UsersTable = () => {
  const userContext = useContext(UserContext)
  const [users, setUsers] = useState<User[]>()
  const [pageCount, setPageCount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { Option } = Select
  const { Title } = Typography

  useEffect(() => {
    getUsers(userContext, 10, 0, searchValue).then((users) => {
      setUsers(users?.documents), setPageCount(users?.document_count)
    })
  }, [])

  const onSearch = (searchInput) => {
    const escapeInput = escapeRegExp(searchInput)
    setSearchValue(escapeInput)
    setCurrentPage(1)
    getUsers(userContext, 0, 0, escapeInput).then((users) => {
      setUsers(users?.documents), setPageCount(users?.document_count)
    })
  }

  const onChange = (data) => {
    getUsers(userContext, data.pageSize, data.current, searchValue).then((users) => {
      setUsers(users?.documents), setPageCount(users?.document_count)
      setCurrentPage(data.current)
    })
  }

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`
  }

  const setUserRole = (username, role) => {
    putUserRole(username, role, userContext).then(() => {
      getUsers(userContext, 10, currentPage, searchValue).then((users) => {
        SuccessNotification({
          type: 'success',
          message: `${username} updated to ${role}`,
        })
        setUsers(users?.documents), setPageCount(users?.document_count)
      })
    })
  }

  const confirmDeleteUser = (username: string) => {
    deleteUser(username, userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: `${username} deleted`,
      })
      getUsers(userContext, 10, 0, searchValue).then((users) => {
        setUsers(users?.documents)
      })
    })
  }

  const columns: any = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role, user) => (
        <Select
          defaultValue={role || 'N/A'}
          style={{ width: 120 }}
          onChange={(value) => setUserRole(user?.username, value)}
        >
          {Object.keys(userRoles).map((role) => (
            <Option value={role} key={role}>
              {role}
            </Option>
          ))}
        </Select>
      ),
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
      render: (date) => new Date(date)?.toISOString()?.split('T')[0],
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
      <Row justify="space-between" style={{ paddingBottom: 20 }}>
        <Col span={8}>
          <Search placeholder="Search users" onSearch={onSearch} allowClear />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="username"
        onChange={onChange}
        pagination={{
          total: pageCount,
          showTotal: showTotal,
          current: currentPage,
        }}
      />
    </>
  )
}
