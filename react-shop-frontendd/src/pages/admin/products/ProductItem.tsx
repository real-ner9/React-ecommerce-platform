import React from 'react'

import IconButton from '@mui/material/IconButton'

import type { Product } from '../../../contexts/products/types';
import { useProducts } from '../../../contexts/products/ProductsContext'
import { Pencil, Trash2 } from 'lucide-react'
import { useAuth } from '../../../contexts/auth/AuthContext'
import ProductLayout from '../../../components/ProductLayout/ProductLayout'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import StyledModal from '../../../components/StyledModal/StyledModal'
import ProductForm, { type ProductInput } from './ProductForm'
import type { HandleClickEmpty } from '../../../types/types';
type Props = {
  product: Product
  loadProducts: () => void
}

const ProductItem: React.FC<Props> = ({ product, loadProducts }) => {
  const { deleteProduct, editProduct } = useProducts()
  const { getUser, user } = useAuth()

  const handleSubmit = (data: ProductInput, handleClose: HandleClickEmpty) => {
    return editProduct(product.id, data)
      .then(() => {
        loadProducts()
        handleClose()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteProduct = () => {
    deleteProduct(product.id)
      .then(() => {
        loadProducts()
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <div className="admin-product__header-toolbar">
          <StyledModal
            icon={
              <IconButton type="button" sx={{ p: '6px' }}>
                <Pencil size={24} strokeWidth={1.5} />
              </IconButton>
            }
            title="Редактировать товар"
          >
            {handleClose =>
              <ProductForm
                record={product}
                onSubmit={data => handleSubmit(data, handleClose)}
                title="Редактировать товар"
                buttonTitle="Сохранить"
              />
            }
          </StyledModal>

          <StyledDialog
            title="Удалить товар"
            icon={
              <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
                <Trash2 size={24} strokeWidth={1.5} />
              </IconButton>
            }
            text="Вы точно хотите удалить товар?"
            handleSubmit={handleDeleteProduct}
          />
        </div>
      )}
    />
  )
}

export default ProductItem
