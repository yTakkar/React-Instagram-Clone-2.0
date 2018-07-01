export const follower = (followers, n) => {
  followers.unshift(n)
  return followers
}

export const unfollower = (followers, n) =>
  followers.filter(ff => ff.follow_by != parseInt(n))

export const following = (followings, n) => {
  followings.unshift(n)
  return followings
}

export const unfollowing = (followings, n) =>
  followings.filter(ff => ff.follow_to !== parseInt(n))

export const remFav = (favs, fav_id) => favs.filter(f => f.fav_id != fav_id)

export const remRec = (recommends, recommend_id) =>
  recommends.filter(r => r.recommend_id != parseInt(recommend_id))
