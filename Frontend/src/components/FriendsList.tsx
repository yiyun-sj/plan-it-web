import { CloseCircleOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Badge, Button, Divider, Empty } from 'antd'
import { useState } from 'react'
import { Friend } from '../types'

export function FriendsList({
  isMinimal,
  setParentFriends,
}: {
  isMinimal?: boolean
  setParentFriends?: React.Dispatch<React.SetStateAction<Friend[]>>
}) {
  const [friends, setFriends] = useState<Friend[]>([])
  return (
    <>
      <AutoComplete
        placeholder='Add Friend Here'
        style={{ width: '100%' }}
      ></AutoComplete>
      {!isMinimal && <Divider />}
      {!isMinimal && friends.length === 0 && (
        <Empty description='No Friends Found' />
      )}
      {friends.map(() => {
        if (isMinimal)
          return (
            <Badge count={<CloseCircleOutlined />}>
              <Avatar />
            </Badge>
          )
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: 8,
              padding: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <Avatar />
              <span>Username</span>
            </div>
            <Button icon={<CloseCircleOutlined />} />
          </div>
        )
      })}
    </>
  )
}
