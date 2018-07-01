import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import PopularHashtags from '../popular-hashtags'
import Hashtag from '../../../store/__mocks__/reducers/Hashtag'

describe('PopularHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <PopularHashtags />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.popularHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
