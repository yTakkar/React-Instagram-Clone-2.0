import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import ToggleAddTags from '../toggleAddTags'

describe('ToggleAddTags Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ToggleAddTags />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
