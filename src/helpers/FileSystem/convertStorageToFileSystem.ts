import {
    FileSystemElement,
    FileSystemElementExtension,
    FileStorageElement,
    FolderType,
} from '../../@types/filesSystem'
import { findElementExtension, getFullpath, sortFileSystem } from '../../utils/fileSystem'
import { FileContentManager } from '../../hooks/useFileContentManager'

const convertStorageToFileSystem = (
    filesContentsManager: FileContentManager,
    storageElement: FileStorageElement,
    pathPrefix = ''
): FileSystemElement => {
    const extension = findElementExtension(storageElement)
    const name = storageElement.name

    if (extension === FileSystemElementExtension.FOLDER) {
        const childrenPath = pathPrefix ? `${pathPrefix}${name}/` : '/'
        const children =
            'children' in storageElement
                ? storageElement.children
                      .map(element =>
                          convertStorageToFileSystem(filesContentsManager, element, childrenPath)
                      )
                      .sort(sortFileSystem)
                : []
        return {
            name,
            extension,
            path: pathPrefix,
            children,
        } as FolderType
    }

    const file = {
        name,
        extension,
        path: pathPrefix,
    }
    const fullpath = getFullpath(file)
    filesContentsManager.init(fullpath) // requests are initiate it
    return file
}

export default convertStorageToFileSystem
