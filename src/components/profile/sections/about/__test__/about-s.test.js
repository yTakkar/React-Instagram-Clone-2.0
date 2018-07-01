import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import About from '../about-s'

describe('About Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <About />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
