import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Recommendations from '../recommends-s'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('Recommendations Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Recommendations param="takkar" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
