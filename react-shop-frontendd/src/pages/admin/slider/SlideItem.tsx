import React from 'react'

import IconButton from '@mui/material/IconButton'

import type { EditSlidePayload, Slide } from '../../../contexts/slider/types';
import { Pencil, Trash2 } from 'lucide-react'
import SlideLayout from '../../../components/SlideLayout/SlideLayout'
import { useSlider } from '../../../contexts/slider/SliderContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import SlideForm, { type SlideInput } from './SlideForm'
import type { HandleClickEmpty } from '../../../types/types';
type Props = {
  slide: Slide
}

const SlideItem: React.FC<Props> = ({ slide }) => {
  const { deleteSlide, getSlides, editSlide } = useSlider()

  const handleDeleteSlide = () => {
    deleteSlide(slide.id)
      .then(() => getSlides())
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = (data: SlideInput, handleClose: HandleClickEmpty) => {
    const payload: EditSlidePayload = {
      link: data.link,
      img_id: data.img_ids[0],
    }

    return editSlide(slide.id, payload)
      .then(() => {
        handleClose()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <SlideLayout slide={slide}>
      <div className="admin-slider__toolbar bordered-box">
        <StyledModal
          icon={
            <IconButton type="button" sx={{ p: '6px' }}>
              <Pencil size={24} strokeWidth={1.5} />
            </IconButton>
          }
          title="Редактировать слайд"
        >
          {handleClose =>
            <SlideForm
              record={slide}
              buttonTitle="Сохранить"
              title="Редактировать слайд"
              onSubmit={data => handleSubmit(data, handleClose)}
            />
          }
        </StyledModal>

        <StyledDialog
          title="Удалить слайд"
          icon={
            <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
              <Trash2 size={24} strokeWidth={1.5} />
            </IconButton>
          }
          text="Вы точно хотите удалить слайд?"
          handleSubmit={handleDeleteSlide}
        />
      </div>
    </SlideLayout>
  )
}

export default SlideItem
