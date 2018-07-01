import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerMapTags from '../map-tags'
import { create } from 'react-test-renderer'
import User from '../../../../../store/__mocks__/reducers/User'

describe('BannerMapTags Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerMapTags />
    </Provider>
  )

  it('should match snapshot and show tags', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show nothing message', () => {
    User.tags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
