import React from 'react'
import Overlay from '../overlay'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Overlay component', () => {
  const snapshot = renderer.create

  it('should match snapshot with different overlay types', () => {
    // black overlay
    let tree = snapshot(<Overlay/>).toJSON()
    expect(tree).toMatchSnapshot()

    // white overlay
    tree = snapshot(<Overlay type='white' />).toJSON()
    expect(tree).toMatchSnapshot()

    // colored overlay
    tree = snapshot(<Overlay type='colored' opacity={0.9} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot & perform click operation', () => {
    const defaultProps = {
      close_on_click: true,
      close: () => {}
    }

    const wrapper = shallow(<Overlay {...defaultProps} />)
    const tree = snapshot(<Overlay {...defaultProps} />).toJSON()

    expect(tree).toMatchSnapshot()
    wrapper.find('div').simulate('click')
  })

})
