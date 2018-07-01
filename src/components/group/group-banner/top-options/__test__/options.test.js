import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import GroupOptions from '../options'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('GroupOptions Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <GroupOptions toggleOptions={jest.fn()} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
