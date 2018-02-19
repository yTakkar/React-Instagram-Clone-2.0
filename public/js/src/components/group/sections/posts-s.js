import React from 'react'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import { Link } from 'react-router-dom'
import Nothing from '../../others/nothing'
import PostItTeaser from '../../post/post-it/post-it-teaser'
import Post from '../../post/post'
import End from '../../others/end'
import { Me } from '../../../utils/utils'
import { getMutualAndNewestMembers } from '../../../store/actions/group-a'
import MutualMembers from '../mutual-members'
import NewestMembers from '../newest-members'
import CreateGroup from '../create-group/create-group'
import GroupHashtags from '../../hashtag/group-hashtags'
import ToTags from '../../hashtag/toTags'

@connect(store => {
  return {
    gd: store.Group.group_details,
    joined: store.Group.joined,
    posts: store.Post.posts
  }
})

export default class GroupPosts extends React.Component {

  componentDidMount = () => {
    let { dispatch, grp_id } = this.props
    dispatch(getMutualAndNewestMembers(grp_id))
  }

  render() {
    let
      { gd: { group_id, name, bio, admin }, posts, joined } = this.props,
      len = posts.length,
      map_posts = posts.map(p =>
        <Post key={p.post_id} {...p} when='groupPosts' />
      )

    return (
      <div>

        <FadeIn duration='300ms' >

          <div className='senapati pro_senapati' >

            <div className='srajkumar'>

              <div className='grp_bio'>
                <div className='grp_bio_h'>
                  <span>Group's bio</span>
                </div>
                <div className='grp_bio_main'>
                  <span><ToTags str={`${bio}`} /></span>
                  {
                    Me(admin) ? <Link to={`/group/${group_id}/edit`} className='sec_btn grp_ns'>Not satisfied</Link> : null
                  }
                </div>
              </div>

              <NewestMembers group={group_id} />
              <MutualMembers group={group_id} />
              <GroupHashtags group={group_id} />
              <CreateGroup/>

              <div className='recomm_teaser'>
                <span>Explore more groups from all around Instagram.</span>
                <Link to='/explore/explore-groups' className='sec_btn'>Explore</Link>
              </div>
            </div>

            <div className='prajkumar'>
              {
                joined ?
                  <PostItTeaser
                    type='group'
                    group={group_id}
                  />:
                  null
              }
              {
                len == 0 ?
                  <Nothing mssg={`${name} group has no posts!!`} />
                  : <FadeIn duration='300ms'>{ map_posts }</FadeIn>
              }
            </div>

          </div>

          { len != 0 ? <End/> : null }

        </FadeIn>

      </div>
    )
  }
}
