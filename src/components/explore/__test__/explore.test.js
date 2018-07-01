import React from 'react'
import { create } from 'react-test-renderer'
import Explore from '../explore'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import { MemoryRouter } from 'react-router-dom'

jest.unmock('react-router-dom')

describe('Explore Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Explore match={{ url: '/explore' }} />
        </MemoryRouter>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
