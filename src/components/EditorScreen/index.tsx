import React, { FC } from 'react'
import FilesNavigationArea from '../FilesNavigationArea'
import HeaderArea from '../HeaderArea'
import TextEditorArea from '../TextEditorArea'

const EditorScreen: FC = () => {
    return (
        <div className="fullscreen">
            <HeaderArea />
            <div className="workspace">
                <div id="files-navigation">
                    <FilesNavigationArea />
                </div>
                <div id="code-editor-area">
                    <TextEditorArea />
                </div>
            </div>
        </div>
    )
}

export default EditorScreen
