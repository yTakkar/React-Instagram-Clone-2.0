import posts from './posts'

export default {
  feed: posts,
  posts,
  tagged: posts,
  shared: [
    {
      ...posts[0],
      share_id: 445,
      share_by_username: 'takkar',
      share_time: '1480114098767',
    },
  ],
  bookmarks: [posts[0]],
  photos: [
    {
      post_id: 43,
      user: 18,
      username: 'ragnar',
      firstname: 'Ragnar',
      surname: 'Lothbrok',
      post_time: '1480114098767',
      imgsrc: 'instagram_1516528062094.jpg',
      filter: 'filter-normal',
    },
  ],
  viewPost: {
    ...posts[0],
    comments: [
      {
        comment_id: 73,
        type: 'text',
        text: 'https://regexr.com/?37i6s fffffm',
        commentSrc: '',
        comment_by: 7,
        comment_by_username: 'ghalib',
        post_id: 89,
        comment_time: '1480114098767',
      },
      {
        comment_id: 69,
        type: 'image',
        text: '',
        commentSrc: 'instagram_comment_1518972851259.jpg',
        comment_by: 8,
        comment_by_username: 'coldplay',
        post_id: 89,
        comment_time: '1480114098767',
      },
      {
        comment_id: 104,
        type: 'sticker',
        text: '',
        commentSrc: 'instagram_comment_1527447929485.jpg',
        comment_by: 24,
        comment_by_username: 'takkar',
        post_id: 43,
        comment_time: '1480114098767',
      },
    ],
  },
  likes: [
    {
      like_id: 42,
      like_by: 18,
      username: 'ragnar',
      firstname: 'Ragnar',
      surname: 'Lothbrok',
      post_id: 43,
      like_time: '1480114098767',
      isFollowing: false,
    },
  ],
  tags: [
    {
      post_tag_id: 1,
      post_id: 89,
      user: 16,
      username: 'zayn',
      firstname: 'Zayn',
      surname: 'Malik',
      isFollowing: false,
    },
  ],
  isPostMine: false,
  usersToShare: [
    {
      follow_id: 302,
      follow_to: 16,
      username: 'zayn',
      firstname: 'Zayn',
      surname: 'Malik',
      didIShare: false,
    },
    {
      follow_id: 289,
      follow_to: 10,
      username: 'noddy',
      firstname: 'your',
      surname: 'noddy',
      didIShare: false,
    },
  ],
  sharers: [
    {
      share_id: 103,
      share_by: 7,
      share_by_username: 'ghalib',
      share_by_firstname: 'Mirza',
      share_by_surname: 'Ghalib',
      share_to: 28,
      share_to_username: 'selena',
      share_time: '1480114098767',
      post_id: 43,
      isFollowing: false,
    },
  ],
  postIt: {
    fileInput: '', // file input value
    fileChanged: false, // for checking file has changed
    targetFile: '', // file
    previewImg: '/images/location.jpg', // image which will be previewd
    desc: '', // textarea value
    filter: 'filter-normal',
    fetchingLocation: false,
    location: 'A-301, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India',
    addTag: false,
    tags: [
      {
        user: 7,
        username: 'ghalib',
      },
    ],
    showOverlay: false,
    type: 'user',
    group: 0,
  },
}
