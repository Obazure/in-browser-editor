import React, { FC, memo, useCallback } from 'react'
import { FileStorageElement, FileSystemElementExtension } from '../../../@types/filesSystem'
import useModal from '../../../hooks/useModal'
import { useFilesProvider } from '../../../providers/FilesProvider'
import { createFile, createFolder, getFullpath } from '../../../utils/fileSystem'
import CreateFileIcon from '../../StyledComponents/Icon/CreateFileIcon'
import CreateFolderIcon from '../../StyledComponents/Icon/CreateFolderIcon'
import RemoveIcon from '../../StyledComponents/Icon/RemoveIcon'
import RenameIcon from '../../StyledComponents/Icon/RenameIcon'

const FileSystemManageBar: FC = () => {
    const {
        selectedElement,
        createFileSystemElement,
        renameFileSystemElement,
        removeFileSystemElement,
    } = useFilesProvider()
    const [modal, openModal] = useModal()

    const handleCreate = useCallback(
        (file: FileStorageElement) => {
            /**
             * if selected Folder, then create in it
             * if selected File, then create near it
             * if selected null, then create in root
             */
            let path = '/'
            if (selectedElement?.extension === FileSystemElementExtension.FOLDER) {
                path = getFullpath(selectedElement)
            } else if (selectedElement?.path) {
                path = selectedElement.path
            }
            createFileSystemElement(file, path)
        },
        [createFileSystemElement, selectedElement]
    )

    const handleCreateFile = useCallback(() => {
        const newFile = createFile('')
        const onSubmit = (text: string) => {
            newFile.name = text
            handleCreate(newFile)
        }
        openModal(onSubmit, FileSystemElementExtension.FILE)
    }, [handleCreate, openModal])

    const handleCreateFolder = useCallback(() => {
        const newFolder = createFolder('')
        const onSubmit = (text: string) => {
            newFolder.name = text
            handleCreate(newFolder)
        }
        openModal(onSubmit, FileSystemElementExtension.FOLDER)
    }, [handleCreate, openModal])

    const handleRename = useCallback(() => {
        if (!selectedElement) {
            return
        }
        const onSubmit = (newName: string) => {
            renameFileSystemElement(selectedElement, newName)
        }
        openModal(onSubmit, selectedElement.extension, selectedElement.name)
    }, [openModal, renameFileSystemElement, selectedElement])

    const handleRemove = useCallback(() => {
        if (!selectedElement) {
            return
        }
        removeFileSystemElement(selectedElement)
    }, [removeFileSystemElement, selectedElement])

    return (
        <div className="manage-bar">
            {modal}
            <CreateFileIcon onPress={handleCreateFile} />
            <CreateFolderIcon onPress={handleCreateFolder} />
            {selectedElement?.path ? (
                <>
                    <RenameIcon onPress={handleRename} />
                    <RemoveIcon onPress={handleRemove} />
                </>
            ) : null}
        </div>
    )
}

export default memo(FileSystemManageBar)
