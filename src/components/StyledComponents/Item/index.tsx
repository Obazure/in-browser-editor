import React, { FC, memo, useCallback, useMemo } from 'react'
import { FileSystemElement } from '../../../@types/filesSystem'
import { convertFileExtensionToIcon, convertFileExtensionToColor } from '../../../utils/style'
import Icon from '../Icon'
import Text from '../Text'

type Props = {
    item: FileSystemElement
    selected?: boolean
    opened?: boolean
    onClick?: (item: FileSystemElement) => void
    onDoubleClick?: (item: FileSystemElement) => void
}

const Item: FC<Props> = ({ item, selected = false, opened = false, onClick, onDoubleClick }) => {
    const handleClick = useCallback(() => {
        onClick && onClick(item)
    }, [item, onClick])
    const handleDoubleClick = useCallback(() => {
        onDoubleClick && onDoubleClick(item)
    }, [item, onDoubleClick])

    const type = useMemo(() => convertFileExtensionToIcon(item.extension), [item.extension])
    const color = useMemo(() => convertFileExtensionToColor(item.extension), [item.extension])
    const cssClasses = useMemo(
        () => `${selected ? 'selected' : ''} ${opened ? 'opened' : ''}`,
        [opened, selected]
    )
    return (
        <a onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <div className={`item ${cssClasses}`}>
                <Icon type={type} color={color} />
                <Text color={color}>{item.name}</Text>
            </div>
        </a>
    )
}

export default memo(Item)
