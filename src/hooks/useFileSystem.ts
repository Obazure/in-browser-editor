import { useEffect, useState } from 'react'
import { FolderType } from '../@types/filesSystem'
import { initFileStorage } from '../utils/fileSystem'
import { readPersistanceStorage, writePersistanceStorage } from '../helpers/Storage/local'
import collectFileSystemToStorage from '../helpers/FileSystem/collectFileSystemToStorage'
import convertStorageToFileSystem from '../helpers/FileSystem/convertStorageToFileSystem'
import { FileContentManager } from './useFileContentManager'

const storageKey = 'file_storage_b2205b69-4643-4fdb-9cab-116a37b553a0'

const fetchInitialFileSystem = (contentManager: FileContentManager): FolderType => {
    let initValue
    const persistanceValue = readPersistanceStorage<FolderType>(storageKey)
    if (persistanceValue) {
        initValue = convertStorageToFileSystem(contentManager, persistanceValue) as FolderType
    } else {
        initValue = initFileStorage(contentManager)
    }
    return initValue
}

const persistFileSystem = (state: FolderType): void => {
    const store = collectFileSystemToStorage(state)
    writePersistanceStorage(storageKey, store)
}

const useFileSystem = (
    fileContentManager: FileContentManager
): [FolderType, React.Dispatch<React.SetStateAction<FolderType>>] => {
    const [fileSystem, setFileSystem] = useState<FolderType>(
        fetchInitialFileSystem(fileContentManager)
    )

    useEffect(() => {
        persistFileSystem(fileSystem)
    }, [fileSystem])

    return [fileSystem, setFileSystem]
}

export default useFileSystem
