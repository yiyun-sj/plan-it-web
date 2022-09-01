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
  Tooltip,
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
  setSelectedFriends,
}: {
  isMinimal?: boolean
  setSelectedFriends?: React.Dispatch<React.SetStateAction<Friend[]>>
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
    }
  }, [myFriends])

  // Mutations
  const [addFriend, { error: addFriendError, reset: addFriendReset }] =
    useMutation(ADD_FRIEND_MUTATION, {
      refetchQueries: [{ query: MY_FRIENDS }, 'MyFriends'],
    })
  useEffect(() => {
    if (addFriendError) {
      message.error('Error adding friend, ' + addFriendError.message)
      addFriendReset()
    }
  }, [addFriendError, addFriendReset])
  const [deleteFriend, { error: delFriendError, reset: delFriendReset }] =
    useMutation(DELETE_FRIEND_MUTATION, {
      refetchQueries: [{ query: MY_FRIENDS }, 'MyFriends'],
    })
  useEffect(() => {
    if (delFriendError) {
      message.error('Error deleting friend, ' + delFriendError.message)
      delFriendReset()
    }
  }, [delFriendError, delFriendReset])

  const friendIds = friends.map(({ id }) => id)
  const autoCompleteOptions = users
    .filter(({ id }) => !friendIds.includes(id))
    .map(({ name, id }) => ({
      label: name,
      value: id,
    }))

  return (
    <>
      <AutoComplete
        placeholder='Add Friend Here'
        style={{ width: '100%' }}
        value={input}
        onChange={setInput}
        options={autoCompleteOptions}
        onSelect={(value: string) => {
          addFriend({ variables: { friendId: value } })
          setInput('')
        }}
        filterOption={(input, option) => !!option?.value.includes(input)}
      />
      {!isMinimal && <Divider />}
      {!isMinimal && friends.length === 0 && (
        <Empty description='No Friends Found' />
      )}
      {friends.map(({ id, name }) => {
        if (isMinimal)
          return (
            <Badge count={<CloseCircleOutlined />} key={id}>
              <Avatar>{name[0].toUpperCase()}</Avatar>
            </Badge>
          )
        return (
          <div
            key={id}
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
              <Avatar>{name[0].toUpperCase()}</Avatar>
              <span>{name}</span>
            </div>
            <Tooltip title='Remove friend'>
              <Button
                icon={<CloseCircleOutlined />}
                type='text'
                onClick={() => deleteFriend({ variables: { friendId: id } })}
              />
            </Tooltip>
          </div>
        )
      })}
    </>
  )
}
