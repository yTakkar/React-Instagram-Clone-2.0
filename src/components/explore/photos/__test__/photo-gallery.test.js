import React from 'react'
import { PureExplorePhotoGallery } from '../photo-gallery'
import { shallow, mount } from 'enzyme'
import Explore from '../../../../store/mockStore/mock-reducers/Explore'
import { BrowserRouter as Router } from 'react-router-dom'

describe('ExplorePhotoGallery Component', () => {

  it('show show Gallery', () => {
    const wrapper = mount(
      <PureExplorePhotoGallery
        photos={Explore.photos}
      />
    )
    expect(wrapper.find('Nothing').exists()).toBe(false)
    expect(wrapper.find('Gallery').exists()).toBe(true)
    expect(wrapper.find('Gallery img').length).toBe(1)
  })

  it('should show <ImageTheatre/> when clicked on a gallery photo', () => {
    const wrapper = mount(
      <Router>
        <PureExplorePhotoGallery
          photos={Explore.photos}
        />
      </Router>
    )
    wrapper.find('Gallery img').simulate('click')

    let imgTheatre = wrapper.find('ImageTheatre')
    expect(imgTheatre.exists()).toBe(true)
  })

  it('should show <Nothing/> when photos.length == 0', () => {
    Explore.photos = []
    const wrapper = shallow(
      <PureExplorePhotoGallery
        photos={Explore.photos}
      />
    )
    expect(wrapper.find('Nothing').exists()).toBe(true)
    expect(wrapper.find('Gallery').exists()).toBe(false)
  })

})
