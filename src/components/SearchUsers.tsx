import { Button, Select } from 'antd'
import { Pane } from 'evergreen-ui'
import React, { useState } from 'react'

export default function SearchUsers() {
  const [users, setUsers] = useState<any[]>(['1', '2', '3'])

  const handleSelect = (user: any) => {
    const selectedUsers = [...users, user]
    setUsers(selectedUsers)
  }

  const handleDeselect = (user: any) => {
    const deselectedUserIndex = users.indexOf(user)
    const selectedUsers = users.filter((_user, i) => i !== deselectedUserIndex)
    setUsers(selectedUsers)
  }

  const handleClear = () => {
    setUsers([])
  }

  return (
    <Pane display="flex" flexDirection="column" backgroundColor="white">
      <Select
        mode="multiple"
        placeholder="Find users"
        value={users}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        allowClear
        onClear={handleClear}
      >
        {users?.map((user) => (
          <Select.Option value={user} label={user}>
            {user}
          </Select.Option>
        ))}
      </Select>
    </Pane>
  )
}
