import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'

const BannerAddTagsLink = ({ tags_len, id }) => (
  <Fragment>
    {tags_len == 0 &&
      Me(id) && (
        <NavLink to="/edit-profile" className="add_tags">
          add
        </NavLink>
      )}
  </Fragment>
)

const mapStateToProps = store => ({
  id: store.User.user_details.id,
  tags_len: store.User.tags.length,
})

export default connect(mapStateToProps)(BannerAddTagsLink)
export { BannerAddTagsLink as PureBannerAddTagsLink }
