import { LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover, Space, Typography } from 'antd'

import { Avatar } from 'antd'
import { useState } from 'react'
import { client } from '../apollo'
import { FriendsList } from './FriendsList'

const { Title } = Typography

export function HeaderBar({
  isAuthed,
  setIsAuthenticated,
}: {
  isAuthed: boolean
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showFriends, setShowFriends] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  return (
    <>
      <Title style={{ margin: 0 }}>Plan-It</Title>
      {isAuthed && (
        <Popover
          visible={showSettings}
          onVisibleChange={setShowSettings}
          content={
            <Space direction='vertical'>
              <Button
                type='text'
                icon={<TeamOutlined />}
                onClick={() => {
                  setShowFriends(true)
                  setShowSettings(false)
                }}
              >
                Friends
              </Button>
              <Button
                type='text'
                icon={<LogoutOutlined />}
                onClick={() => {
                  window.localStorage.removeItem('token')
                  if (setIsAuthenticated) setIsAuthenticated(false)
                  client.clearStore()
                }}
              >
                Sign out
              </Button>
            </Space>
          }
          title=''
          trigger='click'
          placement='bottomRight'
        >
          <Avatar
            size='large'
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
        </Popover>
      )}
      <Drawer
        onClose={() => setShowFriends(false)}
        visible={showFriends}
        title='Friends'
      >
        <FriendsList />
      </Drawer>
    </>
  )
}
