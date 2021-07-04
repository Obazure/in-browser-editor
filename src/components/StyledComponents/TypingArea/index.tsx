import React, { FC, MutableRefObject, useCallback } from 'react'

type Props = {
    editorRef: MutableRefObject<HTMLDivElement | null>
    onChange: (area: HTMLDivElement) => void
}

const TypingArea: FC<Props> = ({ editorRef, onChange }) => {
    const onPress = useCallback(
        event => {
            const innerHtml = event.target.innerHTML
            if (innerHtml === '') {
                event.target.innerHTML = `<p><br/></p>`
            } else if (!innerHtml.includes('<p>')) {
                event.target.innerHTML = `<p>${innerHtml}</p>`
            }
            onChange(event.target)
        },
        [onChange]
    )

    return (
        <div
            id="editor"
            contentEditable="true"
            spellCheck="false"
            onKeyUp={onPress}
            suppressContentEditableWarning={true}
            ref={editorRef}
        />
    )
}

export default TypingArea
