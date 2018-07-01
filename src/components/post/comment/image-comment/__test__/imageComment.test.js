import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import ImageComment, { PureImageComment } from '../imageComment'
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
        <ImageComment {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock imageComment action when file is changed', () => {
    const wrapper = shallow(<PureImageComment {...props} dispatch={mockFn} />)
    wrapper.find('FileInput').prop('fileChange')({
      target: {
        files: [],
      },
    })
  })
})
