import React, { useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './constants/firebaseConstants'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Pane, Text, useTheme } from 'evergreen-ui'
import HeaderBar from './components/HeaderBar'
import SignIn from './components/SignIn'
import SearchUsers from './components/SearchUsers'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import UserDetails from './components/UserDetails'

initializeApp(firebaseConfig)

export default function App() {
  const auth = getAuth()
  const theme = useTheme()
  const [user] = useAuthState(auth)

  const [showUserDetails, setShowUserDetails] = useState(false)

  const handleShowUserDetails = () => {
    setShowUserDetails(true)
  }

  const handleCloseUserDetails = () => {
    setShowUserDetails(false)
  }

  return (
    <Pane>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: theme.colors.green400, padding: 0 }}>
          <HeaderBar handleShowUserDetails={handleShowUserDetails} />
        </Header>
        {user ? (
          <Layout>
            <Sider
              width="25%"
              style={{ backgroundColor: theme.colors.green200 }}
            >
              <SearchUsers />
            </Sider>
            <Content
              style={{ backgroundColor: theme.colors.green100 }}
            ></Content>
          </Layout>
        ) : (
          <Content>
            <SignIn />
          </Content>
        )}
      </Layout>
      <UserDetails
        handleCloseUserDetails={handleCloseUserDetails}
        isShown={showUserDetails}
      />
    </Pane>
  )
}
