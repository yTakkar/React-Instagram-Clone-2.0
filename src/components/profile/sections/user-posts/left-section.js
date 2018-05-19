import React, { Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Suggested from '../../../others/suggested/suggested'
import Recommend from '../../../others/recommend/recommend'
import AddToFavourites from '../../../others/addToFavourites'
import MutualUsers from '../../mutual-users'
import UserHashtags from '../../../hashtag/user-hashtags'
import NewConTeaser from '../../../messages/newCon-teaser'

const UserPostsLeftSection = ({ username, id }) => (
  <Fragment>
    {
      !Me(id)
        ? <MutualUsers username={username} />
        : null
    }

    <Suggested when='profile' params={username} />
    <UserHashtags username={username} />

    {
      !Me(id)
        ? <Recommend username={username} />
        : null
    }

    {
      !Me(id)
        ? <AddToFavourites user={id} username={username} />
        : null
    }

    {
      !Me(id) ?
        <NewConTeaser userDetails={{ id, username }} />
        : null
    }
  </Fragment>
)

UserPostsLeftSection.propTypes = {
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => (
  { id: state.User.user_details.id }
)

export default connect(mapStateToProps)(UserPostsLeftSection)
