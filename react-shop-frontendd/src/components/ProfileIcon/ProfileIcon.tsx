import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import './styles.scss'
import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProfileIcon: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate('/profile/info')} type="button" color="secondary" sx={{ p: '6px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <User size={26} strokeWidth={1.5} color="black" />
        <Typography sx={{ fontSize: '11px', fontWeight: 400, mt: '5px', color: 'black' }}>Профиль</Typography>
      </Box>
    </Button>
  )
}

export default ProfileIcon
