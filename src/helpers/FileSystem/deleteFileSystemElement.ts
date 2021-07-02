import { FileSystemElement, FileSystemElementExtension, FolderType } from '../../@types/filesSystem'
import { FileContentManager } from '../../hooks/useFileContentManager'
import { getFullpath } from '../../utils/fileSystem'

const cleanFileSystemElement = (
    targetPlace: FileSystemElement,
    paths: string[],
    fileExtension: FileSystemElementExtension
): void => {
    if ('children' in targetPlace) {
        if (paths.length > 1) {
            const nextNode = targetPlace.children.find(({ name }) => name === paths[0])
            if (nextNode) {
                cleanFileSystemElement(nextNode, paths.slice(1), fileExtension)
            }
        } else {
            targetPlace.children = targetPlace.children.filter(
                ({ name, extension }) => !(name === paths[0] && extension === fileExtension)
            )
        }
    }
}

/**
 * returns new instance of the FileSystem
 */
const deleteFileSystemElement = (
    fileContentManager: FileContentManager,
    targetPlace: FolderType,
    target: FileSystemElement
): FolderType => {
    const fullpath = getFullpath(target)
    fileContentManager.delete(fullpath)

    const paths = target.path.split('/').slice(1, -1)
    paths.push(target.name)
    const newFileSystem: FolderType = JSON.parse(JSON.stringify(targetPlace))
    cleanFileSystemElement(newFileSystem, paths, target.extension)
    return newFileSystem
}

export default deleteFileSystemElement
