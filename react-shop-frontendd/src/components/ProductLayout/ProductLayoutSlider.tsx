import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-img.png'
import classNames from 'classnames'
import ProductLayoutSlide from './ProductLayoutSlide'

import 'swiper/swiper-bundle.css'

type Props = {
  ids: number[]
  onClick?: () => void
  className?: string
}

const ProductLayoutSlider = ({ ids, onClick, className }: Props) => {
  const sliderImages: string[] = ids?.length ? ids.map(id => imgSrc(id)) : [emptyImg]
  const hasMultipleSlides = sliderImages.length > 1
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className={classNames('product-layout-slider__wrapper', className)}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={hasMultipleSlides ? { clickable: true } : false}
        loop={hasMultipleSlides}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onClick={onClick}
      >
        {sliderImages.map((src, index) => (
          <SwiperSlide key={index}>
            <ProductLayoutSlide src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
      {hasMultipleSlides && (
        <>
          <button
            className="slider-arrow slider-arrow--prev"
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={16} color="#000" strokeWidth={2.5} />
          </button>
          <button
            className="slider-arrow slider-arrow--next"
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={16} color="#000" strokeWidth={2.5} />
          </button>
        </>
      )}
    </div>
  )
}

export default ProductLayoutSlider
