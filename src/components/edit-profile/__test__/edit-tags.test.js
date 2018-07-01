import React from 'react'
import { create } from 'react-test-renderer'
import EditTags from '../edit-tags'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import { mount } from 'enzyme'
import UserMockData from '../../../store/__mocks__/reducers/User'

describe('EditTags Component', () => {
  const mockFn = jest.fn()

  const props = {
    newTag: 'programmer',
    change: mockFn,
    tags: UserMockData.tags,
    emptyTagsInput: mockFn,
  }

  const comp = (
    <Provider store={mockStore}>
      <EditTags {...props} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock addTag action when clicked', () => {
    const wrapper = mount(comp)
    wrapper.find('SecondaryButton').simulate('click')
  })

  it('should mock deleteTag action when clicked on a specific tag', () => {
    const wrapper = mount(comp)
    wrapper
      .find('.t_a_tag')
      .first()
      .simulate('click')
  })
})
