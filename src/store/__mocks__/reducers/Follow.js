import { randNum } from '../../../utils/utils'
import f from './f'

export default {
  usersToRecommend: [
    {
      follow_id: randNum(),
      follow_to: 7,
      username: 'ghalib',
      firstname: 'Mirza',
      surname: 'Ghalib',
    },
    {
      follow_id: randNum(),
      follow_to: 8,
      username: 'coldplay',
      firstname: 'cold',
      surname: 'play',
    },
  ],
  followers: f,
  followings: f,
  favourites: [
    {
      fav_id: 3,
      fav_by: 24,
      user: 14,
      username: 'kinkade',
      firstname: 'Thomas',
      surname: 'Kinkade',
      fav_time: '1480114098767',
    },
  ],
  recommendations: [
    {
      recommend_id: 3,
      recommend_of: 20,
      recommend_of_username: 'gian',
      recommend_of_firstname: 'Takeshi',
      recommend_of_surname: 'Gauda',
      recommend_to: 24,
      recommend_by: 28,
      recommend_time: '1480114098767',
      recommend_by_username: 'selena',
    },
  ],
  profile_views: 10,
  isFollowing: false,
}
