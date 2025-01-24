import { themes } from '@visactor/vtable'
import { useRef } from 'react'
import * as ReactVTable from '@visactor/react-vtable'
import { MyEditor } from '../editor'
import { Auto, Date } from './index'

const autoEditor = new MyEditor(Auto)
const dateEditor = new MyEditor(Date)

ReactVTable.register.editor('auto-input', autoEditor)
ReactVTable.register.editor('date-input', dateEditor)

export const OrderTable = ({ data, columns }) => {
    const ref = useRef(null)
    const handleClick = () => {
        console.log(ref.current)
    }
    const handelChangeValue = v => {
        const { row, col, changedValue } = v
        ref.current.updateRecords(
            [
                [1, 1, 1],
                [1, 2, 3],
            ],
            [row - 1, row]
        )
        console.log(ref.current)
    }

    const handleAddRow = () => {
        ref.current.addRecords([[]])
    }

    return (
        <div className="flex flex-1 h-full outline outline-solid outline-coolgray">
            <ReactVTable.ListTable
                ref={ref}
                overscrollBehavior="none"
                onChangeCellValue={handelChangeValue}
                columns={columns}
                onClickCell={handleClick}
                records={data}
                theme={themes.TableTheme}
            />
        </div>
    )
}
