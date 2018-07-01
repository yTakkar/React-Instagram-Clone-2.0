import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import EditPost, { PureEditPost } from '../edit-post'
import { shallow } from 'enzyme'

describe('EditPost Component', () => {
  const mockFn = jest.fn()
  const props = {
    post: 14,
    description: 'some desc',
    back: mockFn,
    changeDesc: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <EditPost {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock updatePost action when button is clicked', () => {
    const wrapper = shallow(<PureEditPost {...props} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
