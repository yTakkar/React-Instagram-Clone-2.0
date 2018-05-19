import { post } from 'axios'
import Notify from 'handy-notification'
import { imageCompressor } from './utils'
import d from './DOM'

/** Upload avatar
 * @param {Object} options
 * @param {File} options.file
 * @param {String} options.of
 * @param {Number} options.group
 */
export const upload_avatar = async options => {
  let
    { file: userFile, of, group } = options,
    form = new FormData(),
    file = await imageCompressor(userFile),
    btn = new d('.c_a_add'),
    o = new d('.overlay-2')

  if (file.size > 6000000) {
    Notify({ value: 'Image should be less than 4MB!!' })
  } else {
    o.show()
    btn
      .text('Changing avatar..')
      .addClass('a_disabled')

    form.append('avatar', file)
    form.append('of', of)
    form.append('group', group)

    let {
      data: { success, mssg }
    } = await post('/api/upload-avatar', form)

    Notify({
      value: mssg,
      done: () => success ? location.reload() : null
    })

    o.hide()
    btn
      .text('Change avatar')
      .removeClass('a_disabled')
  }

}
