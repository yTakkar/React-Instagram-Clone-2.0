import React from 'react'
import NotificationType from '../type'
import { create } from 'react-test-renderer'

describe('NotificationType Component', () => {
  const comp = (type, username = '') => (
    <NotificationType type={type} user_username={username} />
  )

  it('should match snapshot with type "follow"', () => {
    const tree = create(comp('follow'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "like"', () => {
    const tree = create(comp('like'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "favourites"', () => {
    const tree = create(comp('favourites'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "recommend"', () => {
    const tree = create(comp('recommend', 'zayn'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "invite"', () => {
    const tree = create(comp('invite'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "change_admin"', () => {
    const tree = create(comp('change_admin'))
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type "mention_post"', () => {
    const tree = create(comp('mention_post'))
    expect(tree).toMatchSnapshot()
  })
})
