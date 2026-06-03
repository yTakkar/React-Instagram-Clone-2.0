import React from 'react'
import { connect } from 'react-redux'
import FileInput from '../../others/input/file'
import TextArea from '../../others/input/textArea'
import { CPP } from '../../../actions/post'

const PostItMiddle = ({ postIt, session, dispatch }) => {
  let { username } = session
  let { fileChanged, desc, previewImg, filter, fileInput, isNSFW } = postIt

  let dp = (...args) => dispatch(CPP(...args))

  let fileChange = e => {
    e.preventDefault()
    dp('fileChanged', true)
    dp('fileInput', e.target.value)

    let reader = new FileReader(),
      file = e.target.files[0]
    dp('targetFile', file)

    reader.onload = e => dp('previewImg', e.target.result)
    reader.readAsDataURL(file)
  }

  let valueChange = e => dp('desc', e.target.value)

  let isVideo = previewImg && previewImg.startsWith('data:video/')

  return (
    <div className="i_p_main p_main" style={{ height: 296, display: 'flex', flexDirection: 'column' }}>
      <div className="i_p_ta" style={{ flexShrink: 0 }}>
        <TextArea
          placeholder={`What's new with you, @${username}?`}
          value={desc}
          valueChange={valueChange}
          className="t_p_ta"
        />
      </div>

      {fileChanged ? (
        <div className="i_p_img" style={{ flexGrow: 1, overflow: 'hidden' }}>
          {isVideo ? (
            <video src={previewImg} className={filter} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={previewImg} className={filter} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      ) : (
        <form
          className="post_img_form"
          method="post"
          encType="multipart/formdata"
          style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <FileInput
            value={fileInput}
            fileChange={fileChange}
            label="Choose an image or video"
            labelClass="pri_btn"
            accept="image/*,video/*"
          />
        </form>
      )}

      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexShrink: 0 }}>
        <input 
          type="checkbox" 
          id="isNSFW" 
          checked={isNSFW} 
          onChange={(e) => dp('isNSFW', e.target.checked)} 
          style={{ marginRight: '8px', cursor: 'pointer' }}
        />
        <label htmlFor="isNSFW" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', color: '#e74c3c' }}>
          Mark as NSFW (Sensitive Content)
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.User.session,
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(PostItMiddle)
export { PostItMiddle as PurePostItMiddle }
