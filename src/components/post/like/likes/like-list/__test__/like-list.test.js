import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import LikeList from '../like-list'
import Post from '../../../../../../store/__mocks__/reducers/Post'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'

describe('LikeList Component', () => {
  let dataElement

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <LikeList {...Post.likes[0]} decrementLikes={jest.fn()} {...extraProps} />
    </Provider>
  )

  it('should match snapshot and show <Follow/>', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Unfollow/>', () => {
    const tree = create(
      comp({
        isFollowing: true,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <AppLink>', () => {
    const tree = create(
      comp({
        like_by: 24,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <RemoveLikeAsAdmin>', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
