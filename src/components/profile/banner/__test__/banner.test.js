import React from 'react'
import { create } from 'react-test-renderer'
import Banner from '../banner'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Banner Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Banner />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
