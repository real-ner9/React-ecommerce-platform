import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Chip,
} from '@mui/material'

import { useUsers } from '../../../contexts/users/UsersContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import Spinner from '../../../components/Spinner/Spinner'

const roleColors: Record<string, 'default' | 'primary' | 'error'> = {
  User: 'default',
  Moderator: 'primary',
  Admin: 'error',
}

const TabUsers: React.FC = () => {
  const { users, loading, getUsers, updateUserRole } = useUsers()
  const { user: currentUser } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  const handleRoleChange = (id: number, role: string) => {
    if (role === 'User' || role === 'Moderator') {
      updateUserRole(id, role)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Пользователи
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name || '—'}</TableCell>
                <TableCell>
                  {user.role === 'Admin' ? (
                    <Chip label="Admin" color="error" size="small" />
                  ) : (
                    <Select
                      value={user.role}
                      size="small"
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={currentUser?.id === user.id}
                    >
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Moderator">Moderator</MenuItem>
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TabUsers
