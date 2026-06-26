import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 600, margin: '4rem auto' }}>
          <h1 style={{ color: '#0f1e3c', marginBottom: '1rem' }}>Error al cargar la web</h1>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
            {this.state.error?.message || 'Error desconocido'}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Recargar página
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
