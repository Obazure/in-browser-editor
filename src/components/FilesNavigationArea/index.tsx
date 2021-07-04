import React, { FC, useCallback } from 'react'
import { FileSystemElement, FileSystemElementExtension } from '../../@types/filesSystem'
import { useFilesProvider } from '../../providers/FilesProvider'
import NavigationItem from './NavigationItem'
import ManageBar from './ManageBar'

const FilesNavigationArea: FC = () => {
    const { fileSystem, selectedElement, openedFile, selectFileSystemElement, openFile } =
        useFilesProvider()

    const onClick = useCallback(
        (item: FileSystemElement) => {
            selectFileSystemElement(item)
        },
        [selectFileSystemElement]
    )
    const onDoubleClick = useCallback(
        (item: FileSystemElement) => {
            if (item.extension !== FileSystemElementExtension.FOLDER) {
                openFile(item)
                selectFileSystemElement(item)
            }
        },
        [openFile, selectFileSystemElement]
    )

    return (
        <>
            <ManageBar />
            <div className="navigation-tree">
                <NavigationItem
                    item={fileSystem}
                    selectedElement={selectedElement}
                    openedFile={openedFile}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                />
            </div>
        </>
    )
}

export default FilesNavigationArea
