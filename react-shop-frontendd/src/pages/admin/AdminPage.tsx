import React from 'react'

import './styles.scss'
import { Stack, Tab, Tabs } from '@mui/material'
import { useMobile } from '../../hooks/useMobile'
import { type TabProps } from '../../components/TabPanel/TabPanel'
import { Link, Outlet, useLocation } from 'react-router-dom'

const tabs: TabProps[] = [
  {
    label: 'Товары',
    to: '/admin/products',
  },
  {
    label: 'Слайдер',
    to: '/admin/slider',
  },
  {
    label: 'Категории',
    to: '/admin/categories',
  },
  {
    label: 'Бренды',
    to: '/admin/brands',
  },
  {
    label: 'Цвета',
    to: '/admin/colors',
  },
  {
    label: 'Обьемы',
    to: '/admin/amount',
  },
  // {
  //   label: 'Количество',
  //   to: '/admin/quantities',
  // },
  {
    label: 'Заказы',
    to: '/admin/orders',
  },
  {
    label: 'Email',
    to: '/admin/smtp-settings',
  },
]

const AdminPage: React.FC = () => {
  const location = useLocation()
  const mobile = useMobile()

  return (
    <div className="admin">
      <div className="container">
        <Stack direction={mobile ? 'column' : 'row'} spacing={2}>
          <Tabs
            value={
              location.pathname !== '/' ?
                location.pathname :
                false
            }
            orientation={mobile ? 'horizontal' : 'vertical'}
            variant="scrollable"
            // sx={{ borderRight: 1, borderColor: 'divider' }}
            className="admin-tabs tabs"
          >
            {tabs.map(({ label, to }, index) => (
              <Tab
                key={index}
                value={to}
                label={label}
                component={Link}
                to={to}
              />
            ))}
          </Tabs>

          <div className="tab-outlet">
            <Outlet/>
          </div>
        </Stack>
      </div>
    </div>
  )
}

export default AdminPage
