import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledButton } from './StyledButtons'

const AuthButton = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <StyledButton onClick={() => navigate('/login')}>Войти</StyledButton>
    </div>
  )
}

export default AuthButton
