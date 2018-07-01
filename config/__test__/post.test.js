require('dotenv').config()

const Post = require('../Post')
const { user1, user2, postID } = require('./test.config')

describe('User config tests', () => {
  test('should return whether user liked post or not', async () => {
    let liked = await Post.likedOrNot(user1, postID)
    expect(liked).toBeBoolean()
  })

  test('should return whether user bookmarked post or not', async () => {
    let bookmarked = await Post.bookmarkedOrNot(user1, postID)
    expect(bookmarked).toBeBoolean()
  })

  test('should return whether post created by user or not', async () => {
    let created = await Post.isPostMine(user1, postID)
    expect(created).toBeBoolean()
  })

  test('should return whether user1 shared post to user2 or not', async () => {
    let bookmarked = await Post.didIShare(postID, user1, user2)
    expect(bookmarked).toBeBoolean()
  })

  test('should return post action counts such as likes, shares, etc..', async () => {
    let counts = await Post.getCounts(postID)
    expect(counts).toBeObject()
    expect.objectContaining({
      tags_count: expect.any(Number),
      likes_count: expect.any(Number),
      shares_count: expect.any(Number),
      comments_count: expect.any(Number),
    })
  })
})
