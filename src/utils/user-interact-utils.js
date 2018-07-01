import { post } from 'axios'
import Notify from 'handy-notification'
import * as followA from '../actions/follow'
import { insta_notify, uData } from './utils'

/**
 * Follow user
 *
 * user, username & done properties must be provided.
 *
 * Provide update_followers when user's followers data need to be updated.
 * Eg. On Banner Comp.
 *
 * Provide update_followings when user's followings data need to be updated.
 * Eg. On Followers Comp.
 *
 * Provide dispatch when either update_followers OR update_followings needs to be updated
 *
 * Provide Firstname & Surname when update_followings=true
 *
 * Provide username as it used for notifying.
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
  let defaults = {
      user: null,
      username: null,
      firstname: null,
      surname: null,
      update_followers: false,
      update_followings: false,
      dispatch: () => null,
      done: () => null,
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
      done,
    } = obj,
    {
      data: { mssg, success, ff },
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
      follow_time: ff.follow_time,
    }

    update_followers ? dispatch(followA.Follower(ff)) : null

    update_followings ? dispatch(followA.Following(fwing)) : null

    insta_notify({
      to: user,
      type: 'follow',
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
 * Provide update_followers when user's followers data need to be updated.
 * Eg. On Banner Comp.
 *
 * Provide update_followings when user's followings data need to be updated.
 * Eg. On Followers Comp.
 *
 * Provide dispatch when either update_followers OR update_followings needs to be updated
 *
 * @param {Object} options Options for unfollowing user
 * @param {Number} options.user
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const unfollow = async options => {
  let defaults = {
    user: null,
    update_followers: false,
    update_followings: false,
    dispatch: () => null,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let { user, dispatch, update_followers, update_followings, done } = obj
  let session = uData('session')

  let {
    data: { success, mssg },
  } = await post('/api/unfollow', { user })

  if (success) {
    update_followers ? dispatch(followA.Unfollower(session)) : null

    update_followings ? dispatch(followA.Unfollowing(user)) : null
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
    data: { success, mssg },
  } = await post('/api/add-to-favourites', { user })

  if (success) {
    insta_notify({
      to: user,
      type: 'favourites',
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
    data: { mssg, success },
  } = await post('/api/recommend-user', { user, recommend_to: recommend_to })

  if (success) {
    insta_notify({
      to: recommend_to,
      type: 'recommend',
      user,
    })
  }

  Notify({ value: mssg })
}
