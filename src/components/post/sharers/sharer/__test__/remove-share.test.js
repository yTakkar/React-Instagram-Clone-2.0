import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import RemoveShare, { PureRemoveShare } from '../remove-share'
import { shallow } from 'enzyme'

describe('RemoveShare Component', () => {
  const mockFn = jest.fn()
  const props = {
    share_id: 44,
    decrementSharers: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <RemoveShare {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeShare action when button is clicked', () => {
    const wrapper = shallow(<PureRemoveShare {...props} dispatch={mockFn} />)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
