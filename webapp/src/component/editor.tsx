import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { EditContext, IEditor } from '@visactor/vtable-editors'
import React from 'react'

const theme = {
    token: {
        colorBorder: 'transparent',
    },
}
interface EditorRender {
    root: HTMLElement
    editor: EditContext<string>
    onChange: (value: string) => void
    cellValue: string
    [k: string]: any
}

export class MyEditor implements IEditor {
    root: any
    element: HTMLElement
    container: HTMLElement
    renderCom: (props: EditorRender) => React.ReactElement
    currentValue: string
    constructor(reactComponent: (props: EditorRender) => React.ReactElement) {
        this.root = null
        this.element = null
        this.container = null
        this.renderCom = reactComponent
    }
    onStart(editorContext: EditContext<string>) {
        const { container, referencePosition, value } = editorContext
        this.container = container
        this.createElement(editorContext)
        value && this.setValue(value)
        ;(null == referencePosition ? void 0 : referencePosition.rect) &&
            this.adjustPosition(referencePosition.rect)
    }

    createElement(editorContext) {
        const { value: defaultValue } = editorContext
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.width = '100%'
        div.style.padding = '1px'
        div.style.boxSizing = 'border-box'
        div.style.backgroundColor = 'white'
        this.container.appendChild(div)
        this.root = createRoot(div)
        const View = this.renderCom
        this.root.render(
            <ConfigProvider theme={theme}>
                <View
                    root={div}
                    editor={editorContext}
                    cellValue={defaultValue}
                    style={{ width: '100%', height: '100%' }}
                    onChange={value => {
                        this.currentValue = value
                        console.log(this.currentValue)
                    }}
                    variant="borderless"
                />
            </ConfigProvider>
        )
        this.element = div
    }

    getValue() {
        console.log('get', this.currentValue)

        return this.currentValue
    }

    setValue(value) {
        this.currentValue = value
    }

    adjustPosition(rect) {
        if (this.element) {
            ;(this.element.style.top = rect.top + 'px'),
                (this.element.style.left = rect.left + 'px'),
                (this.element.style.width = rect.width + 'px'),
                (this.element.style.height = rect.height + 'px')
        }
    }

    onEnd() {
        this.root.unmount()
        this.container.removeChild(this.element)
    }

    isEditorElement(target) {
        console.log(target)
        return this.element?.contains(target)
    }
}
