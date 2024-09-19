import React, { ErrorInfo, ReactNode } from 'react'
import { Button } from '../components'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    errorMessage?: string
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, errorMessage: error.message }
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, info)
    }

    handleRetry = () => {
        window.location.reload()
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-3/5">
                    <div className="bg-white p-6 border border-red-200 rounded-lg shadow-md max-w-md w-full text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            Something Went Wrong
                        </h1>
                        <p className="text-gray-700 mb-4">
                            Error: {this.state.errorMessage || 'Unknown Error'}
                        </p>

                        <Button onClick={this.handleRetry} title="Retry" />
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
