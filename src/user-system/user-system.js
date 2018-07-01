/**
 * @author Faiyaz Shaikh <www.shtakkar@gmail.com>
 * GitHub repo: https://github.com/yTakkar/React-Instagram-Clone-2.0
 */

import * as fn from '../utils/utils'
import * as User from '../utils/user-system-utils'
import Notify from 'handy-notification'
import axios from 'axios'
import d from '../utils/API/DOM'
import { quickLogin } from '../utils/quick-login-utils'

new d('.nh_logo').on('click', () => (location.href = '/welcome'))

new d('.h_logo').on('click', () => (location.href = '/'))

// View Password for signup
new d('.s_p_s').on('click', () =>
  fn.viewPassword({
    input: '#s_password',
    icon: '.s_p_s',
  })
)

// View Password for login
new d('.s_p_l').on('click', () =>
  fn.viewPassword({
    input: '#l_password',
    icon: '.s_p_l',
  })
)

// // Filtering illegal characters
fn.replacer('.s_username', 'normal')
fn.replacer('.s_firstname', 'normal')
fn.replacer('.s_surname', 'normal')

// Username checker
User.username_checker('.s_username')

// User Signup
new d('form.form_register').on('submit', e => {
  e.preventDefault()

  let username = new d('.s_username').val(),
    firstname = new d('.s_firstname').val(),
    surname = new d('.s_surname').val(),
    email = new d('.s_email').val(),
    password = new d('.s_password').val()

  if (!username || !firstname || !surname || !email || !password) {
    Notify({ value: 'Values are missing!!' })
  } else {
    let signupOpt = {
      data: {
        username,
        firstname,
        surname,
        email,
        password,
      },
      when: 'signup',
      btn: '.s_submit',
      url: '/user/signup',
      redirect: '/registered',
      defBtnValue: 'Signup For Free',
    }
    User.commonLogin(signupOpt)
  }
})

// User login
new d('form.form_login').on('submit', e => {
  e.preventDefault()

  let username = new d('.l_username').val()
  let password = new d('.l_password').val()

  if (!username || !password) {
    Notify({ value: 'Values are missing!!' })
  } else {
    let loginOpt = {
      data: {
        username,
        password,
      },
      when: 'login',
      btn: '.l_submit',
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login To Continue',
    }
    User.commonLogin(loginOpt)
  }
})

// QUICK LOGIN
let allQL = Array.from(new d('.q_l_div').toAll())
for (let elem of allQL) {
  elem.addEventListener('click', e => {
    let { id, username } = e.currentTarget.dataset
    quickLogin({ id, username })
  })
}

// CLOSE QUICK MODAL
new d('.q_l_m_cancel').on('click', () => {
  new d('.overlay-2-black').hide()
  new d('#q_l_password').setValue('')
  new d('.q_l_model').hide()
})

// CLEAR ALL QUICK LOGINS
new d('.clear_all_ql').on('click', async e => {
  e.preventDefault()
  await axios.post('/api/clear-all-quick-logins')
  Notify({
    value: 'Cleared all quick logins!!',
    done: () => location.reload(),
  })
})

// FORGOT PASSWORD
new d('form.form_fp').on('submit', async e => {
  e.preventDefault()
  let email = new d('.fp_email').val()

  if (!email) {
    Notify({ value: 'Email field is empty!!' })
  } else {
    let fpOpt = {
      data: { email },
      when: 'forgot_password',
      btn: '.fp_submit',
      url: '/user/password-retrieve',
      redirect: '/',
      defBtnValue: 'Retrieve',
    }
    User.commonLogin(fpOpt)
  }
})
