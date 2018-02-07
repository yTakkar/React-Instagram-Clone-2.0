import $ from 'jquery'
import * as fn from '../utils/utils'
import Notify from 'handy-notification'
import axios from 'axios'

// Header Logo Redirect
$('.nh_logo').on('click', () => location.href = '/welcome' )
$('.h_logo').on('click', () => location.href = '/')

// View Password for signup
$('.s_p_s').on('click', () => {
  fn.viewPassword({
    input: document.getElementById('s_password'),
    icon: $('.s_p_s')
  })
})

// View Password for login
$('.s_p_l').on('click', () => {
  fn.viewPassword({
    input: document.getElementById('l_password'),
    icon: $('.s_p_l')
  })
})

// Filtering illegal characters
fn.replacer([
  $('.s_username'),
  $('.s_firstname'),
  $('.s_surname'),
], 'normal')

// Username checker
fn.username_checker($('.s_username'))

// User Signup
$('form.form_register').submit(e => {
  e.preventDefault()

  let
    username = $('.s_username').val(),
    firstname = $('.s_firstname').val(),
    surname = $('.s_surname').val(),
    email = $('.s_email').val(),
    password = $('.s_password').val()

  if (!username || !firstname || !surname || !email || !password) {
    Notify({ value: 'Values are missing!!' })
  }  else {

    let signupOpt = {
      data: {
        username,
        firstname,
        surname,
        email,
        password,
      },
      when: 'signup',
      btn: $('.s_submit'),
      url: '/user/signup',
      redirect: '/registered',
      defBtnValue: 'Signup For Free',
    }
    fn.commonLogin(signupOpt)

  }

})

// User login
$('form.form_login').submit(e => {
  e.preventDefault()

  let
    username = $('.l_username').val(),
    password = $('.l_password').val()

  if (!username || !password) {
    Notify({ value: 'Values are missing!!' })
  } else {

    let loginOpt = {
      data: {
        username: $('.l_username').val(),
        password
      },
      when: 'login',
      btn: $('.l_submit'),
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login To Continue',
    }
    fn.commonLogin(loginOpt)

  }

})

// QUICK LOGIN
$('.q_l_div').on('click', e => {
  let { id, username } = e.currentTarget.dataset
  fn.quickLogin({ id, username })
})

// CLOSE QUICK MODAL
$('.q_l_m_cancel').on('click', () => {
  $('.overlay-2-black').hide()
  $('#q_l_password').val('')
  $('.q_l_model').hide()
})

// CLEAR ALL QUICK LOGINS
$('.clear_all_ql').on('click', async e => {
  e.preventDefault()
  await axios.post('/api/clear-all-quick-logins')
  Notify({
    value: 'Cleared all quick logins!!',
    done: () => location.reload()
  })
})

// FORGOT PASSWORD
$('form.form_fp').submit(async e => {
  e.preventDefault()
  let email = $('.fp_email').val()

  if (!email) {
    Notify({ value: 'Email field is empty!!' })
  } else {

    let fpOpt = {
      data: { email },
      when: 'forgot_password',
      btn: $('.fp_submit'),
      url: '/user/password-retrieve',
      redirect: '/',
      defBtnValue: 'Retrieve',
    }
    fn.commonLogin(fpOpt)

  }

})
