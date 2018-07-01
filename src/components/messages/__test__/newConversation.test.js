import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import NewConversation, { PureNewConversation } from '../newConversation'
import { shallow } from 'enzyme'

describe('NewConversation Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <NewConversation />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <SearchFollowings/> when button is clicked', () => {
    const wrapper = shallow(<PureNewConversation />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('SearchFollowings').exists()).toBe(true)
  })
})
