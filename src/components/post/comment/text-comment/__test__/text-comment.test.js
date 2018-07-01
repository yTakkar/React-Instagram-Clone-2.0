import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import TextComment from '../text-comment'
import { shallow } from 'enzyme'

describe('ImageComment Component', () => {
  const mockFn = jest.fn()
  const props = {
    postDetails: {
      post_id: 44,
      when: 'feed',
      user: 7,
    },
    incrementComments: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <TextComment {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <TextCommentModal/> when state.comment == true', () => {
    const wrapper = shallow(<TextComment {...props} dispatch={mockFn} />)
    wrapper.setState({ comment: true })
    expect(wrapper.find('Connect(TextCommentModal)').exists()).toBe(true)
  })
})
