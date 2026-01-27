import React from 'react'

import type { Slide } from '../../contexts/slider/types';
import { imgSrc } from '../../helpers/imgSrc'
import './styles.scss'

type Props = {
  slide: Slide
  children?: React.ReactNode
}

const SlideLayout: React.FC<Props> = ({ slide, children }) => {
  const { img_id, link } = slide

  const onClick = () => {
    if (!link) return
    window.open(link, '_blank')
  }

  return (
    <div className="slide-layout" onClick={onClick}>
      <img src={imgSrc(img_id)} alt="slide img"/>
      {children}
    </div>
  )
}

export default SlideLayout
