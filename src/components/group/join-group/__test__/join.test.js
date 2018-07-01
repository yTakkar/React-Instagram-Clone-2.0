import React from 'react'
import { create } from 'react-test-renderer'
import Join from '../join'
import { shallow } from 'enzyme'

describe('Join Component', () => {
  const props = {
    joinDetails: {
      user: 7,
      addedBy: 7,
      group_id: 45,
    },
    joined: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<Join {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should should mock join action when button is clicked', () => {
    const wrapper = shallow(<Join {...props} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
