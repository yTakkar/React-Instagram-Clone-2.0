import React from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'

export default class EmailVerification extends React.Component {
  render() {

    let
      { params: { is } } = this.props.match,
      mssg =
      /* eslint-disable indent */
      is == 'yes' ? 'You email has been verified successfully!'
      : is == 'alr' ? 'Email already verified!'
      : 'Something went wrong!'
      /* eslint-enable */

    return (
      <div>
        <Title value='Email Verification' />
        <FadeIn duration='300ms'>
          <div className='registered email_verification' >
            <span>{ mssg }</span>
          </div>
        </FadeIn>
      </div>
    )
  }
}
