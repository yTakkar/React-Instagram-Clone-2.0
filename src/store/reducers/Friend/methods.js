export const removeFriend = (friends, friend_id) =>
  friends.filter(f => f.friend_id != friend_id)
