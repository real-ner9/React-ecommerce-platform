import React, { type ReactNode, useContext, useState } from 'react'
import axios from 'axios'

import type {
  GetSmtpSettings,
  SmtpSettingsContextProps,
  SmtpSettingsData,
  TestSmtpConnection,
  UpdateSmtpSettings,
} from './types'
import { requestUrl } from '../../env'

const SmtpSettingsContext = React.createContext<SmtpSettingsContextProps>(
  {} as SmtpSettingsContextProps,
)

export const useSmtpSettings = () => useContext(SmtpSettingsContext)

type Props = {
  children: ReactNode
}

export const SmtpSettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<SmtpSettingsData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getSmtpSettings: GetSmtpSettings = () => {
    setLoading(true)
    return axios
      .get(`${requestUrl}/smtp-settings`)
      .then(({ data }) => {
        setSettings(data)
        return data
      })
      .catch((error) => {
        console.log(error)
        return null
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateSmtpSettings: UpdateSmtpSettings = (payload) => {
    return axios
      .put(`${requestUrl}/smtp-settings`, payload)
      .then(({ data }) => {
        setSettings(data)
        return data
      })
  }

  const testSmtpConnection: TestSmtpConnection = (payload) => {
    return axios
      .post(`${requestUrl}/smtp-settings/test`, payload)
      .then(({ data }) => data)
  }

  const value = {
    settings,
    loading,
    getSmtpSettings,
    updateSmtpSettings,
    testSmtpConnection,
  }

  return (
    <SmtpSettingsContext.Provider value={value}>
      {children}
    </SmtpSettingsContext.Provider>
  )
}
