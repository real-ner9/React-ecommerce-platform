import React from 'react'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'
import { siVk, siInstagram, siTelegram } from 'simple-icons'
import { shopTexts } from '../../config/shopTexts'

type SimpleIconProps = {
  icon: { path: string }
  size?: number
}

const SimpleIcon: React.FC<SimpleIconProps> = ({ icon, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d={icon.path} />
  </svg>
)

type ContactItem = {
  icon: React.ReactNode
  to: string
}

const items: ContactItem[] = [
  {
    icon: <SimpleIcon icon={siVk} />,
    to: shopTexts.contacts.vk,
  },
  {
    icon: <SimpleIcon icon={siInstagram} />,
    to: shopTexts.contacts.instagram,
  },
  {
    icon: <SimpleIcon icon={siTelegram} />,
    to: shopTexts.contacts.telegram,
  },
]

const ContactsList: React.FC = () => {
  const onClick = (to: string) => {
    window.open(to, '_blank')
  }

  return (
    <>
      {items.map(({ icon, to }, index) => (
        <Box className="header-item" key={index} sx={{ flexGrow: 0 }}>
          <IconButton onClick={() => onClick(to)} type="button" color="secondary" sx={{ p: '6px' }}>
            {icon}
          </IconButton>
        </Box>
      ))}
    </>
  )
}

export default ContactsList
