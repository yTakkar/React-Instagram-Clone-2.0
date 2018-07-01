import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import ShareList from '../share-list'
import Post from '../../../../../store/__mocks__/reducers/Post'

describe('ShareList Component', () => {
  const mockFn = jest.fn()
  const props = {
    ...Post.usersToShare[0],
    post: 44,
    incrementShares: mockFn,
    decrementShares: mockFn,
    postOwner: 7,
  }

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <ShareList {...props} {...extraProps} />
    </Provider>
  )

  it('should match snapshot with <PrimaryButton/> for share', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <SecondaryButton/> for unshare', () => {
    const tree = create(
      comp({
        didIShare: true,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
