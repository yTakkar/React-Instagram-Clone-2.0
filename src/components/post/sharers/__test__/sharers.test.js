import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Sharers, { PureSharers } from '../sharers'
import mockStore from '../../../../store/mockStore/mockStore'
import { shallow } from 'enzyme'
import Post from '../../../../store/mockStore/mock-reducers/Post'

describe('Sharers Component', () => {
  const mockFn = jest.fn()
  const props = {
    post: 44,
    back: mockFn,
    decrementSharers: mockFn
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Sharers {...props} />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureSharers
        {...props}
        sharers={Post.sharers}
        dispatch={mockFn}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
