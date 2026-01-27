import { useMediaQuery } from '@mui/material'

const MOBILE_BREAKPOINT = '(max-width:1024px)'

export const useMobile = (): boolean => {
  return useMediaQuery(MOBILE_BREAKPOINT)
}
