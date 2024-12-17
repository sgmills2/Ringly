import { Component, ErrorInfo, ReactNode } from 'react'
import { Sheet, Typography, Button } from '@mui/joy'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Sheet
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 'md',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography level="h4" color="danger">
            Something went wrong
          </Typography>
          <Typography level="body-sm" sx={{ mb: 2 }}>
            {this.state.error?.message || 'An error occurred while rendering the viewer'}
          </Typography>
          <Button
            variant="solid"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Sheet>
      )
    }

    return this.props.children
  }
} 