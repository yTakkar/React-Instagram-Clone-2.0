import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerStats from '../stats'
import User from '../../../../../store/__mocks__/reducers/User'

describe('BannerStats Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerStats />
    </Provider>
  )

  it('should match snapshot with recommendation stat', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with favourites stat', () => {
    User.user_details.id = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
