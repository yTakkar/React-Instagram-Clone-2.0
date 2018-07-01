import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import { NavLink } from 'react-router-dom'

const BannerMapTags = ({ ud, tags }) => {
  let { id, username } = ud

  let map_tags = tags.map(t => (
    <NavLink to="/" key={t.tag} className="tags">
      {t.tag}
    </NavLink>
  ))

  return (
    <Fragment>
      {tags.length != 0
        ? map_tags
        : `${Me(id) ? 'You' : username} have no tags!!`}
    </Fragment>
  )
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  tags: store.User.tags,
})

export default connect(mapStateToProps)(BannerMapTags)
