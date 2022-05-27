import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Image,
  LogOutIcon,
  Pane,
  Popover,
  useTheme,
} from 'evergreen-ui'
import logo from '../logo.png'
import { getAuth } from 'firebase/auth'

export default function HeaderBar(props: {
  handleShowUserDetails: VoidFunction
}) {
  const { handleShowUserDetails } = props
  const auth = getAuth()

  const user = auth.currentUser
  const theme = useTheme()

  return (
    <Pane
      display="flex"
      justifyContent={user ? 'space-between' : 'center'}
      alignItems="center"
      width="100%"
      height="100%"
      paddingX={16}
    >
      <Image src={logo} width={40} />
      {user && (
        <Button
          width={40}
          height={40}
          borderRadius={20}
          onClick={handleShowUserDetails}
        >
          <Avatar size={40} />
        </Button>
      )}
    </Pane>
  )
}
