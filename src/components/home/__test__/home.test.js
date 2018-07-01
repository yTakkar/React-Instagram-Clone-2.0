import React from 'react'
import { PureHome } from '../home'
import { shallow } from 'enzyme'

describe('Home Component', () => {
  const comp = <PureHome dispatch={jest.fn()} />

  // shallow snapshot
  it('should match snapshot', () => {
    const tree = shallow(comp)
    expect(tree).toMatchSnapshot()
  })

  it('should show <Instagram/> loader when loading=true', () => {
    const wrapper = shallow(comp)
    wrapper.setState({ loading: true })
    expect(wrapper.find('InstagramStyle').length).toBe(3)
  })
})
