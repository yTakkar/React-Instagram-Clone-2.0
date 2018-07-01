import React from 'react'
import { create } from 'react-test-renderer'
import Suggested from '../suggested'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Suggested Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Suggested when="home" />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
