import { FileSystemElement, FileSystemElementExtension, FolderType } from '../../@types/filesSystem'
import { FileContentManager } from '../../hooks/useFileContentManager'
import { getFullpath } from '../../utils/fileSystem'
import convertStorageToFileSystem from './convertStorageToFileSystem'

const renameFileSystemElement = (
    fileContentManager: FileContentManager,
    newName: string,
    targetPlace: FileSystemElement,
    paths: string[],
    targetExtension: FileSystemElementExtension
): void => {
    if (paths.length > 1) {
        const nextTargetPlace =
            'children' in targetPlace && targetPlace.children.find(({ name }) => name === paths[0])
        if (nextTargetPlace) {
            renameFileSystemElement(
                fileContentManager,
                newName,
                nextTargetPlace,
                paths.slice(1),
                targetExtension
            )
        }
    } else {
        if ('children' in targetPlace) {
            const targetElement = targetPlace.children.find(
                ({ name, extension }) => name === paths[0] && extension === targetExtension
            )
            if (targetElement) {
                targetElement.name = newName
                const converted = convertStorageToFileSystem(
                    fileContentManager,
                    targetPlace,
                    targetPlace.path
                )
                if ('children' in converted) {
                    targetPlace.children = converted.children
                }
            }
        }
    }
}

/**
 * returns new instance of the FileSystem
 */
const changeNameFileSystemElement = (
    fileContentManager: FileContentManager,
    fileSystem: FolderType,
    targetElement: FileSystemElement,
    newName: string
): FolderType => {
    const renamedTarget = { ...targetElement, name: newName }
    const fullpath = getFullpath(targetElement)
    const newPath = getFullpath(renamedTarget)
    fileContentManager.rename(fullpath, newPath)

    const paths = targetElement.path.split('/').slice(1, -1)
    paths.push(targetElement.name)
    const newFileSystem: FolderType = JSON.parse(JSON.stringify(fileSystem))
    renameFileSystemElement(
        fileContentManager,
        newName,
        newFileSystem,
        paths,
        targetElement.extension
    )
    return newFileSystem
}

export default changeNameFileSystemElement
