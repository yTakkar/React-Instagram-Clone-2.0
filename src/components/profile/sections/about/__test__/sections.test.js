import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import AboutSections from '../sections'

describe('AboutSections Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <AboutSections />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
