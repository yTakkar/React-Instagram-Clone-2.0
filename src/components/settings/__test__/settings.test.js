import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Settings from '../settings'
import { MemoryRouter } from 'react-router-dom'

jest.unmock('react-router-dom')

describe('Settings Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Settings
            match={{
              url: '/settings',
            }}
          />
        </MemoryRouter>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
