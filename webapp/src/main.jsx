import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import 'virtual:uno.css'
import 'react-resizable/css/styles.css'
// @ts-ignore
// import b from 'shareds'

// console.log({ b }, 1)

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)
