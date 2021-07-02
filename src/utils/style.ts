import { FileSystemElementExtension } from '../@types/filesSystem'
import { Color, IconTypes } from '../@types/style'

export const convertFileExtensionToIcon = (elementType: FileSystemElementExtension): IconTypes => {
    switch (elementType) {
        case FileSystemElementExtension.JS:
            return IconTypes.JS
        case FileSystemElementExtension.CSS:
            return IconTypes.CSS
        case FileSystemElementExtension.HTML:
            return IconTypes.HTML
        case FileSystemElementExtension.FOLDER:
            return IconTypes.FOLDER
        case FileSystemElementExtension.JSON:
            return IconTypes.JSON
        default:
            return IconTypes.FILE
    }
}

export const convertFileExtensionToColor = (elementType: FileSystemElementExtension): Color => {
    switch (elementType) {
        case FileSystemElementExtension.JS:
            return Color.JS
        case FileSystemElementExtension.JSON:
            return Color.JSON
        case FileSystemElementExtension.CSS:
            return Color.CSS
        case FileSystemElementExtension.HTML:
            return Color.HTML
        case FileSystemElementExtension.FOLDER:
            return Color.FOLDER
        default:
            return Color.FILE
    }
}
