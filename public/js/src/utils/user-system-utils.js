import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { viewPassword } from './utils'

/**
 * For username checker
 * @param {jQuery} el
 */
export const username_checker = el => {
  let uc = $('.username_checker')

  el.on('keyup', async () => {
    let value = el.val()
    uc.show()

    if (value) {
      let
        { data: count } = await post('/user/username-checker', { value }),
        html

      if (count == 0) {
        html = '<span class="checker_text">username is available</span><span class="checker_icon"><i class="far fa-smile"></i></span>'
        uc.css({
          width: '160px',
          right: '-188px'
        })
      } else {
        html = '<span class="checker_text">username already taken</span><span class="checker_icon"><i class="far fa-frown"></i></span>'
        uc.css({
          width: '167px',
          right: '-194px'
        })
      }

      uc.html(html)
    } else {
      uc.hide()
    }

  })
  el.on('blur', () => uc.hide() )
}

/**
 * Common function for login & signup
 *
 * @param {Object} options Options
 * @param {Object} options.data
 * @param {jQuery} options.btn
 * @param {String} options.url
 * @param {String} options.redirect
 * @param {String} options.defBtnValue
 */
export const commonLogin = options => {
  let
    { data, btn, url, redirect, defBtnValue } = options,
    overlay2 = $('.overlay-2')

  btn
    .attr('value', 'Please wait..')
    .addClass('a_disabled')
  overlay2.show()

  post(url, data)
    .then(s => {
      let { data: { mssg, success } } = s
      if (success) {
        Notify({
          value: mssg,
          done: () => location.href = redirect
        })
        btn.attr('value', 'Redirecting..')
        overlay2.show()
      } else {
        Notify({
          value: typeof(mssg) == 'object' ? mssg.length > 1 ? mssg[0] : mssg : mssg
        })
        btn
          .attr('value', defBtnValue)
          .removeClass('a_disabled')
        overlay2.hide()
      }
      btn.blur()
    })
    .catch(e => console.log(e))
}

/**
 * Quick login
 */
export const quickLogin = ({ id, username }) => {
  let
    usernameDiv = $('.q_l_username'),
    imgDiv = $('.q_l_m_img'),
    icon = $('.s_p_ql')

  $('.overlay-2-black').show()
  $('.q_l_model').fadeIn('fast')
  $('#q_l_password').focus()

  $('#q_l_password').attr('type', 'password')
  icon.html('<i class="fas fa-lock"></i>')
  icon.css('color', 'darkturquoise')

  usernameDiv.text(`@${username}`)
  imgDiv.attr('src', `/users/${id}/avatar.jpg`)

  // QUICK LOGIN SUBMIT
  $('.q_l_m_form').submit(e => {
    e.preventDefault()
    quickLoginSubmit(username)
  })

  // CLEAR QUICK LOGIN
  $('.q_l_remove').on('click', async e => {
    e.preventDefault()
    await post('/api/remove-quick-login', { id })
    Notify({
      value: `Removed ${username} from quick login!!`,
      done: () => location.reload()
    })
  })

  // TOGGLE VIEW PASSWORD
  $('.s_p_ql').on('click', () => {
    viewPassword({
      input: document.getElementById('q_l_password'),
      icon
    })
  })

}

/**
 * Quick login submit
 * @param {String} username Username for submitting
 */
const quickLoginSubmit = username => {
  let password = $('#q_l_password').val()
  if (!password) {
    Notify({ value: 'Password is missing!!' })
  } else {

    let loginOpt = {
      data: {
        username,
        password
      },
      when: 'login',
      btn: $('.q_l_submit'),
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login To Continue',
    }
    commonLogin(loginOpt)

  }
}
