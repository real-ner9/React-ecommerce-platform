import React, { type ReactNode, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

import { AlertProvider } from './contexts/alert/AlertContext'
import { AuthProvider } from './contexts/auth/AuthContext'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'
import { OrdersProvider } from './contexts/orders/OrdersContext'
import { PaymentProvider } from './contexts/payment/PaymentContext'
import { FavoriteProvider } from './contexts/favorite/FavoriteContext'
import { SliderProvider } from './contexts/slider/SliderContext'
import { FilesProvider } from './contexts/files/FilesContext'
import { CategoriesProvider } from './contexts/productsFilters/CategoriesContext/CategoriesContext'
import { BrandsProvider } from './contexts/productsFilters/BrandsContext/BrandsContext'
import { ColorsProvider } from './contexts/productsFilters/ColorsContext/ColorsContext'
import { AmountProvider } from './contexts/productsFilters/AmountContext/AmountContext'
import { FeedbackProvider } from './contexts/feedback/FeedbackContext'
import { SmtpSettingsProvider } from './contexts/smtpSettings/SmtpSettingsContext'
import { ProvidersComposer } from './components/Providers/ProvidersComposer'

type Props = {
  children: ReactNode
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000',
    },
    primary: {
      main: '#FF8800',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          // textTransform: 'none',
        },
      },
      defaultProps: {
        // disableElevation: true,
      },
    },
  },
})

const AppProviders: React.FC<Props> = ({ children }) => {
  const providers = useMemo(
    () => [
      ThemeProvider,
      AlertProvider,
      AuthProvider,
      ProductsProvider,
      CartProvider,
      OrdersProvider,
      PaymentProvider,
      FavoriteProvider,
      SliderProvider,
      FilesProvider,
      CategoriesProvider,
      BrandsProvider,
      ColorsProvider,
      AmountProvider,
      FeedbackProvider,
      SmtpSettingsProvider,
    ],
    []
  )

  return (
    <ThemeProvider theme={theme}>
      <ProvidersComposer providers={providers.slice(1)}>
                                  {children}
      </ProvidersComposer>
    </ThemeProvider>
  )
}

export default AppProviders
