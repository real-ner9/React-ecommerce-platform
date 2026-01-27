import React from 'react'
import { shopTexts } from '../../config/shopTexts'

const MainPageAbout: React.FC = () => {
  return (
    <div className="main-page__about">
      <p>{shopTexts.about.welcome}</p>
      <div className="main-page__about-bottom">
        {shopTexts.about.features.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  )
}

export default MainPageAbout
