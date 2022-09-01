import { gql } from '@apollo/client'

// Auth
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

// Users & Friends
export const MY_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      avatar
    }
  }
`
/** @TODO Add Avatar */
export const MY_FRIENDS = gql`
  query MyFriends {
    myFriends {
      name
      id
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

// Schedules
export const MY_SCHEDULES = gql`
  query MySchedules {
    mySchedules {
      id
      title
      isActive
      color
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
  mutation CreateSchedule($title: String!, $color: String!) {
    createSchedule(title: $title, color: $color) {
      id
      userId
      title
      color
      isActive
      lastUpdated
    }
  }
`
export const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`

//Plans
export const MY_PLANS = gql`
  query MyPlans {
    myPlans {
      title
      description
      id
      start
      end
      schedule {
        color
      }
    }
  }
`
export const GET_PLANS = gql`
  query GetPlans($id: ID!) {
    getPlans(id: $id) {
      start
      end
      title
      id
      description
    }
  }
`
export const CREATE_PLAN_MUTATION = gql`
  mutation CreatePlan(
    $start: String!
    $end: String!
    $scheduleId: ID!
    $title: String!
    $description: String
  ) {
    createPlan(
      start: $start
      end: $end
      scheduleId: $scheduleId
      title: $title
      description: $description
    ) {
      title
      description
      id
      start
      end
    }
  }
`
export const DELETE_PLAN_MUTATION = gql`
  mutation DeletePlan($id: ID!) {
    deletePlan(id: $id)
  }
`
