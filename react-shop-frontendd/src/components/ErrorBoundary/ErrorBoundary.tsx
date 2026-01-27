import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: 2,
            p: 3,
          }}
        >
          <AlertCircle size={64} strokeWidth={1.5} color="#d32f2f" />
          <Typography variant="h5" component="h2" textAlign="center">
            Что-то пошло не так
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'error.light',
                borderRadius: 1,
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error.toString()}
                {this.state.error.stack && `\n\n${this.state.error.stack}`}
              </Typography>
            </Box>
          )}
          <Button variant="contained" onClick={this.handleReset} sx={{ mt: 2 }}>
            Попробовать снова
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

