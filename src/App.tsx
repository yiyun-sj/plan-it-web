import { LoginOutlined } from '@ant-design/icons'
import { ApolloProvider } from '@apollo/client'
import { Button, Divider, Input, Layout } from 'antd'
import { client } from './apollo'
import './App.css'
import { FriendsList, HeaderBar, ScheduleTable } from './components'

const { Header, Sider, Content } = Layout

function SignIn() {
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
          <Input placeholder='Enter email'></Input>
          <Input.Password placeholder='Enter password'></Input.Password>
          <Button icon={<LoginOutlined />}>Log In</Button>
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
          <Input placeholder='Enter email'></Input>
          <Input.Password placeholder='Enter password'></Input.Password>
          <Button icon={<LoginOutlined />}>Sign Up</Button>
        </div>
      </Content>
    </Layout>
  )
}

function AppPage() {
  if (!true) return <SignIn />

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
        <HeaderBar isAuthed />
      </Header>
      <Layout>
        <Sider
          width={300}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'whitesmoke',
            padding: 8,
            paddingTop: 20,
          }}
        >
          <FriendsList />
        </Sider>
        <Content
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <ScheduleTable />
        </Content>
      </Layout>
    </Layout>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppPage />
    </ApolloProvider>
  )
}
