import React, { Component } from 'react'
import ToTags from '../../../hashtag/toTags/toTags'
import ImageTheatre from '../../../others/imageTheatre/imageTheatre'
import PropTypes from 'prop-types'
import PostTags from './post-tags'
import classNames from 'classnames'

export default class PostImage extends Component {
  state = {
    showImage: false,
  }

  _toggle = what => this.setState({ [what]: !this.state[what] })

  render() {
    let {
      postDetails: {
        post_id,
        post_time,
        description,
        imgSrc,
        filter,
        username,
        tags_count,
        isNSFW,
      },
    } = this.props
    let { showImage, unblurNSFW } = this.state

    let shouldBlur = isNSFW && !unblurNSFW

    return (
      <div>
        <div className="p_o">
          <div className="p_actual" spellCheck="false">
            <div
              className="p_abt"
              style={{ marginBottom: description ? '10px' : null }}
            >
              <p>
                <ToTags str={`${description}`} />
              </p>
            </div>

            {imgSrc ? (
              <div style={{ position: 'relative' }}>
                {imgSrc.match(/\.(mp4|webm|mov|ogg|mkv)$/i) ? (
                  <video
                    src={`/posts/${imgSrc}`}
                    className={classNames('p_img', filter)}
                    controls={!shouldBlur}
                    controlsList="nodownload"
                    style={{ filter: shouldBlur ? 'blur(20px)' : 'none', pointerEvents: shouldBlur ? 'none' : 'auto' }}
                  />
                ) : (
                  <img
                    src={`/posts/${imgSrc}`}
                    className={classNames('p_img', filter)}
                    onClick={() => { if (!shouldBlur) this._toggle('showImage') }}
                    style={{ filter: shouldBlur ? 'blur(20px)' : 'none', cursor: shouldBlur ? 'default' : 'pointer' }}
                  />
                )}
                {shouldBlur && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: 'white' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Sensitive Content</span>
                    <button className="sec_btn" onClick={() => this._toggle('unblurNSFW')} style={{ padding: '8px 15px' }}>Click to view</button>
                  </div>
                )}
              </div>
            ) : null}

            <PostTags post_id={post_id} tags_count={tags_count} />
          </div>
        </div>

        {showImage && (
          <ImageTheatre
            imgSrc={`/posts/${imgSrc}`}
            filter={filter}
            username={username}
            time={post_time}
            link={`/post/${post_id}`}
            back={() => this._toggle('showImage')}
          />
        )}
      </div>
    )
  }
}

PostImage.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    post_time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    tags_count: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}
