import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { useAuth } from '../../../contexts/auth/AuthContext'
import CounterBadge from '../../../components/CounterBadge'
import {Home, Menu, Heart, ShoppingCart, User} from 'lucide-react'
import './mobile.scss'
import CatalogIcon from '../../../components/CatalogIcon/CatalogIcon'
import ProfileIcon from "../../../components/ProfileIcon/ProfileIcon.tsx";

const FooterMobile: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <AppBar
      style={{ background: 'white' }}
      className={classNames('footer', 'footer-mobile')}
      position="fixed"
      color="primary"
      sx={{ top: 'auto', bottom: 0 }}
      component="footer"
    >
      <div className="container">
        <Toolbar style={{ padding: 'unset' }} className="footer-mobile-content">
          <Button onClick={() => navigate('/')} type="button" color="secondary" sx={{ p: '6px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Home size={26} strokeWidth={1.5} color="black" />
              <Typography sx={{ fontSize: '10px', fontWeight: 400, mt: '2px', color: 'black' }}>Главная</Typography>
            </Box>
          </Button>

          <CatalogIcon />

          <Button onClick={() => navigate('/profile/info')} type="button" color="secondary" sx={{ p: '6px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <User size={26} strokeWidth={1.5} color="black" />
              <Typography sx={{ fontSize: '10px', fontWeight: 400, mt: '2px', color: 'black' }}>Профиль</Typography>
            </Box>
          </Button>

          <CounterBadge right={19} count={user.favorite?.length} onClick={() => navigate('/profile/favorite')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Heart size={26} strokeWidth={1.5} color="black" fill="none" />
              <Typography sx={{ fontSize: '10px', fontWeight: 400, mt: '2px', color: 'black' }}>Избранное</Typography>
            </Box>
          </CounterBadge>

          <CounterBadge right={17} count={user.cart?.length} onClick={() => navigate('/cart')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShoppingCart size={26} strokeWidth={1.5} color="black" />
              <Typography sx={{ fontSize: '10px', fontWeight: 400, mt: '2px', color: 'black' }}>Корзина</Typography>
            </Box>
          </CounterBadge>
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default FooterMobile
