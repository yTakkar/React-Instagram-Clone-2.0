import React from 'react'
import { humanReadable } from '../../../utils/utils'
import UserSearch from './user-search'
import GroupSearch from './group-search'
import HashtagSearch from './hashtag-search'
import PropTypes from 'prop-types'

const MapSearch = ({ users, groups, hashtags, clicked }) => {

  let
    map_users = users.map(u =>
      <UserSearch key={u.id} {...u} clicked={clicked} />
    ),
    map_groups = groups.map(g =>
      <GroupSearch key={g.group_id} {...g} clicked={clicked} />
    ),
    map_hashtags = hashtags.map(h =>
      <HashtagSearch key={h.hashtag} {...h} clicked={clicked} />
    )

  return (
    <div className='search_div'>

      <div className='s_d_people s_d'>
        <span className='s_header'>{ humanReadable(users.length, 'member') }</span>
        { map_users }
      </div>

      <div className='s_d_groups s_d'>
        <span className='s_header'>{ humanReadable(groups.length, 'group') }</span>
        { map_groups }
      </div>

      <div className='s_d_hashtags s_d'>
        <span className='s_header'>{ humanReadable(hashtags.length, 'hashtag') }</span>
        { map_hashtags }
      </div>

    </div>
  )
}

MapSearch.propTypes = {
  users: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  hashtags: PropTypes.array.isRequired,
  clicked: PropTypes.func.isRequired
}

export default MapSearch
