export type Schedule = {
  title: string
  isActive: number
  id: string
  color: string
}

export type Plan = {
  title: string
  id: string
  start: string
  end: string
  description: string
  schedule: {
    color: string
  }
}

export type Friend = {
  name: string
  id: string
}
