import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="p-4 text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ErrorBoundary>
  </StrictMode>
)
