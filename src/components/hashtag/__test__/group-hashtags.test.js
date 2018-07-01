import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import GroupHashtags from '../group-hashtags'
import Hashtag from '../../../store/__mocks__/reducers/Hashtag'

describe('GroupHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <GroupHashtags group={11} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.groupHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
