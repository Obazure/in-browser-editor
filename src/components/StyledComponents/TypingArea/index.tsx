/* eslint-disable no-console */
import React, { FC, MutableRefObject, useCallback } from 'react'

type Props = {
    editorRef: MutableRefObject<HTMLDivElement | null>
    onChange: (area: HTMLDivElement) => void
}

const TypingArea: FC<Props> = ({ editorRef, onChange }) => {
    const onKeyPress = useCallback(
        event => {
            setTimeout(() => {
                const innerHtml = event.target.innerHTML
                if (innerHtml === '') {
                    event.target.innerHTML = `<p><br/></p>`
                } else if (!innerHtml.includes('<p>')) {
                    event.target.innerHTML = `<p>${innerHtml}</p>`
                }
                onChange(event.target)
            }, 0)
        },
        [onChange]
    )

    return (
        <div
            id="editor"
            contentEditable="true"
            spellCheck="false"
            onKeyDown={onKeyPress}
            suppressContentEditableWarning={true}
            ref={editorRef}
        />
    )
}

export default TypingArea
