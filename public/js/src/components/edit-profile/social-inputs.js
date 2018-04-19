import React from 'react'
import PropTypes from 'prop-types'

export default class SocialInputs extends React.Component {
  render() {
    let {
      inputs: { instagram, github, facebook, twitter, website, phone },
      change,
    } = this.props

    return (
      <div className='edit_sm_div'>
        <span className='edit_span'>Connections</span>
        <input
          type='text'
          className='edit_em_instagram sm'
          placeholder='Instagram'
          spellCheck='false'
          maxLength='255'
          value={instagram}
          onChange={e => change('instagram', e)}
        />
        <input
          type='text'
          className='edit_em_github sm'
          placeholder='GitHub'
          spellCheck='false'
          maxLength='255'
          value={github}
          onChange={e => change('github', e)}
        />
        <input
          type='text'
          className='edit_em_facebook sm'
          placeholder='Facebook'
          spellCheck='false'
          maxLength='255'
          value={facebook}
          onChange={e => change('facebook', e)}
        />
        <input
          type='text'
          className='edit_em_twitter sm'
          placeholder='Twitter'
          spellCheck='false'
          maxLength='255'
          value={twitter}
          onChange={e => change('twitter', e)}
        />
        <input
          type='text'
          className='edit_em_website sm'
          placeholder='Website'
          spellCheck='false'
          maxLength='255'
          value={website}
          onChange={e => change('website', e)}
        />
        <input
          type='text'
          className='edit_em_mobile'
          placeholder='Phone'
          spellCheck='false'
          maxLength='20'
          value={phone}
          onChange={e => change('phone', e)}
        />
      </div>
    )
  }
}

SocialInputs.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.string).isRequired,
  change: PropTypes.func.isRequired,
}
