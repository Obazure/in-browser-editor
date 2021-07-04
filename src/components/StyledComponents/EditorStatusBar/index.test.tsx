import React from 'react'
import { shallow } from 'enzyme'
import EditorStatusBar from '.'

describe('components/EditorStatusArea/index', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<EditorStatusBar lineNumber={2} fileExtension="JS" />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
