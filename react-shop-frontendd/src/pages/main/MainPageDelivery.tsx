import React from 'react'
import { MapPin, Package, CreditCard } from 'lucide-react'
import { shopTexts } from '../../config/shopTexts'

const list = [
  {
    text: shopTexts.delivery.pickup,
    icon: <MapPin size={40} strokeWidth={1.5} />,
  },
  {
    text: shopTexts.delivery.shipping,
    icon: <Package size={40} strokeWidth={1.5} />,
  },
  {
    boldText: shopTexts.delivery.payment.bold,
    text: shopTexts.delivery.payment.text,
    icon: <CreditCard size={40} strokeWidth={1.5} />,
  },
]

const MainPageDelivery: React.FC = () => {
  return (
    <div className="main-page__list">
      {list.map((item, index) => (
        <div key={index} className="main-page__list-item">
          <div>
            <b>
              {item.boldText}
            </b>
            <p>
              {item.text}
            </p>
          </div>

          {item.icon}
        </div>
      ))}
    </div>
  )
}

export default MainPageDelivery
