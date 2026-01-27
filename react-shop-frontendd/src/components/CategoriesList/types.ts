import type React from 'react'
import type { Category } from '../../contexts/productsFilters/CategoriesContext/types';
export type NavigateToCategory = (id?: number) => void

export type BaseProps = {
  children?: (category: Category) => React.ReactElement
}

export type CategoryLayoutProps = {
  id?: number
  name: string
  imgSrc: string
  onClick: NavigateToCategory
  children?: React.ReactElement | null
}
