import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import Filter, { PureFilter } from '../filter'
import { shallow } from 'enzyme'
import Post from '../../../../../store/mockStore/mock-reducers/Post'

describe('Filter Component', () => {
  const props = {
    filter: 'filter-ashby'
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Filter {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock selectFilter action when a filter is clicked', () => {
    const wrapper = shallow(
      <PureFilter
        {...props}
        previewImg={Post.postIt.previewImg}
        dispatch={jest.fn()}
      />
    )
    wrapper.find('.filter_div').simulate('click')
  })

})
