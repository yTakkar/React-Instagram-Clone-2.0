import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import ViewPost, { PureViewPost } from '../view-post'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('ViewPost Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <ViewPost
            match={{
              params: { post_id: 45 }
            }}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == true', () => {
    const wrapper = shallow(
      <PureViewPost
        match={{
          params: { post_id: 45 }
        }}
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
