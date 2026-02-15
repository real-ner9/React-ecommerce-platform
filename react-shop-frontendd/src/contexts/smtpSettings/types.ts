export type SmtpSettingsData = {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  fromName?: string
  fromEmail?: string
}

export type SmtpTestResult = {
  success: boolean
  message: string
}

export type GetSmtpSettings = () => Promise<SmtpSettingsData | null>
export type UpdateSmtpSettings = (payload: SmtpSettingsData) => Promise<SmtpSettingsData>
export type TestSmtpConnection = (payload: SmtpSettingsData) => Promise<SmtpTestResult>

export type SmtpSettingsContextProps = {
  settings: SmtpSettingsData | null
  loading: boolean
  getSmtpSettings: GetSmtpSettings
  updateSmtpSettings: UpdateSmtpSettings
  testSmtpConnection: TestSmtpConnection
}
