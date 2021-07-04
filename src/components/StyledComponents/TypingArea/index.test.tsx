import React from 'react'
import { shallow } from 'enzyme'
import TypingArea from '.'

describe('components/StyleComponents/TypingArea/index', () => {
    const mockOnChange = jest.fn()

    beforeEach(jest.resetAllMocks)

    it('should render correctly', () => {
        const ref = { current: null }
        const wrapper = shallow(<TypingArea editorRef={ref} onChange={mockOnChange} />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('should place placeholder for innerHtml', () => {
        const ref = { current: null }
        const wrapper = shallow(<TypingArea editorRef={ref} onChange={mockOnChange} />)
        const editor = wrapper.find('div')
        const event = {
            target: { innerHTML: 'some-text' },
        }
        editor.simulate('keyUp', event)
        expect(mockOnChange).toBeCalledWith({ innerHTML: '<p>some-text</p>' })

        event.target.innerHTML = ''
        editor.simulate('keyUp', event)
        expect(mockOnChange.mock.calls[1][0]).toEqual({ innerHTML: '<p><br/></p>' })
    })
})
