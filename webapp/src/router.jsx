import { P2 } from './component/P2'
import { P1 } from './component/P1'
import { createHashRouter, redirect } from 'react-router-dom'
import { MainLayout } from './component/layout/Main'
import { Orders } from './component/Orders'
import { Orders2 } from './component/Orders2'

export const router = createHashRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <div>err</div>,
        children: [
            // {
            //     path: "orders",
            //     element: <Orders />,
            // },
            {
                path: 'orders2',
                element: <Orders2 />,
            },
            {
                path: 'a',
                element: <P1 />,
            },
            {
                path: 'p2',
                element: <P2 />,
            },
        ],
    },
])
