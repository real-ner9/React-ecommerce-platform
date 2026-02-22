import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth/AuthContext'
import { validateToken } from '../utils/tokenUtils'
import { local } from '../App'
import { tokenKey } from '../env'
import Spinner from '../components/Spinner/Spinner'

type Props = {
  children: ReactNode
}

const AdminGuard: React.FC<Props> = ({ children }) => {
  const { user, isUserExist, isLoading } = useAuth()
  const token = local.getItem(tokenKey)

  if (isLoading) {
    return <Spinner />
  }

  if (!token || !validateToken(token)) {
    return <Navigate to="/login" replace />
  }

  if (!isUserExist || (user.role !== 'Admin' && user.role !== 'Moderator')) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminGuard
