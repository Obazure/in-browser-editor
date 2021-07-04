import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import EditorScreen from './components/EditorScreen'
import FilesProvider from './providers/FilesProvider'

describe('App', () => {
    it('should render corectly', () => {
        const wrapper = shallow(<App />)
        const filesProvider = wrapper.find(FilesProvider)
        expect(filesProvider).toHaveLength(1)
        const editorScreen = filesProvider.find(EditorScreen)
        expect(editorScreen).toHaveLength(1)
    })
    it('should render page matching snapshot', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
