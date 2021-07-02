import React, { FC } from 'react'
import './styles/variables.css'
import './styles/style.css'
import EditorScreen from './components/EditorScreen'
import FilesProvider from './providers/FilesProvider'

const App: FC = () => {
    return (
        <FilesProvider>
            <EditorScreen />
        </FilesProvider>
    )
}

export default App
