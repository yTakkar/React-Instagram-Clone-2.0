import React from 'react'
import AddToFavourites from '../addToFavourites'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

describe('AddToFavourites Component', () => {
  const comp = <AddToFavourites user={7} username="ghalib" />

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock add-to-favs action when clicked', () => {
    const wrapper = mount(comp)

    wrapper.find('SecondaryButton').simulate('click', { preventDefault() {} })
  })
})
