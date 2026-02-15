import React, { useState } from 'react'
import { boolean, number, object, string, type TypeOf } from 'zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Stack, Typography } from '@mui/material'

import { StyledLoadingButton } from '../../../components/StyledButtons'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputCheckbox from '../../../components/FormInputs/Checkbox/FormInputCheckbox'
import type { SmtpSettingsData } from '../../../contexts/smtpSettings/types'

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

  const methods = useForm<SmtpInput>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: defaultValues?.host || '',
      port: defaultValues?.port || 587,
      secure: defaultValues?.secure || false,
      user: defaultValues?.user || '',
      pass: defaultValues?.pass || '',
      fromName: defaultValues?.fromName || '',
      fromEmail: defaultValues?.fromEmail || '',
    },
  })

  const { handleSubmit } = methods

  const onSubmitHandler: SubmitHandler<SmtpInput> = (data) => {
    setSaving(true)
    onSubmit(data).finally(() => {
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
        <FormProvider {...methods}>
          <FormInputText label="SMTP Host" name="host" />
          <FormInputText label="SMTP Port" name="port" type="number" />
          <FormInputCheckbox label="Secure (SSL/TLS)" name="secure" />
          <FormInputText label="User" name="user" />
          <FormInputText label="Password" name="pass" type="password" />
          <FormInputText label="From Name" name="fromName" />
          <FormInputText label="From Email" name="fromEmail" />
        </FormProvider>

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
            Save
          </StyledLoadingButton>

          <StyledLoadingButton
            variant="outlined"
            type="button"
            loading={testing}
            onClick={handleTest}
            sx={{ py: '0.8rem', color: '#000', borderColor: '#000' }}
          >
            Test Connection
          </StyledLoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default SmtpSettingsForm
