import { dispatchHelper } from '../utils/utils'

export const getUsersToExplore = () =>
  dispatchHelper('GET_USERS_TO_EXPLORE', 'get-users-to-explore')

export const getPhotosToExplore = () =>
  dispatchHelper('GET_PHOTOS_TO_EXPLORE', 'get-photos-to-explore')

export const getGroupsToExplore = () =>
  dispatchHelper('GET_GROUPS_TO_EXPLORE', 'get-groups-to-explore')

export const getSuggestedUsers = user =>
  dispatchHelper('GET_SUGGESTED_USERS', 'get-suggested-users', { user })
