import { gql } from '@apollo/client'

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const MY_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      avatar
    }
  }
`

export const MY_FRIENDS = gql`
  query MyFriends {
    myFriends {
      name
      id
    }
  }
`
//ADD AVATAR

export const MY_SCHEDULES = gql`
  query MySchedules {
    mySchedules {
      id
      title
      isActive
    }
  }
`

export const ADD_FRIEND_MUTATION = gql`
  mutation AddFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      id
      name
    }
  }
`

export const DELETE_FRIEND_MUTATION = gql`
  mutation DeleteFriend($friendId: ID!) {
    deleteFriend(friendId: $friendId) {
      id
      name
    }
  }
`

export const SET_ACTIVE_MUTATION = gql`
  mutation SetActive($setActiveId: ID!, $isActive: Int) {
    setActive(id: $setActiveId, isActive: $isActive) {
      id
      userId
      title
      isActive
      lastUpdated
    }
  }
`

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateSchedule($title: String!) {
    createSchedule(title: $title) {
      id
      userId
      title
      isActive
      lastUpdated
    }
  }
`

export const SCHEDULE = gql`
  query GetSchedule($getScheduleId: ID!) {
    getSchedule(id: $getScheduleId) {
      title
      isActive
      id
    }
  }
`

export const GET_PLANS = gql`
  query GetPlans($getPlansId: ID!) {
    getPlans(id: $getPlansId) {
      start
      end
      title
      id
      description
    }
  }
`
