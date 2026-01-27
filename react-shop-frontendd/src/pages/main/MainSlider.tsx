import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSlider } from '../../contexts/slider/SliderContext'
import Spinner from '../../components/Spinner/Spinner'
import SlideLayout from '../../components/SlideLayout/SlideLayout'

import 'swiper/swiper-bundle.css'

const MainSlider = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const { slides, getSlides } = useSlider()

  useEffect(() => {
    setLoading(true)

    getSlides().finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="main-slider">
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1.4}
        centeredSlides={true}
        rewind={true}
        spaceBetween={16}
        initialSlide={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        breakpoints={{
          0: {
            slidesPerView: 1.06,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 1.4,
            spaceBetween: 16,
          },
        }}
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideLayout slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="main-slider__arrow main-slider__arrow--prev"
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft size={20} color="#000" strokeWidth={2} />
      </button>
      <button
        className="main-slider__arrow main-slider__arrow--next"
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight size={20} color="#000" strokeWidth={2} />
      </button>
    </div>
  )
}

export default MainSlider
