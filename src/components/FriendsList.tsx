import { CloseCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Divider,
  Empty,
  message,
} from 'antd'
import { useEffect, useState } from 'react'
import {
  ADD_FRIEND_MUTATION,
  DELETE_FRIEND_MUTATION,
  MY_FRIENDS,
  MY_USERS,
} from '../constants'
import { Friend } from '../types'

export function FriendsList({
  isMinimal,
  setParentFriends,
}: {
  isMinimal?: boolean
  setParentFriends?: React.Dispatch<React.SetStateAction<Friend[]>>
}) {
  const [input, setInput] = useState('')
  const [friends, setFriends] = useState<Friend[]>([])
  const [users, setUsers] = useState<Friend[]>([])

  // Queries
  const myUsers = useQuery(MY_USERS)
  useEffect(() => {
    const { error, data } = myUsers
    if (error) {
      message.error('Error fetching users, ' + error.message)
    }
    if (data) {
      setUsers(data.getUsers)
    }
  }, [myUsers])
  const myFriends = useQuery(MY_FRIENDS)
  useEffect(() => {
    const { error, data } = myFriends
    if (error) {
      message.error('Error fetching friends, ' + error.message)
    }
    if (data) {
      setFriends(data.myFriends)
      if (setParentFriends) setParentFriends(data.myFriends)
    }
  }, [myFriends, setParentFriends])

  // Mutations
  const [addFriend, { error: addFriendError, reset: addFriendReset }] =
    useMutation(ADD_FRIEND_MUTATION, {
      refetchQueries: [{ query: MY_FRIENDS }, 'MyFriends'],
    })
  useEffect(() => {
    if (addFriendError) {
      message.error('Error adding friends, ' + addFriendError.message)
      addFriendReset()
    }
  })
  const [deleteFriend, { error: delFriendError, reset: delFriendReset }] =
    useMutation(DELETE_FRIEND_MUTATION, {
      refetchQueries: [{ query: MY_FRIENDS }, 'MyFriends'],
    })
  useEffect(() => {
    if (delFriendError) {
      message.error('Error adding friends, ' + delFriendError.message)
      delFriendReset()
    }
  })

  return (
    <>
      <AutoComplete
        placeholder='Add Friend Here'
        style={{ width: '100%' }}
        value={input}
        onChange={setInput}
        options={friends.map((friend) => ({
          label: friend.name,
          value: friend.id,
        }))}
        onSelect={(value: string) =>
          addFriend({ variables: { friendId: value } })
        }
      />
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
