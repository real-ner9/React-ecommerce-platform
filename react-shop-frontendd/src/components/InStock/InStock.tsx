import React from 'react'
import './styles.scss'
import { Check } from 'lucide-react'

type Props = {
  count: number
}

const InStock: React.FC<Props> = ({ count }) => {
  const inStock = count > 0

  return (
    <div className="in-stock">
      {inStock ? 'В наличии' : 'Нет в наличии'}
      {inStock && <Check size={18} strokeWidth={1.5} className="in-stock__icon" />}
    </div>
  )
}

export default InStock
