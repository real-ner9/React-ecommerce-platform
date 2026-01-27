import React from 'react'

type Props = {
  src: string
}

const ProductLayoutSlide: React.FC<Props> = ({ src }) => {
  return (
    <div className="product-card__img-wrap img-plug j-thumbnail-wrap">
      <img className="product-layout-slide__img" src={src} alt="product-img"/>
    </div>
  )
}

export default ProductLayoutSlide
