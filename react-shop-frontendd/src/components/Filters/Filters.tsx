import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'

import { useMobile } from '../../hooks/useMobile'
import './styles.scss'
import { SlidersHorizontal } from 'lucide-react'
import FiltersForm from './FiltersForm'
import type { Product } from '../../contexts/products/types';
type Props = {
  products: Product[]
}

const Filters: React.FC<Props> = ({ products }) => {
  const [open, setOpen] = useState(false)

  const mobile = useMobile()

  const handleOpen = () => {
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    return () => {
      handleClose()
    }
  }, [])

  return (
    <div className="filters">
      {mobile && (
        <div className="filters-mobile__header">
          <IconButton className="filters-button" onClick={handleOpen} type="submit" sx={{ p: '6px' }} aria-label="search">
            <SlidersHorizontal size={24} strokeWidth={1.5} />
          </IconButton>
        </div>
      )}

      {mobile ? (
        open && <FiltersForm products={products} mobile={mobile} handleClose={handleClose} />
      ) : (
        <FiltersForm products={products} mobile={mobile} />
      )}
    </div>
  )
}

export default Filters
