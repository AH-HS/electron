import { AutoComplete } from 'antd'
import { useState } from 'react'

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
})

const getPanelValue = searchText =>
    !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]

export const Auto = ({ onChange = value => {}, root, cellValue, ...rest }) => {
    const [options, setOptions] = useState(getPanelValue(''))
    return (
        <AutoComplete
            {...rest}
            autoFocus
            getPopupContainer={() => root}
            onChange={onChange}
            options={options}
            onSearch={text => setOptions(getPanelValue(text))}
        />
    )
}
