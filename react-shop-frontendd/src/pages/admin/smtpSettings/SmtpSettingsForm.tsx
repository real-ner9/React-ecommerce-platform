import React, { useState } from 'react'
import { boolean, number, object, string, type TypeOf } from 'zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, MenuItem, Select, Stack, Typography, FormControl, InputLabel } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputCheckbox from '../../../components/FormInputs/Checkbox/FormInputCheckbox'
import type { SmtpSettingsData } from '../../../contexts/smtpSettings/types'

const providers = [
  { label: 'Gmail', host: 'smtp.gmail.com', port: 587, secure: false },
  { label: 'Yandex', host: 'smtp.yandex.ru', port: 465, secure: true },
  { label: 'Mail.ru', host: 'smtp.mail.ru', port: 465, secure: true },
  { label: 'Outlook / Hotmail', host: 'smtp.office365.com', port: 587, secure: false },
  { label: 'Brevo', host: 'smtp-relay.brevo.com', port: 587, secure: false },
  { label: 'Resend', host: 'smtp.resend.com', port: 465, secure: true },
] as const

const smtpSchema = object({
  host: string().nonempty('Host is required'),
  port: number({ coerce: true }).min(1).max(65535),
  secure: boolean(),
  user: string().nonempty('User is required'),
  pass: string().nonempty('Password is required'),
  fromName: string().optional().default(''),
  fromEmail: string().optional().default(''),
})

export type SmtpInput = TypeOf<typeof smtpSchema>

type Props = {
  defaultValues?: SmtpSettingsData | null
  onSubmit: (data: SmtpInput) => Promise<any>
  onTest: (data: SmtpInput) => Promise<{ success: boolean; message: string }>
}

const SmtpSettingsForm: React.FC<Props> = ({ defaultValues, onSubmit, onTest }) => {
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [saveResult, setSaveResult] = useState<{ success: boolean; message: string } | null>(null)
  const [selectedProvider, setSelectedProvider] = useState('Gmail')

  const methods = useForm<SmtpInput>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: defaultValues?.host || 'smtp.gmail.com',
      port: defaultValues?.port || 587,
      secure: defaultValues?.secure ?? false,
      user: defaultValues?.user || '',
      pass: defaultValues?.pass || '',
      fromName: defaultValues?.fromName || '',
      fromEmail: defaultValues?.fromEmail || '',
    },
  })

  const { handleSubmit, setValue } = methods

  const handleProviderChange = (providerLabel: string) => {
    setSelectedProvider(providerLabel)
    const provider = providers.find((p) => p.label === providerLabel)
    if (provider) {
      setValue('host', provider.host)
      setValue('port', provider.port)
      setValue('secure', provider.secure)
    }
  }

  const onSubmitHandler: SubmitHandler<SmtpInput> = (data) => {
    setSaving(true)
    setSaveResult(null)
    onSubmit(data)
      .then(() => {
        setSaveResult({ success: true, message: 'Настройки сохранены' })
      })
      .catch((error) => {
        setSaveResult({
          success: false,
          message: error?.response?.data?.message || error.message || 'Ошибка сохранения',
        })
      })
      .finally(() => {
        setSaving(false)
      })
  }

  const handleTest = () => {
    handleSubmit((data) => {
      setTesting(true)
      setTestResult(null)
      onTest(data)
        .then((result) => {
          setTestResult(result)
        })
        .catch((error) => {
          setTestResult({
            success: false,
            message: error?.response?.data?.message || error.message || 'Connection failed',
          })
        })
        .finally(() => {
          setTesting(false)
        })
    })()
  }

  return (
    <Box>
      <Typography variant="h5" component="h5" sx={{ mb: '2rem' }}>
        SMTP Settings
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Почтовый сервис</InputLabel>
          <Select
            value={selectedProvider}
            label="Почтовый сервис"
            onChange={(e) => handleProviderChange(e.target.value)}
          >
            {providers.map((p) => (
              <MenuItem key={p.label} value={p.label}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormProvider {...methods}>
          <FormInputText label="SMTP Host" name="host" />
          <FormInputText label="SMTP Port" name="port" type="number" />
          <FormInputCheckbox label="Secure (SSL/TLS)" name="secure" />
          <FormInputText label="User (email)" name="user" />
          <FormInputText label="Password (пароль приложения)" name="pass" type="password" />
          <FormInputText label="Имя отправителя" name="fromName" />
          <FormInputText label="Email отправителя" name="fromEmail" />
        </FormProvider>

        {saveResult && (
          <Alert severity={saveResult.success ? 'success' : 'error'} sx={{ mb: 2 }}>
            {saveResult.message}
          </Alert>
        )}

        {testResult && (
          <Alert severity={testResult.success ? 'success' : 'error'} sx={{ mb: 2 }}>
            {testResult.message}
          </Alert>
        )}

        <Stack direction="row" spacing={2}>
          <StyledLoadingButton
            variant="contained"
            type="submit"
            loading={saving}
            sx={{ py: '0.8rem' }}
          >
            Сохранить
          </StyledLoadingButton>

          <StyledLoadingButton
            variant="outlined"
            type="button"
            loading={testing}
            onClick={handleTest}
            sx={{ py: '0.8rem', color: '#000', borderColor: '#000' }}
          >
            Тест подключения
          </StyledLoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default SmtpSettingsForm
