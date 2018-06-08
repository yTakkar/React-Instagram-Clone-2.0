import React from 'react'
import { PureHome } from '../home'
import ShallowRenderer from 'react-test-renderer/shallow'
import { shallow } from 'enzyme'

describe('Home Component', () => {

  // shallow snapshot
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <PureHome/>
    )
    expect(tree).toMatchSnapshot()
  })

  it('should show <Instagram/> loader when loading=true', () => {
    const wrapper = shallow(
      <PureHome
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: true })
    expect(wrapper.find('InstagramStyle').length).toBe(3)
  })

})
