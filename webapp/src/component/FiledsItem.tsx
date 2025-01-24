import { DatePicker, Input, TimePicker } from 'antd'
import React, { Fragment } from 'react'

type fieldType = 'text' | 'time' | 'date'
type ComponentMap = {
    text: typeof Input
    time: typeof TimePicker
    date: typeof DatePicker
}

interface props<T extends fieldType = 'text'> {
    label: string
    type: T
    props: Parameters<ComponentMap[T]>['0']
}

type FiledComponents = <T extends fieldType>(props: props<T>) => React.ReactNode

export const FiledItem: FiledComponents = ({ type, props }) => {
    const InputComponent = getInputComponent(type)
    // @ts-ignore
    return <InputComponent {...props} />
}

// @ts-ignore
const getInputComponent: <T extends fieldType = 'text'>(
    type: T
) => ComponentMap[T] = type => {
    switch (type) {
        case 'text':
            return Input
        case 'time':
            return TimePicker
        case 'date':
            return DatePicker
        default:
            return Fragment
    }
}
