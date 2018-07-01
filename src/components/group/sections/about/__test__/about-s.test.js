import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import AboutGroup from '../about-s'

describe('AboutGroup Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <AboutGroup />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
