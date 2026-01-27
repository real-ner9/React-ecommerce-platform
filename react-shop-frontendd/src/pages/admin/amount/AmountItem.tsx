import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Pencil, Trash2 } from 'lucide-react'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import AmountForm, { type AmountInput } from './AmountForm'
import { useAmount } from '../../../contexts/productsFilters/AmountContext/AmountContext'
import type { Amount } from '../../../contexts/productsFilters/AmountContext/types';import type { HandleClickEmpty } from '../../../types/types';
type Props = {
  amount: Amount
  loadAmounts: () => void
}

const AmountItem: React.FC<Props> = ({ amount, loadAmounts }) => {
  const { deleteAmount, editAmount } = useAmount()

  const handleSubmit = (data: AmountInput, handleClose: HandleClickEmpty) => {
    return editAmount(amount.id, data)
      .then(() => {
        loadAmounts()
        handleClose()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteAmount = () => {
    deleteAmount(amount.id)
      .then(() => loadAmounts())
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="base-admin-item">
      {amount.name}

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Pencil size={24} strokeWidth={1.5} />
          </IconButton>
        }
        title="Редактировать обьем"
      >
        {handleClose =>
          <AmountForm
            record={amount}
            onSubmit={data => handleSubmit(data, handleClose)}
            title="Редактировать обьем"
            buttonTitle="Сохранить"
          />
        }
      </StyledModal>

      <StyledDialog
        icon={
          <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
            <Trash2 size={24} strokeWidth={1.5} />
          </IconButton>
        }
        title="Удалить обьем"
        text="Вы точно хотите удалить обьем?"
        handleSubmit={handleDeleteAmount}
      />
    </div>
  )
}

export default AmountItem
