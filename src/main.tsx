import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import AppBrowser from './pages/AppBrowser/AppBrowser'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppBrowser />
    </React.StrictMode>,
)
