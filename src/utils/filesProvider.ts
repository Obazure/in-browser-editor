import { FileSystemElementExtension } from '../@types/filesSystem'
import { Logger, LogType } from '../helpers/Logger/log'
import { FilesContextType } from '../providers/FilesProvider'

export const initialFilesContext: FilesContextType = {
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
