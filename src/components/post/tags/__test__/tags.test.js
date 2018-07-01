import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import Tags, { PureTags } from '../tags'
import { shallow } from 'enzyme'
import Post from '../../../../store/__mocks__/reducers/Post'

describe('Tags Component', () => {
  const mockFn = jest.fn()
  const props = {
    post: 44,
    back: mockFn,
    decrementTags: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Tags {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureTags {...props} tags={Post.tags} dispatch={mockFn} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
