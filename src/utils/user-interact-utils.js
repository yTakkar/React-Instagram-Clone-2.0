import { post } from 'axios'
import Notify from 'handy-notification'
import * as follow_action from '../store/actions/follow_a'
import { insta_notify, uData } from './utils'

/**
 * Follow user
 *
 * user, username & done properties must be provided.
 *
 * @param {Object} options Options for following user
 * @param {Number} options.user
 * @param {String} options.username
 * @param {firstname} options.firstname
 * @param {surname} options.surname
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const follow = async options => {
  let
    defaults = {
      user: null,                 // USER TO FOLLOW [MUST]
      username: null,             // USER'S USERNAME, ONlY FOR NOTIFYING [MUST]
      firstname: null,            // WHEN UPDATE_FOLLOWINGS=TRUE
      surname: null,              // WHEN UPDATE_FOLLOWINGS=TRUE
      update_followers: false,    // PROVIDE WHEN FOLLOWERS DATA NEEDS TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false,   // PROVIDE WHEN FOLLOWINGS DATA NEEDS TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS COMPONENT'S FOLLOW ACTION
      dispatch: () => { return }, // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }      // FN TO BE EXECUTED WHEN USER IS FOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      username,
      firstname,
      surname,
      dispatch,
      update_followers,
      update_followings,
      done
    } = obj,
    {
      data: { mssg, success, ff }
    } = await post('/api/follow', { user, username })

  if (success) {
    let fwing = {
      follow_id: ff.follow_id,
      follow_to: user,
      follow_by: Number(uData('session')),
      username,
      firstname,
      surname,
      isFollowing: true,
      follow_time: ff.follow_time
    }
    update_followers ? dispatch(follow_action.Follower(ff)) : null
    update_followings ? dispatch(follow_action.Following(fwing)) : null

    insta_notify({
      to: user,
      type: 'follow'
    })

    done()
  }

  Notify({ value: mssg })

}

/**
 * Unfollow user
 *
 * user & done properties must be provided.
 *
 * @param {Object} options Options for unfollowing user
 * @param {Number} options.user
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const unfollow = async options => {
  let
    defaults = {
      user: null,                 // USER TO UNFOLLOW [MUST]
      update_followers: false,    // PROVIDE WHEN FOLLOWERS DATA NEEDS TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false,   // PROVIDE WHEN FOLLOWINGS DATA NEEDS TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS COMPONENT'S FOLLOW ACTION
      dispatch: () => { return },   // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }      // FN TO BE EXECUTED WHEN USER IS UNFOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      dispatch,
      update_followers,
      update_followings,
      done
    } = obj,
    session = uData('session')

  let {
    data: { success, mssg }
  } = await post('/api/unfollow', { user })

  if (success) {
    update_followers ? dispatch(follow_action.Unfollower(session)) : null
    update_followings ? dispatch(follow_action.Unfollowing(user)) : null
    done()
  }

  Notify({ value: mssg })
}

/**
 * Add user to favorites
 * @param {Number} user User to add to favorites
 */
export const addToFavourites = async user => {
  let {
    data: { success, mssg }
  } = await post('/api/add-to-favourites', { user })

  if (success) {
    insta_notify({
      to: user,
      type: 'favourites'
    })
  }

  Notify({ value: mssg })
}

/**
 * Recommends a user
 * @param {Object} options
 * @param {Number} options.recommend_to
 * @param {Number} options.user
 */
export const recommendUser = async options => {
  let { recommend_to, user } = options
  let {
    data: { mssg, success }
  } = await post('/api/recommend-user', { user, recommend_to: recommend_to })

  if (success) {
    insta_notify({
      to: recommend_to,
      type: 'recommend',
      user
    })
  }

  Notify({ value: mssg })
}
