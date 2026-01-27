import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import {Box, Button, Toolbar, Typography} from '@mui/material'
import {Heart, ShoppingCart, User} from 'lucide-react'

import type { ListItem } from '../../../types/list-item';
import SearchField from '../../../components/SearchField/SearchField'
import CounterBadge from '../../../components/CounterBadge'
import Logo from '../../../components/Logo'
import ProfileIcon from '../../../components/ProfileIcon/ProfileIcon'
import ContactsList from '../../../components/ContactsList/ContactsList'
import './desktop.scss'
import { useCart } from '../../../contexts/cart/CartContext'
import { useFavorite } from '../../../contexts/favorite/FavoriteContext'
import CatalogIcon from '../../../components/CatalogIcon/CatalogIcon'

const HeaderDesktop: React.FC = () => {
  const navigate = useNavigate()
  const { cart } = useCart()
  const { favoriteProducts } = useFavorite()

  const items: ListItem[] = [
    {
      element: (
        <Button onClick={() => navigate('/profile/info')} type="button" color="secondary" sx={{ p: '6px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <User size={26} strokeWidth={1.5} color="black" />
            <Typography sx={{ fontSize: '11px', fontWeight: 400, mt: '5px', color: 'black' }}>Профиль</Typography>
          </Box>
        </Button>
      ),
      customElement: true,
    },
    {
      element: <CatalogIcon />,
      customElement: true,
    },
    {
      element: (
        <CounterBadge right={19} count={favoriteProducts.length} onClick={() => navigate('/profile/favorite')}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Heart size={26} strokeWidth={1.7} color="black" />
            <Typography sx={{ fontSize: '11px', fontWeight: 400, mt: '5px', color: 'black' }}>Избранное</Typography>
          </Box>
        </CounterBadge>
      ),
      customElement: true,
    },
    {
      element: (
        <CounterBadge count={cart.items?.length} onClick={() => navigate('/cart')}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ShoppingCart size={26} strokeWidth={1.5} color="black" />
            <Typography sx={{ fontSize: '11px', fontWeight: 400, mt: '5px', color: 'black' }}>Корзина</Typography>
          </Box>
        </CounterBadge>
      ),
      customElement: true,
    },
  ]

  return (
    <div className="header-inner" style={{ padding: 'unset' }}>
      <Box className="header-logo">
        <Logo />
      </Box>

      <ContactsList />

      <Box className="header-search" sx={{}}>
        <SearchField />
      </Box>

      {items.map(({ element, grow }, index) => (
        <Box className="header-item" key={index} sx={{ flexGrow: grow || 0 }}>
          {element}
        </Box>
      ))}
    </div>
  )
}

export default HeaderDesktop
