import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Popover, Tooltip, Typography } from 'antd'

import { Avatar } from 'antd'
import { client } from '../apollo'

const { Title } = Typography

export function HeaderBar({
  isAuthed,
  setIsAuthenticated,
}: {
  isAuthed: boolean
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <>
      <Title style={{ margin: 0 }}>Plan-It</Title>
      {isAuthed && (
        <Popover
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Tooltip title='Sign out'>
                  <Button
                    type='text'
                    icon={<LogoutOutlined />}
                    onClick={() => {
                      window.localStorage.removeItem('token')
                      if (setIsAuthenticated) setIsAuthenticated(false)
                      client.clearStore()
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          }
          title='Username'
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
    </>
  )
}
