import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { router } from './router'
import './api'

/**
 * @typedef {import("antd").ThemeConfig} ThemeConfig
 * @type {ThemeConfig["components"]}
 */
const components = {
    Table: {
        cellPaddingBlock: 8,
        borderColor: 'black',
    },
    Input: {
        // colorBorder: 'transparent',
        // activeBorderColor:"transparent"
    },
}

export const App = () => {
    return (
        <ConfigProvider theme={{ components }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}
