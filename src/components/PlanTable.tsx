import {
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  DatePicker,
  Empty,
  Input,
  message,
  Modal,
  Select,
  Space,
  Tooltip,
} from 'antd'
import Color from 'color'
import { Moment } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import {
  CREATE_PLAN_MUTATION,
  DELETE_PLAN_MUTATION,
  MY_PLANS,
  MY_SCHEDULES,
} from '../constants'
import { Friend, Plan, Schedule } from '../types'

export function PlanTable() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [plans, setPlans] = useState<Plan[]>([])

  const [search, setSearch] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedScheduleId, setSelectedScheduleId] = useState('')
  const [dates, setDates] = useState<[Moment | null, Moment | null] | null>(
    null
  )
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [friends, setFriends] = useState<Friend[]>([])

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

  const myPlans = useQuery(MY_PLANS)
  useEffect(() => {
    const { error, data } = myPlans
    if (error) {
      message.error('Error fetching plans, ' + error.message)
    }
    if (data) {
      setPlans(data.myPlans)
    }
  }, [myPlans])

  const [createPlan, { error: createPlanError, reset: createPlanReset }] =
    useMutation(CREATE_PLAN_MUTATION, {
      refetchQueries: [{ query: MY_PLANS }, 'MyPlans'],
    })
  useEffect(() => {
    if (createPlanError) {
      message.error('Error creating plan, ' + createPlanError.message)
      createPlanReset()
    }
  }, [createPlanError, createPlanReset])

  const [deletePlan, { error: deletePlanError, reset: deletePlanReset }] =
    useMutation(DELETE_PLAN_MUTATION, {
      refetchQueries: [{ query: MY_PLANS }, 'MyPlans'],
    })
  useEffect(() => {
    if (deletePlanError) {
      message.error('Error deleting plan, ' + deletePlanError.message)
      deletePlanReset()
    }
  }, [deletePlanError, deletePlanReset])

  const filteredPlans = useMemo(() => {
    if (!search) return plans
    return plans.filter((plan) =>
      plan.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [plans, search])

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
          placeholder='Search plans'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          suffix={<SearchOutlined />}
          allowClear
        />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setIsVisible(true)}
        >
          Add Plan
        </Button>
      </div>
      {filteredPlans.length === 0 ? (
        <Empty description='No Plans Found' />
      ) : (
        <Space direction='vertical'>
          {filteredPlans.map(
            ({ title, description, id, start, end, schedule }) => {
              const { color } = schedule
              const convertedColor = Color(color)
              const backgroundColor = convertedColor.lightness(92.5).toString()
              const textColor = convertedColor.darken(0.35).toString()
              const startDate = new Date(start)
              const endDate = new Date(end)
              return (
                <div
                  key={id}
                  style={{
                    width: '100%',
                    padding: 20,
                    boxShadow: '1px 1px 8px -3px #333333',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor,
                      border: `2px solid ${textColor}`,
                      cursor: 'pointer',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <span>
                      {title}: {description}
                    </span>
                    <span>
                      {startDate.toDateString()} - {endDate.toDateString()}
                    </span>
                  </div>
                  <div style={{ flex: 1 }} />
                  <Tooltip title='Delete Plan'>
                    <Button
                      icon={<CloseCircleOutlined />}
                      type='text'
                      danger
                      onClick={() =>
                        deletePlan({ variables: { id } }).then(() =>
                          message.success('Deleted plan')
                        )
                      }
                    />
                  </Tooltip>
                </div>
              )
            }
          )}
        </Space>
      )}

      <Modal
        title='Create a New Plan'
        visible={isVisible}
        confirmLoading={confirmLoading}
        onCancel={() => setIsVisible(false)}
        onOk={() => {
          if (
            !title ||
            !description ||
            !selectedScheduleId ||
            !dates ||
            !dates[0] ||
            !dates[1]
          ) {
            message.error('Missing field')
            return
          }
          setConfirmLoading(true)
          createPlan({
            variables: {
              scheduleId: selectedScheduleId,
              title,
              description,
              start: dates[0].toString(),
              end: dates[1].toString(),
            },
          }).then(() => {
            setConfirmLoading(false)
            setIsVisible(false)
            setTitle('')
            setDescription('')
            setSelectedScheduleId('')
            setDates(null)
            message.success('Created plan')
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
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              allowClear
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>Description:</span>
            <Input.TextArea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              allowClear
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>Schedule:</span>
            <Select
              onChange={setSelectedScheduleId}
              style={{ flex: 1 }}
              placeholder='Select a schedule'
            >
              {schedules.map(({ title, id }) => (
                <Select.Option key={id} value={id}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <span>Dates:</span>
            <DatePicker.RangePicker
              value={dates}
              onChange={setDates}
              style={{ flex: 1 }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
