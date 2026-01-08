import React from 'react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught:', error, errorInfo);

        // TODO: Log to error tracking service (Sentry, LogRocket, etc.)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-red-700 p-4">
                        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                            <div className="text-center">
                                {/* Error icon */}
                                <div className="text-6xl mb-4">😞</div>

                                {/* Error title */}
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    Something went wrong
                                </h1>

                                {/* Error message */}
                                <p className="text-gray-200 mb-6">
                                    {this.state.error?.message || 'An unexpected error occurred'}
                                </p>

                                {/* Error details (dev only) */}
                                {process.env.NODE_ENV === 'development' && this.state.error && (
                                    <details className="mb-6 text-left">
                                        <summary className="cursor-pointer text-sm text-gray-300 hover:text-white mb-2">
                                            Error Details
                                        </summary>
                                        <pre className="text-xs text-red-200 bg-black/30 p-3 rounded overflow-auto max-h-40">
                                            {this.state.error.stack}
                                        </pre>
                                    </details>
                                )}

                                {/* Action buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={this.handleReset}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={this.handleGoHome}
                                        className="w-full px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
                                    >
                                        Go to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
