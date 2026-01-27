import React from 'react'

import IconButton from '@mui/material/IconButton'

import CategoryForm, { type CategoryInput } from './CategoryForm'
import StyledModal from '../../../components/StyledModal/StyledModal'
import CreateButton from '../CreateButton'
import './styles.scss'
import type {
  CreateCategoryPayload,
  EditCategoryPayload,
} from '../../../contexts/productsFilters/CategoriesContext/types';import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import CategoriesList from '../../../components/CategoriesList/CategoriesList'
import { Pencil, Trash2 } from 'lucide-react'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import type { HandleClickEmpty } from '../../../types/types';
const TabCategories: React.FC = () => {
  const { createCategory, editCategory, deleteCategory } = useCategories()

  const handleCreateCategory = (data: CategoryInput) => {
    const payload: CreateCategoryPayload = {
      name: data.name,
      img_id: data.img_ids[0],
    }

    return createCategory(payload)
  }

  const handleEditCategory = (id: number, data: CategoryInput, handleClose: HandleClickEmpty) => {
    const payload: EditCategoryPayload = {
      name: data.name,
      img_id: data.img_ids[0],
    }

    return editCategory(id, payload).then(() => {
      handleClose()
    })
  }

  const handleDeleteCategory = (id: number) => {
    return deleteCategory(id)
  }

  return (
    <>
      <StyledModal
        icon={<CreateButton/>}
        title="Создать категорию"
      >
        {() => (
          <CategoryForm
            onSubmit={handleCreateCategory}
            title="Создать категорию"
            buttonTitle="Создать"
          />
        )}
      </StyledModal>

      <CategoriesList disabled>
        {category => (
          <div className="admin-category__toolbar">
            <StyledModal
              icon={
                <IconButton type="button" sx={{ p: '6px' }}>
                  <Pencil size={24} strokeWidth={1.5} color="white" />
                </IconButton>
              }
              title="Редактировать категорию"
            >
              {handleClose => (
                <CategoryForm
                  record={category}
                  onSubmit={(data) => handleEditCategory(category.id, data, handleClose)}
                  title="Редактировать категорию"
                  buttonTitle="Сохранить"
                />
              )}
            </StyledModal>

            <StyledDialog
              icon={
                <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
                  <Trash2 size={24} strokeWidth={1.5} color="white" />
                </IconButton>
              }
              title="Удалить категорию"
              text="Вы точно хотите удалить категорию?"
              handleSubmit={() => handleDeleteCategory(category.id)}
            />
          </div>
        )}
      </CategoriesList>
    </>
  )
}

export default TabCategories
