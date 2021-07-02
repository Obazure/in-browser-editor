export enum FileSystemElementExtension {
    JS = 'js',
    CSS = 'css',
    HTML = 'html',
    JSON = 'json',
    FOLDER = 'folder',
    FILE = 'file',
}

export type StoredFileType = {
    name: string
}

export type StoredFolderType = StoredFileType & {
    children: (StoredFolderType | StoredFileType)[]
}

export type FileStorageElement = StoredFileType | StoredFolderType

export type FileType = StoredFileType & {
    path: string
    extension: FileSystemElementExtension
}

export type FolderType = FileType & {
    extension: FileSystemElementExtension.FOLDER
    children: (FolderType | FileType)[]
}

export type FileSystemElement = FileType | FolderType
