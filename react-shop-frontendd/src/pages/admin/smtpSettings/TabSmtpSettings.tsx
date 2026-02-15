import React, { useEffect } from 'react'

import { useSmtpSettings } from '../../../contexts/smtpSettings/SmtpSettingsContext'
import SmtpSettingsForm, { type SmtpInput } from './SmtpSettingsForm'
import Spinner from '../../../components/Spinner/Spinner'

const TabSmtpSettings: React.FC = () => {
  const { settings, loading, getSmtpSettings, updateSmtpSettings, testSmtpConnection } =
    useSmtpSettings()

  useEffect(() => {
    getSmtpSettings()
  }, [])

  const handleSubmit = (data: SmtpInput) => {
    return updateSmtpSettings({
      host: data.host,
      port: data.port,
      secure: data.secure,
      user: data.user,
      pass: data.pass,
      fromName: data.fromName || undefined,
      fromEmail: data.fromEmail || undefined,
    })
  }

  const handleTest = (data: SmtpInput) => {
    return testSmtpConnection({
      host: data.host,
      port: data.port,
      secure: data.secure,
      user: data.user,
      pass: data.pass,
      fromName: data.fromName || undefined,
      fromEmail: data.fromEmail || undefined,
    })
  }

  if (loading) return <Spinner />

  return (
    <SmtpSettingsForm
      defaultValues={settings}
      onSubmit={handleSubmit}
      onTest={handleTest}
    />
  )
}

export default TabSmtpSettings
