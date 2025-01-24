import { DatePicker } from 'antd'

export const Date = ({
    onChange = str => {},
    root,
    editor,
    cellValue,
    ...rest
}) => {
    const { endEdit } = editor

    return (
        <>
            <DatePicker
                getPopupContainer={() => root}
                onChange={(date, dateStr) => {
                    onChange(dateStr)
                    endEdit()
                }}
            />
        </>
    )
}
