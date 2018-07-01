import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import TagItems from '../tag-list'
import Post from '../../../../../store/__mocks__/reducers/Post'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import mockStore from '../../../../../store/__mocks__/mockStore'

describe('TagItems Component', () => {
  let dataElement

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <TagItems {...Post.tags[0]} decrementTags={jest.fn()} {...extraProps} />
    </Provider>
  )

  it('should match snapshot and show <AdvancedFollow/>', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <AdvancedUnfollow/>', () => {
    const tree = create(
      comp({
        isFollowing: true,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Untag/>', () => {
    // when post is mine
    Post.isPostMine = true
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()

    // when iam the admin
    const tree2 = create(comp()).toJSON()
    Post.isPostMine = false
    dataElement.setAttribute('data-isadmin', 'true')
    expect(tree2).toMatchSnapshot()

    // when iam the tagged user
    const tree3 = create(comp()).toJSON()
    Post.isPostMine = false
    dataElement.setAttribute('data-isadmin', 'false')
    Post.tags[0].user = 24
    expect(tree3).toMatchSnapshot()
  })
})
