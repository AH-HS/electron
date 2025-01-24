import { Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { OrderTable } from './eitorview'

const columns = (() => {
    return [
        {
            field: '0',
            title: '名称',
            editor: 'auto-input',
            width: '20%',
        },
        {
            field: '1',
            title: '时间',
            editor: 'auto-input',
            width: '20%',
        },
        {
            field: 2,
            title: '地址',
            editor: 'auto-input',
            width: '20%',
        },
        {
            field: 3,
            title: '单号',
            editor: 'auto-input',
            width: '20%',
        },
        {
            field: '4',
            title: '备注',
            width: '20%',
        },
    ]
})()

const records = new Array(10)
    .fill(undefined)
    .map(v => ['John', 18, 'male', '🏀', 'aaaa'])

export const Orders2 = () => {
    return (
        <div className="flex flex-col p-2 flex-1 h-full outline outline-solid outline-coolgray">
            <TopOptions />
            <OrderTable data={records} columns={columns} />
        </div>
    )
}

const TopOptions = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    return (
        <Header
            className="flex justify-between items-center
            print:hidden
            "
            style={{
                background: colorBgContainer,
            }}
        >
            <Button type="primary" onClick={e => window.print()}>
                打印
            </Button>
        </Header>
    )
}
