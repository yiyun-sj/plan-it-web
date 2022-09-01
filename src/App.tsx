import { LoginOutlined } from '@ant-design/icons'
import { ApolloProvider, useMutation } from '@apollo/client'
import { Button, Divider, Input, Layout, message } from 'antd'
import { useEffect, useState } from 'react'
import { client } from './apollo'
import './App.css'
import { HeaderBar, PlanTable, ScheduleTable } from './components'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from './constants'

const { Header, Sider, Content } = Layout

function SignIn({
  setIsAuthenticated,
}: {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpName, setSignUpName] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [setIsAuthenticated])

  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP_MUTATION)
  const [signIn, { loading: signInLoading }] = useMutation(SIGN_IN_MUTATION)

  const onConfirmSignIn = () => {
    if (!signInEmail || !signInPassword) {
      message.error('Required fields not filled')
      return
    }
    signIn({
      variables: { email: signInEmail, password: signInPassword },
    })
      .then((res) => {
        window.localStorage.setItem('token', res.data.signIn.token)
        setIsAuthenticated(true)
        message.success('Sign in success')
      })
      .catch((error) => {
        console.error('Sign in error', error)
        message.error('Error occurred during sign in')
      })
  }
  const onConfirmSignUp = () => {
    if (!signUpEmail || !signUpPassword || !signUpName) {
      message.error('Required fields not filled')
      return
    }
    signUp({
      variables: {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      },
    })
      .then((res) => {
        window.localStorage.setItem('token', res.data.signUp.token)
        setIsAuthenticated(true)
        message.success('Sign up success')
      })
      .catch((error) => {
        console.error('Sign up error', error)
        message.error('Error occurred during sign up')
      })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <HeaderBar isAuthed={false} />
      </Header>

      <Content
        style={{
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <h2>Log In</h2>
          <Input
            placeholder='Enter email'
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.currentTarget.value)}
          />
          <Input.Password
            placeholder='Enter password'
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.currentTarget.value)}
          />
          <Button
            icon={<LoginOutlined />}
            loading={signInLoading}
            onClick={onConfirmSignIn}
          >
            Log In
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 400,
            alignItems: 'center',
          }}
        >
          <Divider type='vertical' style={{ flex: 1 }} />
          <span>or</span>
          <Divider type='vertical' style={{ flex: 1 }} />
        </div>
        <div
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <h2>Sign Up</h2>
          <Input
            placeholder='Enter name'
            value={signUpName}
            onChange={(e) => setSignUpName(e.currentTarget.value)}
          />
          <Input
            placeholder='Enter email'
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.currentTarget.value)}
          />
          <Input.Password
            placeholder='Enter password'
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.currentTarget.value)}
          />
          <Button
            icon={<LoginOutlined />}
            loading={signUpLoading}
            onClick={onConfirmSignUp}
          >
            Sign Up
          </Button>
        </div>
      </Content>
    </Layout>
  )
}

function AppPage({
  setIsAuthenticated,
}: {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <HeaderBar isAuthed setIsAuthenticated={setIsAuthenticated} />
      </Header>
      <Layout>
        <Sider
          width='40%'
          style={{
            backgroundColor: 'whitesmoke',
            padding: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <ScheduleTable />
          </div>
        </Sider>
        <Content
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <PlanTable />
        </Content>
      </Layout>
    </Layout>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <ApolloProvider client={client}>
      {isAuthenticated ? (
        <AppPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <SignIn setIsAuthenticated={setIsAuthenticated} />
      )}
    </ApolloProvider>
  )
}
