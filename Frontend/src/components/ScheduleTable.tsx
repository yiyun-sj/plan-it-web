import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Empty, Input, message, Modal } from 'antd'
import { Moment } from 'moment'
import { useMemo, useState } from 'react'
import { FriendsList } from './FriendsList'

export function ScheduleTable() {
  const [schedules, setSchedules] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [dates, setDates] = useState<[Moment | null, Moment | null] | null>(
    null
  )
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [friends, setFriends] = useState<string[]>([])

  const filteredSchedules = useMemo(() => {
    if (!search) return schedules
    return schedules.filter((schedule) => schedule === search)
  }, [schedules, search])

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <Input
          placeholder='Search schedules'
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.currentTarget.value)
          }
          suffix={<SearchOutlined />}
          allowClear
        />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setIsVisible(true)}
        >
          Add Schedule
        </Button>
      </div>
      {filteredSchedules.length === 0 ? (
        <Empty description='No Schedules Found' />
      ) : (
        filteredSchedules.map(() => <div>hi</div>)
      )}

      <Modal
        title='Create a New Schedule'
        visible={isVisible}
        confirmLoading={confirmLoading}
        onCancel={() => setIsVisible(false)}
        onOk={() => {
          if (!dates || !dates[0] || !dates[1] || friends.length === 0) {
            message.error('Missing field')
            return
          }
          setConfirmLoading(true)

          setConfirmLoading(false)
          setIsVisible(false)
          setDates(null)
          message.success('Created schedule')
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>Dates:</span>
            <DatePicker.RangePicker value={dates} onChange={setDates} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>Participants:</span>
            <FriendsList isMinimal setParentFriends={setFriends} />
          </div>
        </div>
      </Modal>
    </>
  )
}
