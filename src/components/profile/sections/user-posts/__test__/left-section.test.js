import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import UserPostsLeftSection from '../left-section'
import User from '../../../../../store/__mocks__/reducers/User'

describe('UserPostsLeftSection Component', () => {
  MockDataElement()

  const comp = (username = 'takkar') => (
    <Provider store={mockStore}>
      <UserPostsLeftSection username={username} />
    </Provider>
  )

  it('should match snapshot when profile is mine', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when profile is not mine', () => {
    User.user_details.id = 7
    const tree = create(comp('ghalib')).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
