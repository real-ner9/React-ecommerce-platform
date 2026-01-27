import React from 'react'
import { Typography } from '@mui/material'
import { BadgeCheck, Truck, Headset } from 'lucide-react'
import { shopTexts } from '../../config/shopTexts'

const icons = [
  <BadgeCheck size={40} strokeWidth={1.5} />,
  <Truck size={40} strokeWidth={1.5} />,
  <Headset size={40} strokeWidth={1.5} />,
]

const MainPageHeader = () => {
  return (
    <div className="main-page__header">
      <Typography variant="h4" component="h1" fontWeight={500}>
        {shopTexts.name} — {shopTexts.tagline}
      </Typography>

      <div className="main-page__list">
        {shopTexts.header.features.map((item, index) => (
          <div className="main-page__list-item" key={item.key}>
            <p>{item.text}</p>
            {icons[index]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainPageHeader
