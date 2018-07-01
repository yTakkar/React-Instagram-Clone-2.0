import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import EditComment, { PureEditComment } from '../edit-comment'
import { shallow } from 'enzyme'

describe('EditComment Component', () => {
  const mockFn = jest.fn()
  const props = {
    comment: 'a comment',
    comment_id: 33,
    back: mockFn,
    updateComment: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <EditComment {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock updateComment action', () => {
    const wrapper = shallow(<PureEditComment {...props} dispatch={mockFn} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
