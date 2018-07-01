import { post } from 'axios'
import Notify from 'handy-notification'
import { imageCompressor } from './utils'
import Action from './API/Action'

/** Upload avatar
 * @param {Object} options
 * @param {File} options.file
 * @param {String} options.of
 * @param {Number} options.group
 */
export const upload_avatar = async options => {
  let { file: userFile, of, group } = options,
    form = new FormData(),
    file = await imageCompressor(userFile),
    action = new Action('.c_a_add')

  if (file.size > 6000000) {
    Notify({ value: 'Image should be less than 4MB!!' })
  } else {
    action.start('Changing avatar..')

    form.append('avatar', file)
    form.append('of', of)
    form.append('group', group)

    let {
      data: { success, mssg },
    } = await post('/api/upload-avatar', form)

    Notify({
      value: mssg,
      done: () => (success ? location.reload() : null),
    })

    action.end('Change avatar')
  }
}
