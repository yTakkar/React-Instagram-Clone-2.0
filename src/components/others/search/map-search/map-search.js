import React from 'react'
import UserSearch from './user-search'
import GroupSearch from './group-search'
import HashtagSearch from './hashtag-search'
import PropTypes from 'prop-types'
import SearchSection from './section'

const MapSearch = ({ users, groups, hashtags, clicked }) => {
  let map_users = users.map(u => (
      <UserSearch key={u.id} {...u} clicked={clicked} />
    )),
    map_groups = groups.map(g => (
      <GroupSearch key={g.group_id} {...g} clicked={clicked} />
    )),
    map_hashtags = hashtags.map(h => (
      <HashtagSearch key={h.hashtag} {...h} clicked={clicked} />
    ))

  return (
    <div className="search_div">
      <SearchSection searchList={map_users} listFor="member" />
      <SearchSection searchList={map_groups} listFor="group" />
      <SearchSection searchList={map_hashtags} listFor="hashtag" />
    </div>
  )
}

MapSearch.propTypes = {
  users: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  hashtags: PropTypes.array.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default MapSearch
