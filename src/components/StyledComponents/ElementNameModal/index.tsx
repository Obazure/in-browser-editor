import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { OnTextSubmit } from '../../../@types/component'
import { Color, IconTypes } from '../../../@types/style'
import OverlayLayout from '../../../layouts/OverlayLayout'
import { validateFileName } from '../../../utils/fileSystem'
import Icon from '../Icon'
import Text from '../Text'

type Props = {
    defaultValue?: string
    onSubmit: OnTextSubmit
    onClose: () => void
}

const ElementNameModal: FC<Props> = ({ defaultValue = '', onSubmit, onClose }) => {
    const init = useRef(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [text, setText] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (init.current) {
            setErrorMessage('')
            if (inputRef.current) {
                inputRef.current.value = defaultValue
                inputRef.current.focus()
            }
        }
    }, [defaultValue])

    const validateText = useCallback((value: string): boolean => {
        const errors = validateFileName(value)
        if (errors.length > 0) {
            setErrorMessage(errors.join(' '))
            return false
        }
        setErrorMessage('')
        return true
    }, [])

    const handleClose = useCallback(() => {
        onClose && onClose()
    }, [onClose])

    const handleSubmit = useCallback(() => {
        if (validateText(text)) {
            onSubmit && onSubmit(text)
        }
    }, [onSubmit, text, validateText])

    const onChange = useCallback(
        event => {
            const nextValue = event.target.value
            setText(nextValue)
            validateText(nextValue)
        },
        [validateText]
    )

    return (
        <OverlayLayout>
            <div>
                <div className="close">
                    <Icon type={IconTypes.CLOSE} onPress={handleClose} />
                </div>
                <div className="line">
                    <Text color={Color.TEXT}>Please enter the name</Text>
                </div>
                <div className="line">
                    <Text color={Color.ERROR}>{errorMessage}</Text>
                </div>
                <div className="line">
                    <input ref={inputRef} onChange={onChange} />
                </div>
                <div className="line">
                    <button onClick={handleSubmit}>submit</button>
                </div>
            </div>
        </OverlayLayout>
    )
}

export default memo(ElementNameModal)
