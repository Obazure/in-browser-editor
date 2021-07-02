import { FileSystemElement, FileStorageElement } from '../../@types/filesSystem'

const collectFilesSystemToStorage = (fileSystemElement: FileSystemElement): FileStorageElement => {
    if ('children' in fileSystemElement) {
        return {
            name: fileSystemElement.name,
            children: fileSystemElement.children.map<FileStorageElement>(element =>
                collectFilesSystemToStorage(element)
            ),
        }
    }
    return {
        name: fileSystemElement.name,
    }
}

export default collectFilesSystemToStorage
