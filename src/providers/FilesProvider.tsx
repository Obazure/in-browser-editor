import React, { createContext, FC, useCallback, useContext, useState } from 'react'
import {
    FileStorageElement,
    FileSystemElement,
    FileSystemElementExtension,
    FileType,
    FolderType,
} from '../@types/filesSystem'
import useFileSystem from '../hooks/useFileSystem'
import { isSameElements } from '../utils/fileSystem'
import useFileContentManager from '../hooks/useFileContentManager'
import { writePersistanceStorage } from '../helpers/Storage/local'
import addFileSystemElement from '../helpers/FileSystem/addFileSystemElement'
import deleteFileSystemElement from '../helpers/FileSystem/deleteFileSystemElement'
import changeNameFileSystemElement from '../helpers/FileSystem/changeNameFileSystemElement'
import { Logger, LogType } from '../helpers/Logger/log'

type FilesContextType = {
    fileSystem: FolderType
    openedFile: FileType | null
    openFile: (file: FileType) => void
    selectedElement: FileSystemElement | null
    selectFileSystemElement: (element: FileSystemElement) => void
    createFileSystemElement: (newElement: FileStorageElement, path: string) => void
    renameFileSystemElement: (element: FileSystemElement, newName: string) => void
    removeFileSystemElement: (element: FileSystemElement) => void
    setFileContent: (fullpath: string, content: string) => void
    getFileContent: (fullpath: string) => string
}

const initialFilesContext: FilesContextType = {
    fileSystem: {
        name: 'Project',
        path: '',
        extension: FileSystemElementExtension.FOLDER,
        children: [],
    },
    createFileSystemElement: () => {
        Logger('Could not call Create, Action does not work without provider.', LogType.ERROR)
    },
    renameFileSystemElement: () => {
        Logger('Could not call Rename, Action does not work without provider.', LogType.ERROR)
    },
    removeFileSystemElement: () => {
        Logger('Could not call Remove, Action does not work without provider.', LogType.ERROR)
    },
    selectedElement: null,
    selectFileSystemElement: () => {
        Logger(
            'Could not call select on "File/Folder", Action does not work without provider.',
            LogType.ERROR
        )
    },
    openedFile: null,
    openFile: () => {
        Logger('Could not call openFile, Action does not work without provider.', LogType.ERROR)
    },
    getFileContent: () => {
        Logger('Could not call openFile, Action does not work without provider.', LogType.ERROR)
        return ''
    },
    setFileContent: () => {
        Logger('Could not call openFile, Action does not work without provider.', LogType.ERROR)
    },
}

const FilesContext = createContext<FilesContextType>(initialFilesContext)

export const useFilesProvider = (): FilesContextType => useContext<FilesContextType>(FilesContext)

const FilesProvider: FC = ({ children }) => {
    const fileContentManager = useFileContentManager()
    const [fileSystem, setFileSystem] = useFileSystem(fileContentManager)

    const [openedFile, setOpenedFile] = useState<FileType | null>(null)
    const [selectedElement, setSelectedElement] = useState<FileType | FolderType | null>(null)

    const clearFileFocus = useCallback(
        (file: FileSystemElement | null, target: FileSystemElement, closeAction: Function) => {
            if (`${file?.path}${file?.name}`.startsWith(`${target?.path}${target?.name}`)) {
                closeAction()
            }
        },
        []
    )

    const createFileSystemElement = useCallback(
        (newElement: FileStorageElement, path: string) => {
            setFileSystem(prevState =>
                addFileSystemElement(fileContentManager, prevState, newElement, path)
            )
        },
        [fileContentManager, setFileSystem]
    )

    const renameFileSystemElement = useCallback(
        (target: FileSystemElement, newName: string) => {
            clearFileFocus(openedFile, target, () => setOpenedFile(null))
            clearFileFocus(selectedElement, target, () => setSelectedElement(null))
            setFileSystem(prevState =>
                changeNameFileSystemElement(fileContentManager, prevState, target, newName)
            )
        },
        [clearFileFocus, fileContentManager, openedFile, selectedElement, setFileSystem]
    )

    const removeFileSystemElement = useCallback(
        (target: FileSystemElement) => {
            clearFileFocus(openedFile, target, () => setOpenedFile(null))
            setFileSystem(prevState => {
                return deleteFileSystemElement(fileContentManager, prevState, target)
            })
            setSelectedElement(null)
        },
        [clearFileFocus, fileContentManager, openedFile, setFileSystem]
    )

    const openFile = useCallback((file: FileType) => {
        if (file.extension !== FileSystemElementExtension.FOLDER) {
            setOpenedFile(file)
        }
    }, [])

    const selectFileSystemElement = useCallback(
        (target: FileSystemElement) => {
            if (
                isSameElements(selectedElement, target) &&
                target.extension !== FileSystemElementExtension.FOLDER
            ) {
                openFile(target)
                setSelectedElement(target)
            } else {
                setSelectedElement(target)
            }
        },
        [openFile, selectedElement]
    )

    const setFileContent = useCallback(
        (fullpath: string, content: string) => {
            fileContentManager.set(fullpath, content)
            writePersistanceStorage(fullpath, content)
        },
        [fileContentManager]
    )
    const getFileContent = useCallback(
        (fullpath: string) => {
            return fileContentManager.get(fullpath)
        },
        [fileContentManager]
    )

    return (
        <FilesContext.Provider
            value={{
                fileSystem,
                openedFile,
                openFile,
                selectedElement,
                selectFileSystemElement,
                createFileSystemElement,
                renameFileSystemElement,
                removeFileSystemElement,
                setFileContent,
                getFileContent,
            }}
        >
            {children}
        </FilesContext.Provider>
    )
}

export default FilesProvider
