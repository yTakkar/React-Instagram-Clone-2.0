import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import DeleteConversation, { PureDeleteConversation } from '../deleteCon'
import { shallow } from 'enzyme'

describe('DeleteConversation Component', () => {
  const mockFn = jest.fn()
  const props = {
    toggleOptions: mockFn,
    hideConversation: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <DeleteConversation {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on delete option', () => {
    const wrapper = shallow(<PureDeleteConversation {...props} />)
    wrapper.find('.dlt_con').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it("should mock deleteConversation action when clicked on Prompt's action button", () => {
    const wrapper = shallow(<PureDeleteConversation {...props} />)
    wrapper.setState({ deleteCon: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
