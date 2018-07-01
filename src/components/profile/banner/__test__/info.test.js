import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import BannerInfo from '../info'

describe('BannerInfo Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <BannerInfo />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
