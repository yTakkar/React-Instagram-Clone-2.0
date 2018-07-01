import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Untag, { PureUntag } from '../untag'
import { shallow } from 'enzyme'

describe('Untag Component', () => {
  const mockFn = jest.fn()
  const props = {
    post_id: 44,
    user: 7,
    decrementTags: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Untag {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock untag action', () => {
    const wrapper = shallow(<PureUntag {...props} dispatch={mockFn} />)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
