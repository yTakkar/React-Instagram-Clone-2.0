import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import PostIt from '../post-it'

describe('PostIt Component', () => {
  const props = {
    back: jest.fn(),
    type: 'user',
  }

  it('should match snapshot with type user', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostIt {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type group', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostIt {...props} type="group" group={11} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
