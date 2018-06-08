import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import PostItMiddle, { PurePostItMiddle } from '../middle'
import Post from '../../../../store/mockStore/mock-reducers/Post'
import { shallow } from 'enzyme'
import User from '../../../../store/mockStore/mock-reducers/User'

describe('PostItMiddle Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <PostItMiddle/>
    </Provider>
  )

  it('should match snapshot when fileChanged = false', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock changeFile action', () => {
    const wrapper = shallow(
      <PurePostItMiddle
        session={User.session}
        postIt={Post.postIt}
        dispatch={jest.fn()}
      />
    )
    const file = new Blob(['foo'], {
      type: 'text/plain'
    })

    wrapper.find('FileInput').prop('fileChange')({
      preventDefault() {},
      target: {
        value: '',
        files: [file]
      }
    })
  })

  it('should match snapshot when fileChanged = false', () => {
    Post.postIt.fileChanged = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
