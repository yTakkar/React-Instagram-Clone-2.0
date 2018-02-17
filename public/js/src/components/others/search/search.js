import React from 'react'
import { post } from 'axios'
import UserSearch from './user-search'
import GroupSearch from './group-search'
import HashtagSearch from './hashtag-search'
import { humanReadable } from '../../../utils/utils'

export default class Search extends React.Component {

  state = {
    value: '',
    search: {
      users: [],
      groups: [],
      hashtags: []
    }
  }

  search = async ({ target: { value } }) => {
    this.setState({ value })
    if(value.trim() != '') {
      let { data } = await post('/api/search-instagram', { value })
      this.setState({ search: data })
    } else {
      this.setState({ search: { users: [], groups: [], hashtags: [] } })
    }
  }

  render() {
    let
      { value, search: { users, groups, hashtags } } = this.state,
      map_users = users.map(u =>
        <UserSearch key={u.id} {...u} />
      ),
      map_groups = groups.map(g =>
        <GroupSearch key={g.group_id} {...g} />
      ),
      map_hashtags = hashtags.map(h =>
        <HashtagSearch key={h.hashtag_id} {...h} />
      )

    return (
      <div>

        <div className='search_box'>
          <input
            type='text'
            placeholder='Search Instagram'
            spellCheck='false'
            autoComplete='off'
            className='search'
            autoFocus
            value={value}
            onChange={e => this.search(e)}
          />
          <span className='search_icon'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </span>
        </div>

        {
          users.length > 0 || groups.length > 0 || hashtags.length > 0 ?
            <div className='search_div'>

              <div class='s_d_people s_d'>
                <span class='s_header'>{ humanReadable(users.length, 'member') }</span>
                { map_users }
              </div>

              <div class='s_d_groups s_d'>
                <span class='s_header'>{ humanReadable(groups.length, 'group') }</span>
                { map_groups }
              </div>

              <div class='s_d_hashtags s_d'>
                <span class='s_header'>{ humanReadable(hashtags.length, 'hashtag') }</span>
                { map_hashtags }
              </div>

            </div>
            : null
        }

      </div>
    )
  }
}

