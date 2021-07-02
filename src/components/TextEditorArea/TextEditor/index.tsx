import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { FileSystemElementExtension } from '../../../@types/filesSystem'
import TypingArea from '../../StyledComponents/TypingArea'
import EditorStatusBar from '../../StyledComponents/EditorStatusBar'

type Props = {
    contentUniqueKey: string // trigger reinit default value, when changed
    extension?: FileSystemElementExtension
    content: string
    onChange: (text: string) => void
}

const TextEditor: FC<Props> = ({
    contentUniqueKey,
    content,
    extension = FileSystemElementExtension.FILE,
    onChange,
}) => {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const init = useRef<string>('')
    const [lineNumber, setLineNumber] = useState<number>(0)

    useEffect(() => {
        if (editorRef.current && init.current !== contentUniqueKey) {
            init.current = contentUniqueKey
            editorRef.current.innerHTML = content
            setLineNumber(editorRef.current.children.length)
        }
    }, [content, contentUniqueKey])

    const handleChange = useCallback(
        (area: HTMLDivElement) => {
            onChange(area.innerHTML)
            setLineNumber(area.children.length)
        },
        [onChange]
    )

    return (
        <>
            <TypingArea editorRef={editorRef} onChange={handleChange} />
            <EditorStatusBar lineNumber={lineNumber} fileExtension={extension} />
        </>
    )
}

export default TextEditor
