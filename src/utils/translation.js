export const translations = {
  en: {
    sidebar: {
      home: 'Home',
      explore: 'Explore',
      notifications: 'Notifications',
      messages: 'Messages',
      bookmarks: 'Bookmarks',
      gallery: 'Gallery',
      favourites: 'Favourites',
      groups: 'Groups',
      recommendations: 'Recommendations',
      editProfile: 'Edit profile',
      settings: 'Settings',
      adminDashboard: 'Admin dashboard',
      logout: 'Log out',
      adminLogout: 'Logout as admin'
    },
    messages: {
      onlineUsers: 'Online users',
      newConversation: 'New conversation',
      conversations: 'conversations',
      noConversations: 'No conversations',
      sendMessage: 'Send message..',
      send: 'Send',
      pleaseSelect: 'Please select a conversation'
    },
    home: {
      noPosts: 'Looks like you\'re new, Follow some to fill up your feed or post from above options!!',
      suggested: 'Suggested',
      popularTrends: 'Popular trends',
      createGroupText: 'Create public or private group of your interest with people you know.',
      createGroupBtn: 'Create group',
      whatsNew: 'What\'s new with you, @'
    },
    explore: {
      users: 'Users',
      photos: 'Photos',
      groups: 'Groups',
      exploreUsers: 'Explore users',
      noUsers: 'Sorry, no users to explore!!',
      explorePhotos: 'Explore photos',
      exploreGroups: 'Explore groups',
      noGroups: 'Sorry, no groups to explore!!'
    },
    header: {
      search: 'Search Vsocial',
      settings: 'Settings',
      edit: 'Edit',
      help: 'Help',
      about: 'About',
      developer: 'Developer',
      logout: 'Logout'
    },
    post: {
      noLikes: 'No likes',
      like: 'like',
      likes: 'likes',
      noShares: 'No shares',
      share: 'share',
      shares: 'shares',
      noComments: 'No comments',
      comment: 'comment',
      comments: 'comments',
      wannaComment: 'Wanna comment?'
    }
  },
  vi: {
    sidebar: {
      home: 'Trang chủ',
      explore: 'Khám phá',
      notifications: 'Thông báo',
      messages: 'Tin nhắn',
      bookmarks: 'Dấu trang',
      gallery: 'Thư viện',
      favourites: 'Yêu thích',
      groups: 'Nhóm',
      recommendations: 'Đề xuất',
      editProfile: 'Chỉnh sửa hồ sơ',
      settings: 'Cài đặt',
      adminDashboard: 'Bảng quản trị',
      logout: 'Đăng xuất',
      adminLogout: 'Đăng xuất Admin'
    },
    messages: {
      onlineUsers: 'Người dùng trực tuyến',
      newConversation: 'Hội thoại mới',
      conversations: 'hội thoại',
      noConversations: 'Không có hội thoại',
      sendMessage: 'Gửi tin nhắn..',
      send: 'Gửi',
      pleaseSelect: 'Vui lòng chọn một cuộc trò chuyện'
    },
    home: {
      noPosts: 'Có vẻ bạn là người mới, hãy theo dõi ai đó để lấp đầy bảng tin hoặc đăng bài từ các tùy chọn bên trên!!',
      suggested: 'Đề xuất cho bạn',
      popularTrends: 'Xu hướng nổi bật',
      createGroupText: 'Tạo nhóm công khai hoặc riêng tư theo sở thích của bạn với những người bạn biết.',
      createGroupBtn: 'Tạo nhóm',
      whatsNew: 'Có gì mới không, @'
    },
    explore: {
      users: 'Người dùng',
      photos: 'Hình ảnh',
      groups: 'Nhóm',
      exploreUsers: 'Khám phá người dùng',
      noUsers: 'Xin lỗi, không có người dùng nào để khám phá!!',
      explorePhotos: 'Khám phá hình ảnh',
      exploreGroups: 'Khám phá nhóm',
      noGroups: 'Xin lỗi, không có nhóm nào để khám phá!!'
    },
    header: {
      search: 'Tìm kiếm Vsocial',
      settings: 'Cài đặt',
      edit: 'Chỉnh sửa',
      help: 'Trợ giúp',
      about: 'Giới thiệu',
      developer: 'Nhà phát triển',
      logout: 'Đăng xuất'
    },
    post: {
      noLikes: 'Chưa có lượt thích',
      like: 'lượt thích',
      likes: 'lượt thích',
      noShares: 'Chưa có lượt chia sẻ',
      share: 'lượt chia sẻ',
      shares: 'lượt chia sẻ',
      noComments: 'Chưa có bình luận',
      comment: 'bình luận',
      comments: 'bình luận',
      wannaComment: 'Bạn muốn bình luận?'
    },
    actions: {
      follow: 'Theo dõi',
      unfollow: 'Bỏ theo dõi',
      mutualFollower: 'người theo dõi chung',
      mutualFollowers: 'người theo dõi chung'
    }
  }
}

/**
 * Helper to get a translation string
 * @param {string} lang 'en' or 'vi'
 * @param {string} section e.g. 'sidebar'
 * @param {string} key e.g. 'home'
 */
export const t = (lang, section, key) => {
  if (translations[lang] && translations[lang][section] && translations[lang][section][key]) {
    return translations[lang][section][key]
  }
  // Fallback to English
  if (translations['en'][section] && translations['en'][section][key]) {
    return translations['en'][section][key]
  }
  return key
}

export const translateTime = (timeStr, lang) => {
  if (!timeStr) return timeStr;
  if (lang !== 'vi') return timeStr;
  
  return timeStr
    .replace('years', 'năm')
    .replace('year', 'năm')
    .replace('months', 'tháng')
    .replace('month', 'tháng')
    .replace('days', 'ngày')
    .replace('day', 'ngày')
    .replace('hours', 'giờ')
    .replace('hour', 'giờ')
    .replace('minutes', 'phút')
    .replace('minute', 'phút')
    .replace('seconds', 'giây')
    .replace('second', 'giây')
    .replace('ago', 'trước');
}
