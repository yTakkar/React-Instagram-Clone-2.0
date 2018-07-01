import React from 'react'
import { PureExpPhotos } from '../explore-photos'
import { shallow } from 'enzyme'

describe('ExpPhotos Component', () => {
  // shallow snapshot testing
  it('should match snapshot', () => {
    const result = shallow(<PureExpPhotos dispatch={jest.fn()} />)
    expect(result).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(<PureExpPhotos dispatch={jest.fn()} />)
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
