import React from 'react'
import { post } from 'axios'
import $ from 'jquery'
import { uniqBy } from 'lodash'
import { replacer } from '../../utils/utils'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'

export default class SearchFollowings extends React.Component {

  state = {
    value: '',
    data: [],
    followings: [],
    selected: []
  }

  componentDidMount = async () => {
    $('.p_add_taggings_text').focus()
    let { data } = await post('/api/search-followings')
    await this.setState({ data })
  }

  getFollowings = async e => {
    let
      value = e.target.value.trim(),
      { data } = this.state,
      ff = !value ? [] : data.filter(f =>
        f.follow_to_username.toLowerCase().includes(value)
      )
    await this.setState({ value, followings: ff })
  }

  selectUser = async (user, username) => {
    let
      { selected } = this.state,
      { when, done } = this.props

    selected.unshift({ user, username })
    this.setState({ selected })
    this.setState({ value: '' })
    this.setState({ followings: [] })
    $('.p_add_taggings_text').focus()
    let f_users = uniqBy(selected, 'username')
    this.setState({ selected: f_users })

    if (when == 'tag') {
      done(f_users)
    } else if (when == 'add_grp_members') {
      done(user)
    } else if (when == 'new_con') {
      done(user, username)
    }

  }

  render() {

    replacer([ $('.p_add_taggings_text') ], 'normal')

    let
      { value, followings } = this.state,
      { placeholder, disabled } = this.props,
      map_f = followings.map(f =>
        <li
          className='tag_hmm'
          key={f.follow_to}
          onClick={() => this.selectUser(f.follow_to, f.follow_to_username)}
        >
          <img src={`/users/${f.follow_to}/avatar.jpg`} />
          <span>{f.follow_to_username}</span>
        </li>
      )

    return (
      <div className='search_followings' >

        <div className='p_add_taggings' >
          <input
            type='text'
            className='p_add_taggings_text'
            spellCheck='false'
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={this.getFollowings}
          />
        </div>

        {
          followings.length > 0 ?
            <div className='p_tagging_list'>
              <div className='p_tagging_wrapper'>
                <ul className='p_tagging_ul'>
                  <FadeIn duration='200ms'>
                    { map_f }
                  </FadeIn>
                </ul>
              </div>
            </div>
            : null
        }

      </div>
    )
  }
}

SearchFollowings.defaulProps = {
  placeholder: 'Search',
  disabled: false
}

SearchFollowings.propTypes = {
  when: PropTypes.oneOf([ 'tag', 'add_grp_members', 'new_con' ]).isRequired,
  done: PropTypes.func.isRequired
}
