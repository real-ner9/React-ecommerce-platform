import React from 'react'
import { Typography } from '@mui/material'
import ListWithTitle from '../../../components/ListWithTitle/ListWithTitle'
import { shopTexts } from '../../../config/shopTexts'

const TabContacts: React.FC = () => {
  return (
    <div className="contacts">
      <div className="container">
        <div className="contacts-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Контакты
          </Typography>

          <ListWithTitle
            options={[
              {
                title: 'Телефон',
                text: <a href={shopTexts.contacts.phoneHref}>{shopTexts.contacts.phone}</a>,
              },
              {
                title: 'Вконтакте',
                text: (
                  <a rel="noreferrer" href={shopTexts.contacts.vk} target="_blank">
                    {shopTexts.contacts.vk}
                  </a>
                ),
              },
              {
                title: 'Инстаграм',
                text: (
                  <a rel="noreferrer" href={shopTexts.contacts.instagram} target="_blank">
                    {shopTexts.contacts.instagram}
                  </a>
                ),
              },
              {
                title: 'Телеграм',
                text: (
                  <a rel="noreferrer" href={shopTexts.contacts.telegram} target="_blank">
                    {shopTexts.contacts.telegram}
                  </a>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TabContacts
