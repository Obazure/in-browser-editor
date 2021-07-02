import { FileStorageElement, FileSystemElement, FolderType } from '../../@types/filesSystem'
import { FileContentManager } from '../../hooks/useFileContentManager'
import { isSameElements, sortFileSystem } from '../../utils/fileSystem'
import convertStorageToFileSystem from './convertStorageToFileSystem'

const attachFileSystemElement = (
    target: FileSystemElement,
    targetPlace: FileSystemElement,
    paths: string[]
): void => {
    if (paths.length > 0) {
        const nextTargetPlace =
            'children' in targetPlace && targetPlace.children.find(({ name }) => name === paths[0])
        if (nextTargetPlace) {
            attachFileSystemElement(target, nextTargetPlace, paths.slice(1))
        }
    } else {
        if ('children' in targetPlace) {
            const existIdx = targetPlace.children.findIndex(element =>
                isSameElements(element, target)
            )
            if (existIdx === -1) {
                targetPlace.children.push(target)
                targetPlace.children = targetPlace.children?.sort(sortFileSystem)
            }
        }
    }
}

/**
 * returns new instance of the FileSystem
 */
const addFileSystemElement = (
    fileContentManager: FileContentManager,
    fileSystem: FolderType,
    target: FileStorageElement,
    path: string
): FolderType => {
    const newFileSystem: FolderType = JSON.parse(JSON.stringify(fileSystem))
    const paths = path.split('/').slice(1, -1)
    const targetElement = convertStorageToFileSystem(fileContentManager, target, path)
    attachFileSystemElement(targetElement, newFileSystem, paths)
    return newFileSystem
}

export default addFileSystemElement
