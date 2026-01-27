import React from 'react'

import { useMobile } from '../../hooks/useMobile'
import FooterMobile from './mobile/FooterMobile'
import FooterDesktop from './desktop/FooterDesktop'
import './styles.scss'

const Footer: React.FC = () => {
  const mobile = useMobile()

  return mobile ? <FooterMobile /> : <FooterDesktop />
}

export default Footer
