export type UserItem = {
  id: number
  email: string
  name: string | null
  role: 'User' | 'Moderator' | 'Admin'
  isEmailConfirmed: boolean
  lastLoginAt: string | null
}

export type GetUsers = () => Promise<UserItem[]>
export type UpdateUserRole = (id: number, role: 'User' | 'Moderator') => Promise<UserItem>

export type UsersContextProps = {
  users: UserItem[]
  loading: boolean
  getUsers: GetUsers
  updateUserRole: UpdateUserRole
}
