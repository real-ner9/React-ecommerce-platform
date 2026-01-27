import React from 'react'

import { Typography } from '@mui/material'
import { shopTexts } from '../../../config/shopTexts'
import './styles.scss'

const TabAbout: React.FC = () => {
  return (
    <div className="about">
      <div className="about-row">
        <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
          О нас
        </Typography>

        <p className="about-row__text">
          {shopTexts.about.welcome}
        </p>
      </div>

      <div className="about-row">
        <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
          Преимущества работы с нами
        </Typography>

        <ul className="about-advantages__list">
          {shopTexts.about.advantages.map((text, key) => <li key={key} className="about-advantages__item">{text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default TabAbout
