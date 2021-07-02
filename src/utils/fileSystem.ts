import {
    FileSystemElement,
    FileSystemElementExtension,
    FileStorageElement,
    StoredFileType,
    StoredFolderType,
    FolderType,
} from '../@types/filesSystem'
import convertStoreToFileSystem from '../helpers/FileSystem/convertStorageToFileSystem'
import { FileContentManager } from '../hooks/useFileContentManager'

export const createFile = (name: string): StoredFileType => ({ name })
export const createFolder = (folderName: string): StoredFolderType => ({
    name: folderName,
    children: [],
})

export const findElementExtension = (
    element: FileSystemElement | FileStorageElement
): FileSystemElementExtension => {
    const fileFormat = findFileFormat(element.name)
    return 'children' in element && Array.isArray(element.children)
        ? FileSystemElementExtension.FOLDER
        : findExtension(fileFormat)
}

export const findExtension = (fileFormat: string): FileSystemElementExtension =>
    Object.values(FileSystemElementExtension).find(i => i === fileFormat) ||
    FileSystemElementExtension.FILE

export const findFileFormat = (name: string): string => {
    let format
    const idx = name.lastIndexOf('.')
    if (idx !== -1) {
        format = name.split('.').pop()?.trim().toLowerCase()
    }
    return format || FileSystemElementExtension.FILE
}

export const initFileStorage = (contentManager: FileContentManager): FolderType =>
    convertStoreToFileSystem(contentManager, {
        name: 'Project',
        children: [
            {
                name: 'assets',
                children: [{ name: 'index.css' }, { name: 'index.js' }],
            },
            { name: 'public', children: [{ name: 'index.html' }] },
            { name: 'src', children: [] },
            { name: 'package.json' },
        ],
    }) as FolderType

export const getFullpath = (element: FileSystemElement): string => {
    const path = `${element.path}${element.name}`
    if (
        'children' in element ||
        ('extension' in element && element.extension === FileSystemElementExtension.FOLDER)
    ) {
        return `${path}/`
    }
    return `${path}`
}

/**
 * Sorting files order is:
 * - folders first, sorted by alphabet
 * - then files, sorted by alpabet as well
 */
export const sortFileSystem = (a: FileSystemElement, b: FileSystemElement): 1 | 0 | -1 => {
    if (
        (a.extension !== FileSystemElementExtension.FOLDER &&
            b.extension !== FileSystemElementExtension.FOLDER) ||
        (a.extension === FileSystemElementExtension.FOLDER &&
            b.extension === FileSystemElementExtension.FOLDER)
    ) {
        return a.name < b.name ? -1 : 1
    } else if (
        a.extension === FileSystemElementExtension.FOLDER &&
        b.extension !== FileSystemElementExtension.FOLDER
    ) {
        return -1
    }
    return 1
}

export const isSameElements = (
    A?: FileSystemElement | null,
    B?: FileSystemElement | null
): boolean => A?.name === B?.name && A?.path === B?.path && A?.extension === B?.extension
