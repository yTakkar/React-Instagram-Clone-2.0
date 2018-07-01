import { post } from 'axios'
import Notify from 'handy-notification'
import { viewPassword } from './utils'
import d from './API/DOM'
import { commonLogin } from './user-system-utils'

/**
 * Quick login
 * @param {Object} options
 * @param {Number} options.id
 * @param {String} options.username
 */
export const quickLogin = options => {
  let { id, username } = options,
    usernameDiv = new d('.q_l_username'),
    imgDiv = new d('.q_l_m_img'),
    icon = new d('.s_p_ql'),
    password = new d('#q_l_password')

  new d('.overlay-2-black').show()
  new d('.q_l_model').show()

  password.focus().setAttr('type', 'password')

  icon.html('<i class="fas fa-lock"></i>')
  icon.css('color', 'darkturquoise')

  usernameDiv.text(`@${username}`)
  imgDiv.setAttr('src', `/users/${id}/avatar.jpg`)

  // QUICK LOGIN SUBMIT
  new d('.q_l_m_form').on('submit', e => {
    e.preventDefault()
    quickLoginSubmit(username)
  })

  // CLEAR QUICK LOGIN
  new d('.q_l_remove').on('click', async e => {
    e.preventDefault()
    await post('/api/remove-quick-login', { id })
    Notify({
      value: `Removed ${username} from quick login!!`,
      done: () => location.reload(),
    })
  })

  // TOGGLE VIEW PASSWORD
  new d('.s_p_ql').on('click', () => {
    viewPassword({
      input: '#q_l_password',
      icon: '.s_p_ql',
    })
  })
}

/**
 * Quick login submit
 * @param {String} username Username for submitting
 */
const quickLoginSubmit = username => {
  let password = new d('#q_l_password').val()
  if (!password) {
    Notify({ value: 'Password is missing!!' })
  } else {
    let loginOpt = {
      data: {
        username,
        password,
      },
      when: 'login',
      btn: '.q_l_submit',
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login To Continue',
    }
    commonLogin(loginOpt)
  }
}
