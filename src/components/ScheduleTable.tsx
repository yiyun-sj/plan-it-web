import {
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Empty,
  Input,
  message,
  Modal,
  Popover,
  Space,
  Tag,
  Tooltip,
} from 'antd'
import Color from 'color'
import { useEffect, useMemo, useState } from 'react'
import { BlockPicker } from 'react-color'
import {
  CREATE_SCHEDULE_MUTATION,
  DELETE_SCHEDULE_MUTATION,
  MY_SCHEDULES,
  SET_ACTIVE_MUTATION,
} from '../constants'
import { Schedule } from '../types'

export function ScheduleTable() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#FFFFFF')
  const convertedColor = Color(color)
  const backgroundColor = convertedColor.lightness(92.5).toString()
  const textColor = convertedColor.darken(0.35).toString()
  const [isVisible, setIsVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // Schedules query
  const mySchedules = useQuery(MY_SCHEDULES)
  useEffect(() => {
    const { error, data } = mySchedules
    if (error) {
      message.error('Error fetching schedules, ' + error.message)
    }
    if (data) {
      setSchedules(data.mySchedules)
    }
  }, [mySchedules])

  const [changeActive, { error: changeActiveError, reset: changeActiveReset }] =
    useMutation(SET_ACTIVE_MUTATION, {
      refetchQueries: [{ query: MY_SCHEDULES }, 'MySchedules'],
    })
  useEffect(() => {
    if (changeActiveError) {
      message.error('Error changing status, ' + changeActiveError.message)
      changeActiveReset()
    }
  }, [changeActiveError, changeActiveReset])

  const [
    createSchedule,
    { error: createScheduleError, reset: createScheduleReset },
  ] = useMutation(CREATE_SCHEDULE_MUTATION, {
    refetchQueries: [{ query: MY_SCHEDULES }, 'MySchedules'],
  })
  useEffect(() => {
    if (createScheduleError) {
      message.error('Error creating schedule, ' + createScheduleError.message)
      setConfirmLoading(false)
      createScheduleReset()
    }
  }, [createScheduleError, createScheduleReset])

  const [
    deleteSchedule,
    { error: deleteScheduleError, reset: deleteScheduleReset },
  ] = useMutation(DELETE_SCHEDULE_MUTATION, {
    refetchQueries: [{ query: MY_SCHEDULES }, 'MySchedules'],
  })
  useEffect(() => {
    if (deleteScheduleError) {
      message.error('Error deleting schedule, ' + deleteScheduleError.message)
      deleteScheduleReset()
    }
  }, [deleteScheduleError, deleteScheduleReset])

  const filteredSchedules = useMemo(() => {
    if (!search) return schedules
    return schedules.filter((schedule) =>
      schedule.title.toLowerCase().includes(search.toLowerCase())
    )
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
          type='default'
          icon={<PlusOutlined />}
          onClick={() => setIsVisible(true)}
        >
          Add Schedule
        </Button>
      </div>
      {filteredSchedules.length === 0 ? (
        <Empty description='No Schedules Found' />
      ) : (
        <Space direction='vertical'>
          {filteredSchedules.map(({ title, isActive, id, color }) => {
            const convertedColor = Color(color)
            const backgroundColor = convertedColor.lightness(92.5).toString()
            const textColor = convertedColor.darken(0.35).toString()
            return (
              <div
                key={id}
                style={{
                  width: '100%',
                  padding: 20,
                  boxShadow: '1px 1px 8px -3px #333333',
                  outline: `2px solid ${textColor}`,
                  outlineOffset: -2,
                  backgroundColor,
                  color: textColor,
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span>{title}</span>
                  <Tooltip title={`Set ${isActive ? 'inactive' : 'active'}`}>
                    <Tag
                      color={isActive ? 'success' : 'error'}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        changeActive({
                          variables: {
                            setActiveId: id,
                            isActive: isActive === 1 ? 0 : 1,
                          },
                        })
                      }
                    >
                      {isActive ? 'active' : 'inactive'}
                    </Tag>
                  </Tooltip>
                </div>
                <Tooltip title='Delete Schedule'>
                  <Button
                    icon={<CloseCircleOutlined />}
                    type='text'
                    danger
                    onClick={() =>
                      deleteSchedule({ variables: { id } }).then(() => {
                        message.success('Deleted schedule')
                      })
                    }
                  />
                </Tooltip>
              </div>
            )
          })}
        </Space>
      )}

      <Modal
        title='Create a New Schedule'
        visible={isVisible}
        confirmLoading={confirmLoading}
        onCancel={() => setIsVisible(false)}
        onOk={() => {
          if (!title) {
            message.error('Missing field')
            return
          }
          setConfirmLoading(true)
          createSchedule({ variables: { title, color } }).then(() => {
            setConfirmLoading(false)
            setIsVisible(false)
            setTitle('')
            setColor('#FFFFFF')
            message.success('Created schedule')
          })
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
            <span>Title:</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <span>Color:</span>
            <Popover
              content={
                <BlockPicker
                  onChangeComplete={({ hex }) => setColor(hex)}
                  triangle='hide'
                  color={color}
                />
              }
              trigger='click'
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor,
                  border: `2px solid ${textColor}`,
                  cursor: 'pointer',
                }}
              />
            </Popover>
          </div>
        </div>
      </Modal>
    </>
  )
}
