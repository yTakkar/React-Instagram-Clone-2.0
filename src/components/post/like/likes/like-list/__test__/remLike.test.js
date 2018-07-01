import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import RemoveLikeAsAdmin, { PureRemoveLikeAsAdmin } from '../remLike'
import { shallow } from 'enzyme'

describe('RemoveLikeAsAdmin Component', () => {
  const mockFn = jest.fn()
  const props = {
    like_id: 44,
    decrementLikes: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <RemoveLikeAsAdmin {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeLike action when button is clicked', () => {
    const wrapper = shallow(
      <PureRemoveLikeAsAdmin {...props} dispatch={mockFn} />
    )
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
