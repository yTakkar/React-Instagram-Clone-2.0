import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Bookmarks, { PureBookmarks } from '../bookmarks-s'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'
import Post from '../../../../../store/mockStore/mock-reducers/Post'

describe('Bookmarks Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Bookmarks param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureBookmarks
        dispatch={jest.fn()}
        param='ghalib'
        ud={User.user_details}
        bookmarks={Post.bookmarks}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
