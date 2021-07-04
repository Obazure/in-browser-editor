import React from 'react'
import { shallow } from 'enzyme'
import EditorScreen from '.'

describe('components/EditorScreen/index', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<EditorScreen />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
