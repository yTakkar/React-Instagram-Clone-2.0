import React from 'react'
import { create } from 'react-test-renderer'
import CreateGroupModal from '../cg-modal'
import { shallow } from 'enzyme'

describe('CreateGroupModal Component', () => {
  it('should match snapshot', () => {
    const tree = create(<CreateGroupModal back={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should redirect to /group/34 when group created', () => {
    const wrapper = shallow(<CreateGroupModal back={jest.fn()} />)
    wrapper.setState({
      created: true,
      groupId: 34,
    })
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })
})
