import React from 'react'
import Overlay from '../overlay'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'

describe('Overlay component', () => {
  it('should match snapshot with different overlay types', () => {
    // black overlay
    let tree = create(<Overlay />).toJSON()
    expect(tree).toMatchSnapshot()

    // white overlay
    tree = create(<Overlay type="white" />).toJSON()
    expect(tree).toMatchSnapshot()

    // colored overlay
    tree = create(<Overlay type="colored" opacity={0.9} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should simulate click operation', () => {
    const wrapper = shallow(<Overlay close_on_click close={jest.fn()} />)
    wrapper.find('div').simulate('click')
  })
})
