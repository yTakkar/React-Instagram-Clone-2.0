import React from 'react'
import BannerAddTagsLink from '../add-tags-link'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import { create } from 'react-test-renderer'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import User from '../../../../../store/__mocks__/reducers/User'

describe('BannerAddTagsLink Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerAddTagsLink />
    </Provider>
  )

  it('should match snapshot with null', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show add link', () => {
    User.tags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
