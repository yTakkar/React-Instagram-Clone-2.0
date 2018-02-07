import React from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'

export default class EmailVerification extends React.Component{
  render(){

    let
      { params: { is } } = this.props.match,
      mssg

    if (is == 'yes') {
      mssg = 'You email has been verified successfully!'
    } else if (is == 'alr') {
      mssg = 'Email already verified!'
    } else {
      mssg = 'Something went wrong!'
    }

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
