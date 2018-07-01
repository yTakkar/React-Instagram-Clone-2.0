import React from 'react'
import { create } from 'react-test-renderer'
import { PureLeave } from '../leave'
import { shallow } from 'enzyme'

describe('Leave Component', () => {
  const props = {
    leaveDetails: {
      user: 7,
      group_id: 45,
    },
    leaved: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<PureLeave {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should should mock leave action when button is clicked', () => {
    const wrapper = shallow(<PureLeave {...props} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
