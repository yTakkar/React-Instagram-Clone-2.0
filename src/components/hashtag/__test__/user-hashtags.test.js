import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import UserHashtags from '../user-hashtags'
import Hashtag from '../../../store/__mocks__/reducers/Hashtag'

describe('UserHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <UserHashtags username="takkar" />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.userHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
