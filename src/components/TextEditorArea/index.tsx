import React, { FC, useCallback, useMemo } from 'react'
import { useFilesProvider } from '../../providers/FilesProvider'
import { getFullpath } from '../../utils/fileSystem'
import { convertFileExtensionToColor } from '../../utils/style'
import Text from '../StyledComponents/Text'
import TextEditor from './TextEditor'

const placeholder = <Text>Please open file to start coding. (double click to open file.)</Text>

const TextEditorArea: FC = () => {
    const { openedFile, setFileContent, getFileContent } = useFilesProvider()

    const [fullpath, color, extension] = useMemo(() => {
        if (openedFile) {
            const fullpath = getFullpath(openedFile) || ''
            const extension = openedFile.extension
            const color = convertFileExtensionToColor(openedFile.extension) || ''
            return [fullpath, color, extension]
        }
        return ['', '', undefined]
    }, [openedFile])

    const fileContent = useMemo(() => getFileContent(fullpath), [fullpath, getFileContent])

    const onChange = useCallback(
        (payload: string) => {
            setFileContent(fullpath, payload)
        },
        [fullpath, setFileContent]
    )

    return (
        <div className={`editor ${color}-text`}>
            {!openedFile ? (
                placeholder
            ) : (
                <TextEditor
                    contentUniqueKey={fullpath}
                    extension={extension}
                    content={fileContent}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default TextEditorArea
