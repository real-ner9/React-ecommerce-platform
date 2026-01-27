import React from 'react'

import { AppBar } from '@mui/material'
import classNames from 'classnames'
import { useMobile } from '../../hooks/useMobile'
import HeaderMobile from './mobile/HeaderMobile'
import HeaderDesktop from './desktop/HeaderDesktop'
import './styles.scss'
import TestBanner from '../TestBanner/TestBanner'

const Header = () => {
  const mobile = useMobile()

  return (
    <header className={classNames('header', mobile ? 'header-mobile' : 'header-desktop')}>
      <TestBanner />
      <div className="container">
        {mobile ? <HeaderMobile /> : <HeaderDesktop />}
      </div>
    </header>
  )
}

export default Header
