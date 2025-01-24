import React, { useEffect } from 'react'
import { LaptopOutlined, UserOutlined } from '@ant-design/icons'
import { ConfigProvider, Flex, Layout, Menu } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'
const { Content, Sider } = Layout

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
}

const items2 = [
    {
        icon: <UserOutlined />,
        label: '菜单一',
        key: 'sub1',
        children: [
            // {
            //     label: 'to orders',
            //     key: '/orders',
            // },
            {
                label: 'to orders2',
                key: '/orders2',
            },
            {
                label: 'to a',
                key: '/a',
            },
            {
                label: 'to p2',
                key: '/p2',
            },
        ],
    },
    { icon: <LaptopOutlined />, label: '菜单二' },
]

export const MainLayout = () => {
    const to = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        to('/orders2')
    }, [])

    return (
        <ConfigProvider theme={{ borderRadiusLG: 0 }}>
            <Layout hasSider className="h-full">
                <Sider style={siderStyle} className="print:hidden">
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultSelectedKeys={['2']}
                        items={items2}
                        onSelect={item => to(item.key)}
                    />
                </Sider>
                <Layout className="m-is-50 print:m-is-0">
                    <Outlet />
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}
