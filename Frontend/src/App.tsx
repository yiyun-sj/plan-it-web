import { Layout, Skeleton } from 'antd'
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
          <Skeleton active />
        </Sider>
        <Content
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <Skeleton active />
        </Content>
      </Layout>
    </Layout>
  )
}

export default function App() {
  if (false) return <SignIn />

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
