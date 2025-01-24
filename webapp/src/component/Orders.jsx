import React, { useRef, useState } from 'react'
import {
    AutoComplete,
    Button,
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    Table,
} from 'antd'
import { Resizable } from 'react-resizable'
import { getAns } from '../utils/pinyin'
import { FiledItem } from './FiledsItem'
import printJS from 'print-js'
import dayjs from 'dayjs'

const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props

    if (!width) {
        return <th {...restProps} />
    }

    return (
        <Resizable
            className="[&_.react-resizable-handle]:(bg-none h-[40px] cursor-col-resize)"
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    )
}

const mockData = [
    '中国北京海淀区',
    '中国北京朝阳区',
    '中国北京大兴区',
    '中国北京怀柔区',
    '中国河北邯郸市',
    '中国河北唐山市',
    '中国河北保定市',
    '中国河北保定市1',
    '中国河北保定市2',
    '中国河北保定市3',
    '中国河北保定市4',
]

const mock_options = mockData.map(v => ({ value: v }))

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    rowIndex,
    handleSave,
    ...restProps
}) => {
    const [options, setOptions] = useState(mock_options)

    return (
        <td {...restProps}>
            <Form.Item name={['row', rowIndex, dataIndex]} className="m-0">
                <AutoComplete
                    options={options}
                    onSearch={v =>
                        setOptions(
                            getAns(mockData, v)?.map(val => ({ value: val }))
                        )
                    }
                >
                    <Input.TextArea autoSize={{ maxRows: 5, minRows: 1 }} />
                </AutoComplete>
            </Form.Item>
        </td>
    )
}

const components = {
    header: { cell: ResizeableTitle },
    body: {
        cell: React.memo(EditableCell, (pre, newV) => {
            const { record: oldR, dataIndex } = pre
            const { record: newR } = newV
            return oldR?.[dataIndex] === newR?.[dataIndex]
        }),
    },
}

const defaultCols = [
    {
        title: 'name',
        dataIndex: 'name',
        width: 100,
        align: 'center',
        editable: true,
    },
    {
        title: 'age',
        align: 'center',
        width: 100,
        dataIndex: 'age',
    },
    {
        title: 'address',
        align: 'center',
        width: 100,
        dataIndex: 'address',
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        width: 100,
        align: 'center',
    },
]

export const Orders = () => {
    const [form] = Form.useForm()
    const [cols, setCols] = useState(defaultCols)
    const ref = useRef()

    const handleResize =
        index =>
        (e, { size }) => {
            setCols(columns => {
                const nextColumns = [...columns]
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width,
                }
                return nextColumns
            })
        }

    const handleAdd = () => {
        const oldData = form.getFieldValue('row')
        const newVal = [...oldData, {}]
        form.setFieldValue('row', newVal)
    }
    const logVal = () => {
        console.log(form.getFieldsValue())
    }

    const columns = cols.map((col, index) => {
        return {
            ...col,
            onCell: (record, rowIndex) => ({
                record,
                rowIndex,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
            onHeaderCell: column => ({
                width: column.width,
                onResize: handleResize(index),
            }),
        }
    })

    const print = () => {
        // printJS({
        //     printable: 'pTable',
        //     type: 'html',
        //     maxWidth: 2000,
        //     header: 'PrintJS - Form Element Selection',
        // })
        window.print()
    }

    return (
        <div>
            <Flex gap={4} className="mb-4 print:hidden">
                <Button
                    id="print"
                    className=""
                    onClick={handleAdd}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    新增一行
                </Button>
                <Button
                    className="mb-4 print:hidden"
                    onClick={logVal}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    log 表单值
                </Button>
                <Button
                    className="mb-4 print:hidden"
                    onClick={() => addItem()}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    新增一条
                </Button>
                <Button
                    // className="mb-4 print:hidden"
                    onClick={() => print()}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    打印
                </Button>
            </Flex>

            <Form
                // id="dform"
                name="orders"
                form={form}
                component={false}
                initialValues={{ row: Array.from({ length: 2 }) }}
            >
                {props => (
                    <Table
                        id="pTable"
                        ref={ref}
                        className="
                        print:[&_.ant-table-body]:(max-h-[9999px]!)
                        print:[&_.ant-table-container]:w-[20cm]
                        print:[&_.ant-table-header]:w-[20cm]
                        "
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={props.row}
                        columns={columns}
                        scroll={{ y: 600 }}
                        pagination={false}
                    />
                )}
            </Form>
        </div>
    )
}

const addItem = () => {
    const handleSubmit = val => {
        console.log({ val })
        // const { date } = val
        // console.log(date.format('YYYY/MM/DD'))

        destroy()
    }
    const { destroy } = Modal.confirm({
        title: '创建记录',
        title: null,
        icon: null,
        destroyOnClose: true,
        footer: false,
        content: (
            <Form onFinish={handleSubmit}>
                <Form.Item name="name" label="名称">
                    <Input />
                </Form.Item>
                <Form.Item name="time" label="时间">
                    <FiledItem type="time" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="时间"
                    getValueProps={value => ({
                        value: value && dayjs(value),
                    })}
                    normalize={value => value && value.format('YYYY/MM/DD')}
                >
                    <DatePicker />
                </Form.Item>
                <Button htmlType="submit">提交</Button>
            </Form>
        ),
        onOk() {
            console.log('OK')
        },
        onCancel() {
            console.log('Cancel')
        },
    })
}
