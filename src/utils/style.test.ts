import { FileSystemElementExtension } from '../@types/filesSystem'
import { convertFileExtensionToColor, convertFileExtensionToIcon } from './style'

describe('utils/style', () => {
    it('should convertFileExtensionToIcon', () => {
        const icons = []
        for (const ext of Object.values(FileSystemElementExtension)) {
            icons.push(convertFileExtensionToIcon(ext))
        }
        expect(icons).toEqual([
            'fab fa-js-square',
            'fab fa-css3-alt',
            'fab fa-html5',
            'fas fa-file-code',
            'fas fa-folder',
            'fas fa-file',
        ])
    })

    it('should convertFileExtensionToColor', () => {
        const colors = []
        for (const ext of Object.values(FileSystemElementExtension)) {
            colors.push(convertFileExtensionToColor(ext))
        }
        expect(colors).toEqual(['js', 'css', 'html', 'json', 'folder', 'file'])
    })
})
