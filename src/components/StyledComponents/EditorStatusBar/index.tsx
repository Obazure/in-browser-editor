import React, { FC, memo } from 'react'

type Props = {
    lineNumber: number
    fileExtension: string
}

const EditorStatusBar: FC<Props> = ({ fileExtension, lineNumber }) => (
    <div className="editor-status-area">
        <p>{`Line: ${lineNumber}`}</p>
        <p>{`File Extension: ${fileExtension.toUpperCase()}`}</p>
    </div>
)

export default memo(EditorStatusBar)
