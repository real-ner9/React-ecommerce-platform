import React, { type ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import type { GetUsers, UpdateUserRole, UserItem, UsersContextProps } from './types'
import { requestUrl } from '../../env'

const UsersContext = React.createContext<UsersContextProps>({} as UsersContextProps)

export const useUsers = () => useContext(UsersContext)

type Props = {
  children: ReactNode
}

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)

  const getUsers: GetUsers = () => {
    setLoading(true)
    return axios
      .get(`${requestUrl}/user/all`)
      .then(({ data }) => {
        setUsers(data)
        return data
      })
      .catch((error) => {
        console.log(error)
        return []
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateUserRole: UpdateUserRole = (id, role) => {
    return axios
      .patch(`${requestUrl}/user/${id}/role`, { role })
      .then(({ data }) => {
        setUsers((prev) => prev.map((u) => (u.id === id ? data : u)))
        return data
      })
  }

  const value = {
    users,
    loading,
    getUsers,
    updateUserRole,
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
