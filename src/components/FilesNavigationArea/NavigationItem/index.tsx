import React, { FC, memo, useMemo } from 'react'
import { FileSystemElement, FileSystemElementExtension } from '../../../@types/filesSystem'
import { isSameElements } from '../../../utils/fileSystem'
import StyledItem from '../../StyledComponents/Item'

type Props = {
    item: FileSystemElement
    selectedElement: FileSystemElement | null
    openedFile: FileSystemElement | null
    onClick: (file: FileSystemElement) => void
    onDoubleClick: (file: FileSystemElement) => void
}

const NavigationItem: FC<Props> = ({
    item,
    openedFile,
    selectedElement,
    onClick,
    onDoubleClick,
}) => {
    const ItemComponent = useMemo(() => {
        return (
            <StyledItem
                item={item}
                selected={isSameElements(selectedElement, item)}
                opened={isSameElements(openedFile, item)}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
            />
        )
    }, [item, onClick, onDoubleClick, openedFile, selectedElement])

    if (item.extension === FileSystemElementExtension.FOLDER) {
        return (
            <>
                {ItemComponent}
                {'children' in item ? (
                    <div className="folder">
                        {item.children.map(subitem => (
                            <NavigationItem
                                key={`${item.name}-${subitem.name}-${subitem.extension}`}
                                item={subitem}
                                selectedElement={selectedElement}
                                openedFile={openedFile}
                                onClick={onClick}
                                onDoubleClick={onDoubleClick}
                            />
                        ))}
                    </div>
                ) : null}
            </>
        )
    }
    return ItemComponent
}

export default memo(NavigationItem)
