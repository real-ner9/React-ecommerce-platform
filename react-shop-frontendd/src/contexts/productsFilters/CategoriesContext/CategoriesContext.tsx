import React, { type ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { requestUrl } from '../../../env'
import type { CategoriesContextProps, Category, CreateCategory, EditCategory } from './types';import type { BaseDeleteFilter, BaseGetFilter, BaseGetFilters } from '../types';
const CategoriesContext = React.createContext<CategoriesContextProps>({} as CategoriesContextProps)

export const useCategories = () => useContext(CategoriesContext)

type Props = {
  children: ReactNode
}

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories: BaseGetFilters = async () => {
    setLoading(true)
    try {
      const data = await axios.get<Category[]>(`${requestUrl}/categories`);
      if (data) {
        setCategories(data.data);
      }
    }
    catch (error) {
      console.error(error)
      setLoading(false)
    }
    finally {
      setLoading(false);
    }
  }

  const createCategory: CreateCategory = (payload) => {
    return axios.post<Category>(`${requestUrl}/categories`, payload)
      .then(({ data }) => {
        setCategories([...categories, data])
      })
      .catch(error => {
        console.log(error)
      })
  }

  const editCategory: EditCategory = (id, payload) => {
    return axios.patch<Category>(`${requestUrl}/categories/${id}`, payload)
      .then(({ data }) => {
        setCategories(categories.map(category => {
          if (category.id === data.id) {
            return data
          }
          return category
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteCategory: BaseDeleteFilter = (id) => {
    return axios.delete(`${requestUrl}/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getCategory: BaseGetFilter = (id) => axios.get<Category>(`${requestUrl}/categories/${id}`).then(({ data }) => data)

  useEffect(() => {
    getCategories();
  }, [])


  const value = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
    categories,
    loading,
  }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
