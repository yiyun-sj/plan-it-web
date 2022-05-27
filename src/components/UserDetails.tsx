import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import {
  Avatar,
  Button,
  Heading,
  LogOutIcon,
  Pane,
  SideSheet,
  TextInput,
  useTheme,
} from 'evergreen-ui'
import React from 'react'

export default function UserDetails(props: {
  handleCloseUserDetails: VoidFunction
  isShown: boolean
}) {
  const { handleCloseUserDetails, isShown } = props

  const theme = useTheme()

  return (
    <SideSheet isShown={isShown} onCloseComplete={handleCloseUserDetails}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: 'transparent' }}>
          <Pane
            display="flex"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar size={50} />
          </Pane>
        </Header>
        <Content>
          <Heading size={700} width="100%" textAlign="center" padding={16}>
            User Profile
          </Heading>
          <Pane padding={32}>
            <TextInput border="none"></TextInput>
          </Pane>
        </Content>
        <Footer>
          <Pane display="flex" width="100%" justifyContent="center">
            <Button iconAfter={LogOutIcon} size="large">
              Log Out
            </Button>
          </Pane>
        </Footer>
      </Layout>
    </SideSheet>
  )
}
