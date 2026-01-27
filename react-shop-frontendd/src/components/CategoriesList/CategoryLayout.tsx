import React from 'react'

import { Typography } from '@mui/material'

import type { CategoryLayoutProps } from './types';
const CategoryLayout: React.FC<CategoryLayoutProps> = ({ id, imgSrc, name, onClick, children }) => {
  return (
    <div onClick={() => onClick(id)} className="category" style={{ backgroundImage: `url(${imgSrc})` }}>
      {children}
      <Typography className="category-title" variant="h5" component="h6" textAlign="center">
        {name}
      </Typography>
    </div>
  )
}

export default CategoryLayout
