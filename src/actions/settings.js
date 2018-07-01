import { dispatchHelper } from '../utils/utils'

export const getBlockedUsers = () =>
  dispatchHelper('GET_BLOCKED_USERS', 'get-blocked-users')

export const unblockUser = block_id => {
  return {
    type: 'UNBLOCK_USER',
    payload: block_id,
  }
}
