import React from 'react'
import { post } from 'axios'
import UserSearch from './user-search'
import GroupSearch from './group-search'

export default class Search extends React.Component {

  state = {
    value: '',
    search: {
      users: [],
      groups: []
    }
  }

  search = async ({ target: { value } }) => {
    this.setState({ value })
    if(value.trim() != '') {
      let { data } = await post('/api/search-instagram', { value })
      this.setState({ search: data })
    } else {
      this.setState({ search: { users: [], groups: [] } })
    }
  }

  render() {
    let
      { value, search: { users, groups } } = this.state,
      map_users = users.map(u =>
        <UserSearch key={u.id} {...u} />
      ),
      map_groups = groups.map(g =>
        <GroupSearch key={g.group_id} {...g} />
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
          users.length > 0 || groups.length > 0 ?
            <div className='search_div'>

              <div class='s_d_people s_d'>
                <span class='s_header'>Members</span>
                { map_users }
              </div>

              <div class='s_d_groups s_d'>
                <span class='s_header'>Groups</span>
                { map_groups }
              </div>

            </div>
            : null
        }

      </div>
    )
  }
}

