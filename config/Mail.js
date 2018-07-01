// FOR MAILING

const nodemailer = require('nodemailer')
const { MAIL, MAIL_PASSWORD } = process.env

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
})

/**
 * Mails to specified eMail address
 * @param {Object} options
 * @param {String} options.to
 * @param {String} options.subject
 * @param {String} options.html
 * @returns {<Promise>} Promise
 */
let mail = options =>
  new Promise((resolve, reject) => {
    let o = {
      from: `Instagram <${MAIL}>`,
      ...options,
    }

    transporter.sendMail(o, err => {
      err ? reject(err) : resolve('Mail Sent!!')
    })
  })

module.exports = mail
