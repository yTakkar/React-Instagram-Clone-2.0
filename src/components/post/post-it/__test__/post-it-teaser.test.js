import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import PostItTeaser, { PurePostItTeaser } from '../post-it-teaser'
import { shallow } from 'enzyme'
import User from '../../../../store/__mocks__/reducers/User'

describe('PostItTeaser Component', () => {
  const props = {
    type: 'user',
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostItTeaser {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with disabled prop', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostItTeaser {...props} disabled />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <PostIt/> when state.postIt == true', () => {
    const wrapper = shallow(
      <PurePostItTeaser {...props} session={User.session} />
    )
    wrapper.find('.p_whats_new').simulate('click')
    expect(wrapper.find('Connect(PostIt)').exists()).toBe(true)
  })
})
