import React, { ReactElement, useCallback, useState } from 'react'
import { OnTextSubmit } from '../@types/component'
import { FileSystemElementExtension } from '../@types/filesSystem'
import ElementNameModal from '../components/StyledComponents/ElementNameModal'

type Modal = ReactElement | null
type OpenModal = (
    onSubmit: OnTextSubmit,
    elementType?: FileSystemElementExtension,
    prevName?: string
) => void

const useModal = (): [Modal, OpenModal] => {
    const [modal, setModal] = useState<Modal>(null)

    const onModalClose = useCallback(() => {
        setModal(null)
    }, [])

    const openModal = useCallback<OpenModal>(
        (onSubmit, elementType, defaultValue) => {
            const handleSubmit = (text: string) => {
                onSubmit(text)
                setModal(null)
            }
            const label = `Please enter the name ${elementType ? `for ${elementType}` : ''}.`

            const modal = (
                <ElementNameModal
                    defaultValue={defaultValue}
                    label={label}
                    onSubmit={handleSubmit}
                    onClose={onModalClose}
                />
            )
            setModal(modal)
        },
        [onModalClose]
    )

    return [modal, openModal]
}

export default useModal
