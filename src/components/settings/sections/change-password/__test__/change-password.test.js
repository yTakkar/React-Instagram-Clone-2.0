import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import ChangePassword from '../change-password'
import { shallow } from 'enzyme'

describe('ChangePassword Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ChangePassword />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock changePassword action when clicked on Primary btn', () => {
    const wrapper = shallow(<ChangePassword />)
    wrapper.find('PrimaryButton').simulate('click', { preventDefault() {} })
  })
})
